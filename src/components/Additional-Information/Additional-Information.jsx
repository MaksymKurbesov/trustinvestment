import styles from "./Additional-Information.module.css";

const AdditionalInformation = ({
  infoLabel1,
  infoValue1,
  infoLabel2,
  infoValue2,
}) => {
  return (
    <div className={styles["additional-info"]}>
      <p>
        {infoLabel1}: <span>{infoValue1} USD</span>
      </p>
      <p>
        {infoLabel2}: <span>{infoValue2} USD</span>
      </p>
    </div>
  );
};

export { AdditionalInformation };
