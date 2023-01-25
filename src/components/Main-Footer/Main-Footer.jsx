import { Layout } from "antd";
import styles from "./Main-Footer.module.css";
import { useRef } from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

const { Footer: AntFooter } = Layout;

const MainFooter = () => {
  const ref = useRef(null);
  const entry = useIntersectionObserver(ref, {});
  const isVisible = !!entry?.isIntersecting;

  return (
    <AntFooter ref={ref} className={styles["footer"]}>
      <p className={isVisible ? styles["aos-animate"] : ""}>
        Copyright © 2016 – 2023. Trust Investment Inc. All rights reserved
      </p>
    </AntFooter>
  );
};

export { MainFooter };
