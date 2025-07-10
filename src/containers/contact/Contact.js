import React, { useState, useContext } from "react";
import "./Contact.scss";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import { contactInfo } from "../../portfolio";
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
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    submitted: false,
    success: false,
    message: ""
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.name || !formData.message) {
      alert("Please fill in all required fields (Name and Message).");
      setLoading(false);
      return;
    }

    try {
      const formDataObj = new FormData();
      formDataObj.append("access_key", "85420a0d-7ad8-47cc-80e1-6ab8d94af337");
      formDataObj.append("name", formData.name);
      if (formData.email) formDataObj.append("email", formData.email);
      if (formData.phone) formDataObj.append("phone", formData.phone);
      formDataObj.append("message", formData.message);
      formDataObj.append("subject", `Portfolio Contact from ${formData.name}`);
      formDataObj.append("from_name", "Portfolio Contact Form");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataObj
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({
          submitted: true,
          success: true,
          message: "✅ Thank you! Your message has been sent successfully."
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: ""
        });
      } else {
        throw new Error(data.message || "Form submission failed.");
      }
    } catch (err) {
      console.error("Form submission error:", err);
      setSubmitStatus({
        submitted: true,
        success: false,
        message: "❌ Something went wrong. Please try again later or contact me directly."
      });
    } finally {
      setLoading(false);
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

          <div className={isDark ? "dark-mode contact-text-div" : "contact-text-div"}>
            {submitStatus.submitted && (
              <div className={`submit-status ${submitStatus.success ? "success" : "error"}`}>
                <p>{submitStatus.message}</p>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="contact-form">
              <div className="form-group">
                <label className="form-label">
                  Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">
                  Phone Number <span className="optional">(optional)</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">
                  Message <span className="required">*</span>
                </label>
                <textarea
                  name="message"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="form-input"
                  rows="6"
                />
              </div>
              <button type="submit" className="main-button" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </button>

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
