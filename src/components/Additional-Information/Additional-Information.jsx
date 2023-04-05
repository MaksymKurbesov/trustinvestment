import styles from "./Additional-Information.module.css";

const AdditionalInformation = ({ infoLabel1, infoValue1, infoLabel2, infoValue2 }) => {
  console.log(infoValue2, "infoValue2");

  return (
    <div className={styles["additional-info"]}>
      {infoLabel1 ? (
        <p>
          {infoLabel1}: <span>{infoValue1} USD</span>
        </p>
      ) : (
        ""
      )}
      {infoLabel2 ? (
        <p>
          {infoLabel2}: <span>{infoValue2 || 0} USD</span>
        </p>
      ) : (
        ""
      )}
    </div>
  );
};

export { AdditionalInformation };
