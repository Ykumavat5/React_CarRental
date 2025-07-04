// import { createContext, useContext, useEffect, useRef } from "react";
// import { io } from "socket.io-client";

// const SocketContext = createContext();

// export const SocketProvider = ({ children }) => {
//   const socketRef = useRef(null);
// console.log("called");

//   useEffect(() => {
//     // Replace with your backend URL
//     socketRef.current = io("http://localhost:3034", {
//       transports: ["websocket"],
//     });
// console.log("in socket");

//     socketRef.current.on("connect", () => {
//       console.log("Socket connected:", socketRef.current.id);
//     });

//     return () => {
//       socketRef.current.disconnect();
//     };
//   }, []);

//   return (
//     <SocketContext.Provider value={socketRef.current}>
//       {children}
//     </SocketContext.Provider>
//   );
// };

// export const useSocket = () => useContext(SocketContext);
