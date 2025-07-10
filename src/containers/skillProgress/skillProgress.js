import React, { useEffect, useState } from "react";
import "./Progress.scss";
import {illustration, techStack} from "../../portfolio";
import {Fade} from "react-reveal";
import Build from "../../assets/lottie/build";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";

export default function StackProgress() {
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 } // Trigger when 20% of the element is visible
    );
    
    const skillsSection = document.querySelector(".skills-container");
    if (skillsSection) {
      observer.observe(skillsSection);
    }
    
    return () => {
      if (skillsSection) {
        observer.unobserve(skillsSection);
      }
    };
  }, []);

  if (techStack.viewSkillBars) {
    return (
      <Fade bottom duration={1000} distance="20px">
        <div className="skills-container">
          <div className="skills-bar">
            <h1 className="skills-heading">Proficiency</h1>
            {techStack.experience.map((exp, i) => {
              const progressStyle = {
                width: isInView ? exp.progressPercentage : "0%",
                transition: `width 1.5s ease-in-out ${i * 0.3}s`
              };
              
              return (
                <div key={i} className="skill">
                  <p>
                    {exp.icon && <i className={`${exp.icon} skill-icon`}></i>}
                    {exp.Stack}
                    <span className="skill-percentage">{exp.progressPercentage}</span>
                  </p>
                  <div className="meter">
                    <span style={progressStyle}></span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="skills-image">
            {illustration.animated ? (
              <DisplayLottie animationData={Build} />
            ) : (
              <img
                alt="Skills"
                src={require("../../assets/images/skill.svg")}
              />
            )}
          </div>
        </div>
      </Fade>
    );
  }
  return null;
}
