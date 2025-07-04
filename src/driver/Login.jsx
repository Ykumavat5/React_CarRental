import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDriverAuth } from "../Context/DriverAuthContext";
import "./Login.css";
import * as Yup from "yup";
import Logo from "../images/logo/logo.png";
import Head from "../layout/WebsiteHead";

const DriverLogin = () => {
    const { login, user } = useDriverAuth();
    const navigate = useNavigate();

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            const response = await fetch("http://localhost:3034/api/v1/auth/driver/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    api_key: "123456789",
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();

            if (response.ok && data.code === 200) {
                login(data.data.token, data.data);
            } else {
                console.log("Login failed:", data.message);
                const errorMessage = data?.message;
                console.log(errorMessage);

                setErrors({ general: errorMessage });
            }
        } catch (error) {
            console.error("Error occurred:", error);
            setErrors({ general: "Something went wrong, please try again" });
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/driver/dashboard");
        }
    }, [user, navigate]);

    return (
        <>
            <Head />
            <div className="form-container">
                <div className="auth-form">
                    <div className="logo">
                        <Link to="/driver/dashboard">
                            <img src={Logo} alt="Logo" />
                        </Link>
                    </div>
                    <h2>Driver Login</h2>

                    <Formik
                        initialValues={{ email: "", password: "" }}
                        validationSchema={Yup.object({
                            email: Yup.string().email("Invalid email").required("Email is required"),
                            password: Yup.string().required("Password is required"),
                        })}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, errors }) => (
                            <Form>
                                {errors.general && (
                                    <div className="errors-message">{errors.general}</div>
                                )}

                                <div className="form-group">
                                    <Field name="email" type="email" placeholder="Email" />
                                    <ErrorMessage name="email" component="div" className="error" />
                                </div>

                                <div className="form-group">
                                    <Field name="password" type="password" placeholder="Password" />
                                    <ErrorMessage name="password" component="div" className="error" />
                                </div>

                                <button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>
                                            Logging in...
                                            <span className="spinner"></span>
                                        </>
                                    ) : (
                                        "Login"
                                    )}
                                </button>

                                <p>
                                    New driver? <Link to="/driver/register">Register</Link>
                                </p>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    );
};

export default DriverLogin;
