import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  useEffect(() => {
    console.log("admin layout called sucessfully");
    
    const scriptPaths = [
      '/assets/vendors/js/vendor.bundle.base.js',
      '/assets/vendors/chart.js/chart.umd.js',
      '/assets/vendors/jvectormap/jquery-jvectormap.min.js',
      '/assets/vendors/jvectormap/jquery-jvectormap-world-mill-en.js',
      '/assets/vendors/owl-carousel-2/owl.carousel.min.js',
      '/assets/js/jquery.cookie.js',
      '/assets/js/off-canvas.js',
      '/assets/js/misc.js',
      '/assets/js/settings.js',
      '/assets/js/todolist.js',
      '/assets/js/dashboard.js',
    ];

    const scriptElements = scriptPaths.map((src) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = false; // Load in order
      document.body.appendChild(script);
      return script;
    });

    // Cleanup on unmount
    return () => {
      scriptElements.forEach((script) => {
        document.body.removeChild(script);
      });
    };
  }, []);

  return (
    <div>
      {/* {children} */}
      <Outlet />
    </div>
  );
};

export default AdminLayout;
