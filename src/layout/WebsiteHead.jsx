import { Helmet } from "react-helmet";

const WebsiteHead = () => (
    <Helmet>
        {/* <title>Car Rental</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Discover the best car rental deals and enjoy premium service." />
        <link rel="icon" href="/rent-icon.png" />
        <link rel="apple-touch-icon" href="./rent-icon2.png" /> */}

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap" rel="stylesheet" />

        <link rel="stylesheet" href="/dist/styles.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
    </Helmet>
);

export default WebsiteHead;
