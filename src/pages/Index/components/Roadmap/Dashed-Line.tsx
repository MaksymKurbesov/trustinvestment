import React from "react";
import styles from "./Roadmap.module.css";

const DashedLine = ({ cn }) => {
  return (
    <div className={styles[cn]}>
      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 229.56 229.56">
        <defs>
          <linearGradient id="linear-gradient" y1="114.78" x2="229.56" y2="114.78" gradientUnits="userSpaceOnUse">
            <stop offset="0.42" stopColor="#277abf">
              <animate
                attributeName="stop-color"
                values="#7A5FFF; #01FF89; #7A5FFF"
                dur="3s"
                repeatCount="indefinite"
              ></animate>
            </stop>
            <stop offset="0.55" stopColor="#4092a4">
              <animate
                attributeName="stop-color"
                values="#7A5FFF; #01FF89; #7A5FFF"
                dur="3s"
                repeatCount="indefinite"
                begin="0.5s"
              ></animate>
            </stop>
            <stop offset="0.71" stopColor="#5aac87">
              <animate
                attributeName="stop-color"
                values="#7A5FFF; #01FF89; #7A5FFF"
                dur="3s"
                repeatCount="indefinite"
                begin="1s"
              ></animate>
            </stop>
            <stop offset="0.85" stopColor="#69bb76">
              <animate
                attributeName="stop-color"
                values="#7A5FFF; #01FF89; #7A5FFF"
                dur="3s"
                repeatCount="indefinite"
                begin="1.5s"
              ></animate>
            </stop>
            <stop offset="0.96" stopColor="#6fc170">
              <animate
                attributeName="stop-color"
                values="#7A5FFF; #01FF89; #7A5FFF"
                dur="3s"
                repeatCount="indefinite"
                begin="2s"
              ></animate>
            </stop>
          </linearGradient>
        </defs>

        {/*<path filter="url(#sofGlow)" className={styles["cls-1"]} d="M.71,228.85c38-38,115.28-59.58,153.3-97.61S190.83,38.73,228.85.71"/>*/}
        <path filter="url(#sofGlow)" className={styles["cls-1"]} d="M.71,228.85Q114.79,114.79,228.85.71" />
      </svg>
    </div>
  );
};

export { DashedLine };
