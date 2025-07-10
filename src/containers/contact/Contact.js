import React, { useState, useContext, useEffect } from "react";
import "./Contact.scss";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import { contactInfo } from "../../portfolio";
import email from "../../assets/lottie/email";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";
import StyleContext from "../../contexts/StyleContext";
import useOTPVerification from "./useOTPVerification";

// Simple toast component
const Toast = ({ message, onClose }) => {
  if (!message) return null;
  
  return (
    <div className="toast">
      {message}
      <button onClick={onClose}>×</button>
    </div>
  );
};

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
  
  // Toast state
  const [toast, setToast] = useState("");
  
  // Auto-dismiss toast after 5 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Validation functions
  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  
  const validatePhone = (phone) => {
    const re = /^\d{10}$/;
    return re.test(String(phone).replace(/[^\d]/g, ''));
  };
  
  // OTP hooks
  const emailOTP = useOTPVerification({ 
    validate: validateEmail, 
    label: "email" 
  });
  
  const phoneOTP = useOTPVerification({ 
    validate: validatePhone, 
    label: "phone" 
  });
  
  // Handle input changes and reset OTP only if value changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      // Only reset OTP if value changes
      if (name === "email" && prev.email !== value) emailOTP.reset();
      if (name === "phone" && prev.phone !== value) phoneOTP.reset();
      return { ...prev, [name]: value };
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.name || !formData.message) {
      setToast("Please fill in all required fields (Name and Message).");
      setLoading(false);
      return;
    }
    
    if (formData.email && !emailOTP.verified) {
      setToast("Please verify your email before submitting.");
      setLoading(false);
      return;
    }
    
    if (formData.phone && !phoneOTP.verified) {
      setToast("Please verify your phone number before submitting.");
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
        emailOTP.reset();
        phoneOTP.reset();
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
      {/* Toast notification */}
      <Toast message={toast} onClose={() => setToast("")} />
      
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
              {/* Name Field */}
              <div className="form-group">
                <label className="form-label">
                  Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              {/* Email Field with OTP */}
              <div className="form-group">
                <label className="form-label">
                  Email <span className="optional">(Required to get a response)</span>
                </label>
                <div className="input-with-button">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input ${formData.email && !validateEmail(formData.email) ? 'invalid' : ''} ${emailOTP.verified ? 'verified' : ''}`}
                  />
                  {formData.email && validateEmail(formData.email) && !emailOTP.verified && (
                    <>
                      {!emailOTP.otpSent && (
                        <button 
                          type="button" 
                          onClick={() => emailOTP.requestOTP(formData.email)}
                          className="verification-button"
                        >
                          Verify
                        </button>
                      )}
                      {emailOTP.otpSent && emailOTP.cooldown > 0 && (
                        <button 
                          disabled
                          className="verification-button disabled"
                        >
                          Wait {emailOTP.cooldown}s
                        </button>
                      )}
                      {emailOTP.otpSent && emailOTP.cooldown === 0 && (
                        <button 
                          type="button" 
                          onClick={() => emailOTP.requestOTP(formData.email)}
                          className="verification-button"
                        >
                          Resend OTP
                        </button>
                      )}
                    </>
                  )}
                  {emailOTP.verified && (
                    <span className="verified-badge">
                      <i className="fas fa-check-circle"></i> Verified
                    </span>
                  )}
                </div>
                {formData.email && !validateEmail(formData.email) && (
                  <p className="validation-error">Please enter a valid email address</p>
                )}
                {emailOTP.showOTPInput && (
                  <div className="otp-container">
                    <input
                      type="text"
                      placeholder="Enter 6-digit OTP sent to your email"
                      value={emailOTP.userOTP}
                      onChange={(e) => emailOTP.setUserOTP(e.target.value)}
                      className="otp-input"
                      maxLength={6}
                    />
                    <button 
                      type="button" 
                      onClick={emailOTP.verifyOTP}
                      className="otp-button"
                    >
                      Submit OTP
                    </button>
                  </div>
                )}
                {emailOTP.error && (
                  <p className="validation-error">{emailOTP.error}</p>
                )}
              </div>

              {/* Phone Field with OTP */}
              <div className="form-group">
                <label className="form-label">
                  Phone Number <span className="optional">(Optional)</span>
                </label>
                <div className="input-with-button">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number (10 digits)"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`form-input ${formData.phone && !validatePhone(formData.phone) ? 'invalid' : ''} ${phoneOTP.verified ? 'verified' : ''}`}
                  />
                  {formData.phone && validatePhone(formData.phone) && !phoneOTP.verified && (
                    <>
                      {!phoneOTP.otpSent && (
                        <button 
                          type="button" 
                          onClick={() => phoneOTP.requestOTP(formData.phone)}
                          className="verification-button"
                        >
                          Verify
                        </button>
                      )}
                      {phoneOTP.otpSent && phoneOTP.cooldown > 0 && (
                        <button 
                          disabled
                          className="verification-button disabled"
                        >
                          Wait {phoneOTP.cooldown}s
                        </button>
                      )}
                      {phoneOTP.otpSent && phoneOTP.cooldown === 0 && (
                        <button 
                          type="button" 
                          onClick={() => phoneOTP.requestOTP(formData.phone)}
                          className="verification-button"
                        >
                          Resend OTP
                        </button>
                      )}
                    </>
                  )}
                  {phoneOTP.verified && (
                    <span className="verified-badge">
                      <i className="fas fa-check-circle"></i> Verified
                    </span>
                  )}
                </div>
                {formData.phone && !validatePhone(formData.phone) && (
                  <p className="validation-error">Please enter a valid 10-digit phone number</p>
                )}
                {phoneOTP.showOTPInput && (
                  <div className="otp-container">
                    <input
                      type="text"
                      placeholder="Enter 6-digit OTP sent to your phone"
                      value={phoneOTP.userOTP}
                      onChange={(e) => phoneOTP.setUserOTP(e.target.value)}
                      className="otp-input"
                      maxLength={6}
                    />
                    <button 
                      type="button" 
                      onClick={phoneOTP.verifyOTP}
                      className="otp-button"
                    >
                      Submit OTP
                    </button>
                  </div>
                )}
                {phoneOTP.error && (
                  <p className="validation-error">{phoneOTP.error}</p>
                )}
              </div>

              {/* Message Field */}
              <div className="form-group">
                <label className="form-label">
                  Message <span className="required">*</span>
                </label>
                <textarea
                  name="message"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="form-input"
                  rows="6"
                />
              </div>

              <button 
                type="submit" 
                className="main-button" 
                disabled={loading || (formData.email && !emailOTP.verified) || (formData.phone && !phoneOTP.verified)}
              >
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
