import { AlertCustom } from "./type";
import { AlertSVG } from "./AlertSVG";
import "./Alertbox.css";
import { useAlert } from "./useAlert";

const AlertBox = ({ alert }: { alert: AlertCustom }) => {
  const { type, heading, message } = alert;
  const { collapse } = useAlert();
  const selectedSvg = AlertSVG[type];
  const alertClass = `${type}-alert`;
  // console.log(alertClass);
  return (
    <div className={`${alertClass} alert-box`}>
      <div id={`${type}-check`} className="alert-icon">
        {selectedSvg}
      </div>
      <div id={`${type}-box`} className="alert-content">
        <div id={`${type}-heading`} className="alert-heading">
          {heading} {/* Display alert headingno */}
        </div>
        <div id={`${type}-message`} className="alert-message">
          {message} {/* Display alert message */}
        </div>
      </div>
      <div id={`${type}-cross`} className="alert-close">
        <button
          aria-label="Dismiss Alert"
          style={{
            background: "none",
            border: "none",
            padding: "0",
            fontSize: "18px",
            cursor: "pointer",
          }}
          onClick={collapse}
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.3999 6.91961L2.22925 10.099C2.02853 10.2982 1.77345 10.3979 1.46403 10.3979C1.15461 10.3979 0.89954 10.2982 0.698815 10.099C0.49954 9.89969 0.399902 9.64606 0.399902 9.33809C0.399902 9.03012 0.49954 8.7765 0.698815 8.57722L3.87816 5.39787L0.698815 2.2544C0.49954 2.05367 0.399902 1.7986 0.399902 1.48918C0.399902 1.17976 0.49954 0.924686 0.698815 0.723961C0.898091 0.524686 1.15171 0.425049 1.45968 0.425049C1.76766 0.425049 2.02128 0.524686 2.22055 0.723961L5.3999 3.90331L8.54338 0.723961C8.7441 0.524686 8.99918 0.425049 9.3086 0.425049C9.61802 0.425049 9.87309 0.524686 10.0738 0.723961C10.2912 0.941353 10.3999 1.19969 10.3999 1.49896C10.3999 1.79824 10.2912 2.04715 10.0738 2.2457L6.89447 5.39787L10.0738 8.56853C10.2731 8.76925 10.3727 9.02432 10.3727 9.33374C10.3727 9.64316 10.2731 9.89824 10.0738 10.099C9.85642 10.3164 9.59845 10.425 9.2999 10.425C9.00135 10.425 8.75207 10.3164 8.55207 10.099L5.3999 6.91961Z"
              fill="black"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AlertBox;
