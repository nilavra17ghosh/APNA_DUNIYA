import React, { useState, useContext } from "react";
import "./Contact.scss";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import { illustration, contactInfo } from "../../portfolio";
import { Fade } from "react-reveal";
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const emailBody = `
Name: ${formData.name}
${formData.email ? `Email: ${formData.email}` : ''}
${formData.phone ? `Phone: ${formData.phone}` : ''}

Message:
${formData.message}
    `;
    window.location.href = `mailto:${contactInfo.email_address}?subject=Contact from ${formData.name}&body=${encodeURIComponent(emailBody)}`;
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
              <button type="submit" className="main-button">
                Send Message
              </button>
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
