import Footer from "../components/Footer";
import HeroPages from "../components/HeroPages";
import "./Contact.css"; // Optional: CSS file if needed
import Head from "../layout/WebsiteHead";
import "../../src/dist/styles.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    alert("Form submitted!");
  };

  return (
    <>
      <Head />
      <section className="contact-page">
        <HeroPages name="Contact" />
        <div className="container">
          <div className="contact-div">
            <div className="contact-div__text">
              <h2>Need additional information?</h2>
              <p>
                A multifaceted professional skilled in multiple fields of
                research, development as well as a learning specialist. Over 15
                years of experience.
              </p>
              <a href="tel:1234567869">
                <i className="fa-solid fa-phone"></i>&nbsp; (123) 456-7869
              </a>
              <a href="mailto:carrental@xyz.com">
                <i className="fa-solid fa-envelope"></i>&nbsp;
                carrental@xyz.com
              </a>
              <a href="/">
                <i className="fa-solid fa-location-dot"></i>&nbsp; Bengaluru,
                Karnataka
              </a>
            </div>

            <div className="contact-div__form">
              <form onSubmit={handleSubmit}>
                <label>
                  Full Name <b>*</b>
                </label>
                <input type="text" placeholder='E.g: "Joe Shmoe"' required />

                <label>
                  Email <b>*</b>
                </label>
                <input type="email" placeholder="youremail@example.com" required />

                <div className="row">
                  <div className="col-3">
                    <label>
                      Country code <b>*</b>
                    </label>
                    <input type="text" name="country_code" placeholder="+91" required style={{ width: "150px", }} />
                  </div>
                  <div className="col-9">
                    <label>
                      Mobile number <b>*</b>
                    </label><br></br>
                    <input type="tel" placeholder="123456789" required style={{ width: "40rem" }} />
                  </div>
                </div>

                <label>
                  Tell us about it <b>*</b>
                </label>
                <textarea placeholder="Write Here.." required></textarea>

                <button type="submit">
                  <i className="fa-solid fa-envelope-open-text"></i>&nbsp; Send
                  Message
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="book-banner">
          <div className="book-banner__overlay"></div>
          <div className="container">
            <div className="text-content">
              <h2>Book a car by getting in touch with us</h2>
              <div className="phone-contact">
                <i className="fa-solid fa-phone"></i>
                <h3>(123) 456-7869</h3>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}

export default Contact;
