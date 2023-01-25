import { PaymentMethods } from "../../components/Payment-Methods/Payment-Methods";
import styles from "./Withdraw.module.css";
import { Button, Input } from "antd";
import { ChoosePaymentMethod } from "../../components/Choose-Payment-Method/Choose-Payment-Method";
import { EnterAmount } from "../../components/Enter-Amount/Enter-Amount";
import { AdditionalInformation } from "../../components/Additional-Information/Additional-Information";
import { useState } from "react";

const Withdraw = () => {
  const [amount, setAmount] = useState(0);

  return (
    <div className={styles["withdraw"]}>
      <h2 className={"my-account-title"}>Вывод средств</h2>
      <p className={styles["withdraw-info"]}>
        Перед тем, как вывести средства на свой кошелек, убедитесь, что на
        странице «Настройки» вами были введены реквизиты для вывода на
        интересующую вас платежную систему. Обратите внимание что Trust
        Investment не предоставляет услуги обмена, поэтому вывод возможен только
        на ту платежную систему, с которой заводились средства на депозит.
      </p>
      <ChoosePaymentMethod stepNumber={"01"} />
      <EnterAmount stepNumber={"02"} amountHandler={setAmount} />
      <AdditionalInformation
        infoLabel1={"Комиссия"}
        infoValue1={0}
        infoLabel2={"Будет выведено с учетом комиссии"}
        infoValue2={amount}
      />
      <Button>Вывести средства</Button>
    </div>
  );
};

export { Withdraw };
