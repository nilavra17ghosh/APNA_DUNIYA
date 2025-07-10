import React, { useState, useContext, useRef } from "react";
import "./Contact.scss";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import { contactInfo } from "../../portfolio";
// import { Fade } from "react-reveal";
import email from "../../assets/lottie/email";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";
import StyleContext from "../../contexts/StyleContext";
// import emailjs from '@emailjs/browser';

export default function Contact() {
  const { isDark } = useContext(StyleContext);
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    submitted: false,
    success: false,
    message: ""
  });
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Skip trying to automatically open the email client
    // Instead, show the success message with manual button option
    setSubmitStatus({
      submitted: true,
      success: true,
      message: "Please click the 'Send Email Manually' button below to open your email client with your message."
    });
    
    setLoading(false);
  };
  
  // Function to manually open email client from button click
  const openEmailClient = () => {
    // Format email body with form data from the submitted form
    const emailBody = `
Name: ${formData.name || "Visitor"}
${formData.email ? `Email: ${formData.email}` : ''}
${formData.phone ? `Phone: ${formData.phone}` : ''}

Message:
${formData.message || "No message provided"}
    `;
    
    try {
      // Try different methods to open email client
      const mailtoUrl = `mailto:${contactInfo.email_address}?subject=Contact from ${formData.name || "Visitor"}&body=${encodeURIComponent(emailBody)}`;
      
      // Try to open in new tab first
      const newWindow = window.open(mailtoUrl, '_blank');
      
      // If popup blocked or failed, try direct location change
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        window.location.href = mailtoUrl;
      }
    } catch (err) {
      console.error("Failed to open email client:", err);
      alert(`Please email me directly at ${contactInfo.email_address}`);
    }
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

          <div className={isDark ? "dark-mode contact-text-div" : "contact-text-div"}>              {submitStatus.submitted && (
              <div className={`submit-status ${submitStatus.success ? "success" : "error"}`}>
                <p>{submitStatus.message}</p>
                {submitStatus.success && (
                  <button 
                    onClick={openEmailClient} 
                    className="manual-email-button"
                  >
                    Send Email Manually
                  </button>
                )}
              </div>
            )}
            
            <form ref={form} onSubmit={handleFormSubmit} className="contact-form">
              <div className="form-group">
                <label className={isDark ? "dark-mode form-label" : "form-label"}>
                  Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="user_name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className={isDark ? "dark-mode form-label" : "form-label"}>
                  Email <span className="optional">
                    (recommended for response)
                  </span>
                </label>
                <input
                  type="email"
                  name="user_email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className={isDark ? "dark-mode form-label" : "form-label"}>
                  Phone Number <span className="optional">
                    (optional)
                  </span>
                </label>
                <input
                  type="tel"
                  name="user_phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className={isDark ? "dark-mode form-label" : "form-label"}>
                  Message <span className="required">*</span>
                </label>
                <textarea
                  name="message"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                  className="form-input"
                  rows="6"
                />
              </div>
              <button type="submit" className="main-button" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </button>
              
              {/* Fallback option */}
              <div className="email-fallback">
                <p>Or contact me directly:</p>
                <p className="contact-info">
                  <span className="contact-method">Email:</span> 
                  <a href={`mailto:${contactInfo.email_address}`} className="contact-value">
                    {contactInfo.email_address}
                  </a>
                </p>
                {contactInfo.number && (
                  <p className="contact-info">
                    <span className="contact-method">Phone:</span>
                    <span className="contact-value">{contactInfo.number}</span>
                  </p>
                )}
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
