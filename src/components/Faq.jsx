import { useState, useEffect } from "react";

function Faq() {
  const [faqs, setFaqs] = useState([]); 
  const [activeQ, setActiveQ] = useState(""); // State for active question, initialized to empty

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch("http://localhost:3034/api/v1/user/faqs", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "api_key": "123456789"
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonResponse = await response.json(); // Renamed to avoid confusion with the 'data' key in the response
        
        // --- IMPORTANT CHANGE HERE ---
        // Access the FAQ array from jsonResponse.data.result
        if (jsonResponse.data && Array.isArray(jsonResponse.data.result)) {
          setFaqs(jsonResponse.data.result);
          if (jsonResponse.data.result.length > 0) {
            setActiveQ(jsonResponse.data.result[0].id); // Use 'id' from your API for the active question
          }
        } else {
          console.warn("API response did not contain an array at data.result:", jsonResponse);
          setFaqs([]); // Ensure faqs is an empty array if data structure is unexpected
        }
        // --- END OF IMPORTANT CHANGE ---

      } catch (error) {
        console.log("API error:", error);
        // You might want to set an error state here to display a message to the user
      }
    };

    fetchFaqs();
  }, []); 

  const openQ = (id) => {
    setActiveQ(activeQ === id ? "" : id);
  };

  const getClassAnswer = (id) => {
    return activeQ === id ? "active-answer" : "";
  };

  const getClassQuestion = (id) => {
    return activeQ === id ? "active-question" : "";
  };

  return (
    <>
      <section className="faq-section">
        <div className="container">
          <div className="faq-content">
            <div className="faq-content__title">
              <h5>FAQ</h5>
              <h2>Frequently Asked Questions</h2>
              <p>
                Frequently Asked Questions About the Car Rental Booking Process
                on Our Website: Answers to Common Concerns and Inquiries.
              </p>
            </div>

            <div className="all-questions">
              {faqs.length > 0 ? (
                faqs.map((faqItem, index) => (
                  <div className="faq-box" key={faqItem.id}> {/* Use faqItem.id for the key */}
                    <div
                      id={faqItem.id} // Use faqItem.id directly
                      onClick={() => openQ(faqItem.id)}
                      className={`faq-box__question ${getClassQuestion(faqItem.id)}`}
                    >
                      <p>{faqItem.position}. {faqItem.question}</p> {/* Use faqItem.position for numbering */}
                      <i className="fa-solid fa-angle-down"></i>
                    </div>
                    <div
                      id={faqItem.id} // Use faqItem.id directly
                      onClick={() => openQ(faqItem.id)}
                      className={`faq-box__answer ${getClassAnswer(faqItem.id)}`}
                    >
                      {faqItem.answer}
                    </div>
                  </div>
                ))
              ) : (
                <p>Loading FAQs or no FAQs available...</p>
              )}
              
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Faq;