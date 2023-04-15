import React from "react";
import styles from "./Waves.module.css";

const Waves = ({ cn }) => {
  return (
    <svg
      className={styles[cn]}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0
      24 150 28"
      preserveAspectRatio="none"
      shapeRendering="auto"
    >
      <defs>
        <path
          // opacity="0.5"
          id="gentle-wave"
          d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
        />
      </defs>
      <g className={styles["parallax"]}>
        {/*<use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(0, 21, 41, 0.8)" />*/}
        {/*<use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(0, 21, 41, 0.5)" />*/}
        {/*<use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(0, 21, 41, 0.3)" />*/}
        {/*<use xlinkHref="#gentle-wave" x="48" y="7" fill="rgba(0, 21, 41, 1)" />*/}
        <use xlinkHref="#gentle-wave" x="48" y="0" />
        <use xlinkHref="#gentle-wave" x="48" y="3" />
        <use xlinkHref="#gentle-wave" x="48" y="5" />
        <use xlinkHref="#gentle-wave" x="48" y="7" />
      </g>
    </svg>
  );
};

export { Waves };
