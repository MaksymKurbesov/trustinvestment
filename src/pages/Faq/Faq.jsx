import styles from "./Faq.module.css";
import Collapse from "antd/lib/collapse";
import { useTranslation } from "react-i18next";
const { Panel } = Collapse;

const Faq = () => {
  const { t, i18n } = useTranslation();

  const FAQ_LIST = [
    {
      header: t("FAQ.1.question"),
      content: t("FAQ.1.answer"),
    },
    {
      header: t("FAQ.2.question"),
      content: t("FAQ.2.answer"),
    },
    {
      header: t("FAQ.3.question"),
      content: t("FAQ.3.answer"),
    },
    {
      header: t("FAQ.4.question"),
      content: t("FAQ.4.answer"),
    },
    {
      header: t("FAQ.5.question"),
      content: t("FAQ.5.answer"),
    },
    {
      header: t("FAQ.6.question"),
      content: t("FAQ.6.answer"),
    },
    {
      header: t("FAQ.7.question"),
      content: t("FAQ.7.answer"),
    },
    {
      header: t("FAQ.8.question"),
      content: t("FAQ.8.answer"),
    },
    {
      header: t("FAQ.9.question"),
      content: t("FAQ.9.answer"),
    },
    {
      header: t("FAQ.10.question"),
      content: t("FAQ.10.answer"),
    },
    {
      header: t("FAQ.11.question"),
      content: t("FAQ.11.answer"),
    },
    {
      header: t("FAQ.12.question"),
      content: t("FAQ.12.answer"),
    },
    {
      header: t("FAQ.13.question"),
      content: t("FAQ.13.answer"),
    },
    {
      header: t("FAQ.14.question"),
      content: t("FAQ.14.answer"),
    },
    {
      header: t("FAQ.15.question"),
      content: t("FAQ.15.answer"),
    },
    {
      header: t("FAQ.16.question"),
      content: t("FAQ.16.answer"),
    },
    {
      header: t("FAQ.17.question"),
      content: t("FAQ.17.answer"),
    },
    {
      header: t("FAQ.18.question"),
      content: t("FAQ.18.answer"),
    },
  ];

  return (
    <div className={`${styles["faq"]} container`}>
      <h3 data-aos={"fade-up"}>FAQ's</h3>
      <h2 data-aos={"fade-up"} data-aos-delay={300}>
        {t("FAQ.title")}
      </h2>
      <p data-aos={"fade-up"} data-aos-delay={500} className={styles["subtitle"]}>
        {t("FAQ.subtitle")}
      </p>
      <Collapse accordion className={styles["faq-collapse"]} data-aos={"fade-left"}>
        {FAQ_LIST.map((faq, i) => {
          return (
            <Panel header={faq.header} key={i + 1}>
              <p>{faq.content}</p>
            </Panel>
          );
        })}
      </Collapse>
    </div>
  );
};

export { Faq };
