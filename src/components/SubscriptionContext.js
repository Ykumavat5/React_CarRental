// import { createContext, useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";

// export const SubscriptionContext = createContext();

// export const SubscriptionProvider = ({ children }) => {
//   const location = useLocation();
//   const path = location.pathname.toLowerCase();

//   const isAdminOrDriverRoute = path.includes("/admin") || path.includes("/driver");

//   // ✅ Always call hooks, even if they're not used
//   const [email, setEmail] = useState("");
//   const [isSubscribed, setIsSubscribed] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [checking, setChecking] = useState(true);
//   const [token, setToken] = useState(localStorage.getItem("token_carRental") || "");

//   const isLoggedIn = !!token;

//   // ✅ Skip all side effects if route is driver/admin
//   useEffect(() => {
//     if (isAdminOrDriverRoute) return;

//     const checkTokenChange = () => {
//       const newToken = localStorage.getItem("token_carRental") || "";
//       if (newToken !== token) {
//         setToken(newToken);
//       }
//     };

//     const interval = setInterval(checkTokenChange, 1000);
//     return () => clearInterval(interval);
//   }, [token, isAdminOrDriverRoute]);

//   useEffect(() => {
//     if (isAdminOrDriverRoute || !token) {
//       if (!token && !isAdminOrDriverRoute) {
//         console.log("🔒 User logged out. Resetting subscription state.");
//         setEmail("");
//         setIsSubscribed(false);
//       }
//       setChecking(false);
//       return;
//     }

//     const fetchSubscriptionStatus = async () => {
//       console.log("📡 Fetching subscription status...");

//       try {
//         const res = await fetch("http://localhost:3034/api/v1/user/newsletter", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             api_key: "123456789",
//             token,
//           },
//         });

//         const data = await res.json();
//         console.log("✅ Subscription status response:", data);

//         if (data.code === 200) {
//           setIsSubscribed(Boolean(data.data?.is_subscribed));
//           setEmail(data.data?.email || "");
//         } else {
//           console.warn("⚠️ Subscription check failed:", data.message);
//         }
//       } catch (err) {
//         console.error("❌ Error fetching subscription status:", err);
//       } finally {
//         setChecking(false);
//       }
//     };

//     setChecking(true);
//     fetchSubscriptionStatus();
//   }, [token, isAdminOrDriverRoute]);

//   const toggleSubscription = async () => {
//     if (!token) {
//       console.warn("⚠️ User must be logged in to toggle subscription");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:3034/api/v1/user/togglenewsletter", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           api_key: "123456789",
//           token,
//         },
//         body: JSON.stringify({ email }),
//       });

//       const data = await res.json();
//       console.log("🔁 Toggle subscription response:", data);

//       if (data.code === 200) {
//         setIsSubscribed(!isSubscribed);
//         if (!isSubscribed) setEmail("");
//       } else {
//         console.warn("❌ Failed to toggle subscription:", data.message);
//       }
//     } catch (err) {
//       console.error("❌ Toggle error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SubscriptionContext.Provider
//       value={{
//         email,
//         setEmail,
//         isSubscribed,
//         toggleSubscription,
//         loading,
//         checking,
//         isLoggedIn,
//       }}
//     >
//       {children}
//     </SubscriptionContext.Provider>
//   );
// };
