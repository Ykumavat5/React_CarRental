import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "./Signup.css";
import Logo from "../images/logo/logo.png";
import Head from "../layout/WebsiteHead";

const Signup = () => {
    const navigate = useNavigate();

    const handleSignup = async (values, { setSubmitting, setErrors }) => {
        try {
            const payload = {
                ...values,
                device_type: "android",
                device_name: "fdfe",
                os_version: "11.2",
                app_version: "5.2",
                ip: "192.356.556",
                login_type: "simple",
            };

            const response = await fetch("http://localhost:3035/api/v1/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    api_key: "123456789",
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.status === 200 && data.code === 201) {
                navigate("/login");
            } else {
                setErrors({ general: data.message || "Signup failed, Please try again." });
            }
        } catch (error) {
            setErrors({ general: "Something went wrong. Please try again." });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <Head />
            <div className="signup-wrapper">
                <div className="signup-container">
                    <div className="signup-image-section">
                        <h2>Drive your next adventure.</h2>
                        <p>Sign up and book your dream ride in minutes.</p>
                        <img src={Logo} alt="Car Rental Signup" />
                    </div>

                    <div className="signup-form-section">
                        <h2>Create Your Account</h2>
                        <Formik
                            initialValues={{
                                name: "",
                                email: "",
                                country_code: "+91",
                                mobile_number: "",
                                password: "",
                                confirmPassword: "",
                                role: "user",
                            }}
                            validationSchema={Yup.object({
                                name: Yup.string().required("Name is required"),
                                email: Yup.string().email("Invalid email").required("Email is required"),
                                country_code: Yup.string().required(),
                                mobile_number: Yup.string().required("Mobile number is required"),
                                password: Yup.string().min(6).required("Password is required"),
                                confirmPassword: Yup.string()
                                    .oneOf([Yup.ref("password")], "Passwords must match")
                                    .required("Confirm Password is required"),
                            })}
                            onSubmit={handleSignup}
                        >
                            {({ isSubmitting, errors }) => (
                                <Form className="signup-form">
                                    {errors.general && <div className="error-banner">{errors.general}</div>}

                                    <div className="form-group">
                                        <label htmlFor="name">Full Name</label>
                                        <Field name="name" type="text" placeholder="John Doe" />
                                        <ErrorMessage name="name" component="div" className="error" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <Field name="email" type="email" placeholder="john@example.com" />
                                        <ErrorMessage name="email" component="div" className="error" />
                                    </div>

                                    <div className="form-group-inline">
                                        <Field name="country_code" type="text" />
                                        <Field name="mobile_number" type="text" placeholder="Phone Number" />
                                    </div>
                                    <ErrorMessage name="mobile_number" component="div" className="error" />

                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <Field name="password" type="password" />
                                        <ErrorMessage name="password" component="div" className="error" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="confirmPassword">Confirm Password</label>
                                        <Field name="confirmPassword" type="password" />
                                        <ErrorMessage name="confirmPassword" component="div" className="error" />
                                    </div>

                                    <button type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? "Signing up..." : "Create Account"}
                                    </button>

                                    <div className="signup-footer">
                                        Already a member? <Link to="/login">Login here</Link>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
