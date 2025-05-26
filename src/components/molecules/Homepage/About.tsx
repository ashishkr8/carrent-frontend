import { useEffect, useState } from "react";
import AboutItem from "../../atoms/Homepage/AboutItem";
import "./css/About.css";
import AboutData from "../../../../public/about.json";

const About = () => {
  const [aboutUs, setAboutUs] = useState<any[]>([]);
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        setAboutUs(AboutData.content);
      } catch (error) {
        console.error("Error fetching About Data:", error);
      }
    };
    fetchAbout();
  }, []);

  return (
    <section id="about-us">
      <div className="subheadings" id="about-subhead">
        (ABOUT US)
      </div>
      {aboutUs.map((elem, key) => {
        return (
          <AboutItem
            key={key}
            head={elem.title}
            value={elem.numericValue}
            desc={elem.description}
          />
        );
      })}
    </section>
  );
};

export default About;
