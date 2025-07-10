import React, { useState, useContext } from "react";
import "./Contact.scss";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import { contactInfo } from "../../portfolio";
// import { Fade } from "react-reveal";
import email from "../../assets/lottie/email";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";
import StyleContext from "../../contexts/StyleContext";

export default function Contact() {
  const { isDark } = useContext(StyleContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.message) {
      alert("Please fill in all required fields (Name and Message).");
      return;
    }

    // Construct the email body
    const emailBody = `
Name: ${formData.name}
${formData.email ? `Email: ${formData.email}` : ''}
${formData.phone ? `Phone: ${formData.phone}` : ''}

Message:
${formData.message}
    `;

    // Try opening the email client
    try {
      const mailtoUrl = `mailto:${contactInfo.email_address}?subject=Contact from ${formData.name}&body=${encodeURIComponent(emailBody)}`;
      window.location.href = mailtoUrl;
      
      // Mark as submitted and show success message
      setFormSubmitted(true);
      
      // Reset form after a delay
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: ""
        });
      }, 1000);
    } catch (err) {
      console.error("Failed to open email client:", err);
      alert(`Please email me directly at ${contactInfo.email_address}`);
    }
  };

  // Direct contact method as a backup
  const contactDirectly = () => {
    window.open(`mailto:${contactInfo.email_address}`, '_blank');
  };

  return (
    <div className="main contact-margin-top" id="contact">
      <div className="contact-div-main">
        <div className="contact-header">
          <h1 className={isDark ? "dark-mode contact-title" : "contact-title"}>
            Contact Me <span role="img" aria-label="phone">☎️</span>
          </h1>
          <p className={isDark ? "dark-mode contact-subtitle" : "subTitle contact-subtitle"}>
            Discuss a project or just want to say hi? My inbox is open for all.
          </p>

          <div className={isDark ? "dark-mode contact-text-div" : "contact-text-div"}>
            {formSubmitted && (
              <div className="submit-success">
                <p>Thank you for your message! I'll get back to you soon.</p>
              </div>
            )}
            
            <form onSubmit={handleFormSubmit} className="contact-form">
              <div className="form-group">
                <label className="form-label">
                  Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">
                  Email <span className="optional">(optional)</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">
                  Phone Number <span className="optional">(optional)</span>
                </label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">
                  Message <span className="required">*</span>
                </label>
                <textarea
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                  className="form-input"
                  rows="6"
                />
              </div>
              <div className="button-group">
                <button type="submit" className="main-button">
                  Send Message
                </button>
                <button type="button" onClick={contactDirectly} className="alt-button">
                  Contact Directly
                </button>
              </div>
              
              {/* Fallback contact info */}
              <div className="email-fallback">
                <p>Or reach me at:</p>
                <div className="contact-info">
                  <span className="contact-method">
                    <i className="fas fa-envelope"></i> Email:
                  </span> 
                  <a href={`mailto:${contactInfo.email_address}`} className="contact-value">
                    {contactInfo.email_address}
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="contact-image-div">
          <DisplayLottie animationData={email} />
        </div>
      </div>
      <SocialMedia />
    </div>
  );
}
