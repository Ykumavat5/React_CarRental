import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();
  const path = location.pathname.toLowerCase();
  const isAdminOrDriver = path.includes("/admin") || path.includes("/driver");
console.log(isAdminOrDriver,"website footer");

  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token_carRental") || "");

  const isLoggedIn = !!token;

  // Only run this logic if not on /admin or /driver
  useEffect(() => {
    if (isAdminOrDriver) return;

    const interval = setInterval(() => {
      const newToken = localStorage.getItem("token_carRental") || "";
      if (newToken !== token) {
        setToken(newToken);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [token, isAdminOrDriver]);

  useEffect(() => {
    if (isAdminOrDriver || !token) {
      if (!token && !isAdminOrDriver) {
        console.log("🔒 User logged out. Resetting subscription state.");
        setEmail("");
        setIsSubscribed(false);
      }
      setChecking(false);
      return;
    }

    const fetchSubscriptionStatus = async () => {
      console.log("📡 Fetching subscription status...");

      try {
        const res = await fetch("http://localhost:3034/api/v1/user/newsletter", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            api_key: "123456789",
            token,
          },
        });

        const data = await res.json();
        console.log("✅ Subscription status response:", data);

        if (data.code === 200) {
          setIsSubscribed(Boolean(data.data?.is_subscribed));
          setEmail(data.data?.email || "");
        } else {
          console.warn("⚠️ Subscription check failed:", data.message);
        }
      } catch (err) {
        console.error("❌ Error fetching subscription status:", err);
      } finally {
        setChecking(false);
      }
    };

    setChecking(true);
    fetchSubscriptionStatus();
  }, [token, isAdminOrDriver]);

  const toggleSubscription = async () => {
    if (!token) {
      console.warn("⚠️ User must be logged in to toggle subscription");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3034/api/v1/user/togglenewsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          api_key: "123456789",
          token,
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      console.log("🔁 Toggle subscription response:", data);

      if (data.code === 200) {
        setIsSubscribed(!isSubscribed);
        if (!isSubscribed) setEmail("");
      } else {
        console.warn("❌ Failed to toggle subscription:", data.message);
      }
    } catch (err) {
      console.error("❌ Toggle error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Don't show footer at all on /admin or /driver routes
  if (isAdminOrDriver) return null;

  if (checking) return <p>Loading subscription status...</p>;

  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          {/* Company Info */}
          <ul className="footer-content__1">
            <li><span>CAR</span> Rental</li>
            <li>We offer a big range of vehicles for all your driving needs.</li>
            <li><a href="tel:123456789"><i className="fa-solid fa-phone"></i> &nbsp; (123) -456-789</a></li>
            <li><a href="mailto:carrental@gmail.com"><i className="fa-solid fa-envelope"></i> &nbsp; carrental@xyz.com</a></li>
            <li><a style={{ fontSize: "14px" }} target="_blank" rel="noreferrer" href="https://example.vercel.app/">Design by YK.</a></li>
          </ul>

          {/* Company Links */}
          <ul className="footer-content__2">
            <li>Company</li>
            <li><a href="#home">Gallery</a></li>
            <li><a href="#home">Careers</a></li>
            <li><a href="#home">Mobile</a></li>
            <li><a href="#home">Blog</a></li>
            <li><a href="#home">How we work</a></li>
          </ul>

          {/* Working Hours */}
          <ul className="footer-content__2">
            <li>Working Hours</li>
            <li>Mon - Fri: 9:00AM - 9:00PM</li>
            <li>Sat: 9:00AM - 7:00PM</li>
            <li>Sun: Closed</li>
          </ul>

          {/* Newsletter */}
          <ul className="footer-content__2">
            <li>Subscription</li>
            <li>
              <p>
                {!isLoggedIn
                  ? "Please log in to manage your newsletter subscription."
                  : isSubscribed
                  ? "To unsubscribe click on the unsubscribe button."
                  : "Subscribe your email address for latest news & updates."}
              </p>
            </li>

            {isLoggedIn && !isSubscribed && (
              <li>
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </li>
            )}

            {isLoggedIn && (
              <li>
                <button
                  className="submit-email"
                  onClick={toggleSubscription}
                  disabled={loading || (!isSubscribed && !email)}
                >
                  {isSubscribed ? "Unsubscribe" : "Subscribe"}
                </button>
                {loading && <p>Processing...</p>}
              </li>
            )}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
