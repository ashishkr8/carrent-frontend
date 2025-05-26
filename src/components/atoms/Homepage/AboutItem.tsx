import React from "react";
import "./css/AboutItem.css";

interface AboutItemTypes {
  head: string;
  value: number;
  desc: string;
}
const AboutItem: React.FC<AboutItemTypes> = ({ head, value, desc }) => {
  return (
    <>
      <div className="about-item">
        <div id="about-item-head">{head}</div>
        <div id="about-item-value">{value}</div>
        <div id="about-item-description">{desc}</div>
      </div>
    </>
  );
};

export default AboutItem;
