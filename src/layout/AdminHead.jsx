import { Helmet } from "react-helmet";

const AdminHead = () => (
  <Helmet>
    <title>Car Rental Admin</title>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="shortcut icon" href="/assets/images/favicon.png" />

    {/* **** Admin-only styles and fonts **** */}
    <link rel="stylesheet" href="/assets/vendors/mdi/css/materialdesignicons.min.css" />
    <link rel="stylesheet" href="/assets/vendors/ti-icons/css/themify-icons.css" />
    <link rel="stylesheet" href="/assets/vendors/css/vendor.bundle.base.css" />
    <link rel="stylesheet" href="/assets/vendors/font-awesome/css/font-awesome.min.css" />
    <link rel="stylesheet" href="/assets/vendors/jvectormap/jquery-jvectormap.css" />
    <link rel="stylesheet" href="/assets/vendors/flag-icon-css/css/flag-icons.min.css" />
    <link rel="stylesheet" href="/assets/vendors/owl-carousel-2/owl.carousel.min.css" />
    <link rel="stylesheet" href="/assets/vendors/owl-carousel-2/owl.theme.default.min.css" />
    <link rel="stylesheet" href="/assets/css/style.css" />
  </Helmet>
);

export default AdminHead;
