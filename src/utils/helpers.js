import { BITCOIN, BNB, ETHEREUM, PERFECT_MONEY, POLKADOT, SOLANA, TRC20_TETHER, QIWI } from "./consts";

export function secondsToStringDays(secs) {
  const t = new Date(0); // Epoch
  t.setSeconds(secs);
  return t.toLocaleDateString("ru-RU");
}

export function getRandomArbitrary() {
  return Math.floor(Math.random() * 90000) + 10000;
}

export const hideDigitsInWallet = (text) => {
  if (!text) return "";

  return text.replace(/^.{2}/g, "U**").substring(0, text.length - 1) + "**";
};

export const calculateUserBalance = (user) => {
  if (!user) return;

  return Object.values(user.paymentMethods).reduce((accum, currentValue) => {
    return accum + Number(currentValue.available);
  }, 0);
};

export const normalizeDate = (date) => {
  return date.map((item) => {
    return {
      ...item,
      date: secondsToStringDays(item.date),
    };
  });
};

export const getMonthNames = (t) => {
  return [
    t("personal_area.january"),
    t("personal_area.february"),
    t("personal_area.march"),
    t("personal_area.april"),
    t("personal_area.may"),
    t("personal_area.june"),
    t("personal_area.july"),
    t("personal_area.august"),
    t("personal_area.september"),
    t("personal_area.october"),
    t("personal_area.november"),
    t("personal_area.december"),
  ];
};

export const ParseDate = (date, offset = 0, monthNames, isShort) => {
  const currentDate = new Date(date.seconds * 1000);
  currentDate.setDate(currentDate.getDate());
  const offsetDate = new Date(date.seconds * 1000);
  offsetDate.setDate(offsetDate.getDate() + offset);

  const getTime = (date) => {
    const hours = new Date(date).getHours() < 10 ? `0${new Date(date).getHours()}` : new Date(date).getHours();
    const minutes = new Date(date).getMinutes() < 10 ? `0${new Date(date).getMinutes()}` : new Date(date).getMinutes();
    const seconds = new Date(date).getSeconds() < 10 ? `0${new Date(date).getSeconds()}` : new Date(date).getSeconds();

    return `${hours}:${minutes}:${seconds}`;
  };

  const correctDays = new Date(currentDate).getDate();
  // const correctMonth = monthNames[new Date(currentDate).getMonth()];

  const offsetDays = new Date(offsetDate).getDate().toLocaleString();
  // const offsetMonth = monthNames[new Date(offsetDate).getMonth()];

  const shortDate = `${correctDays} ${new Date(currentDate).getMonth()} : ${offsetDays} ${new Date(
    offsetDate
  ).getMonth()}`;
  const splittedText = shortDate.split(":");

  let correctOpeningDate;
  let correctClosingDate;

  correctOpeningDate = `${splittedText[0].split(" ")[0]} ${monthNames[+splittedText[0].split(" ")[1]]} ${getTime(
    currentDate
  )}`;
  correctClosingDate = `${splittedText[1].split(" ")[1]} ${monthNames[+splittedText[1].split(" ")[2]]} ${getTime(
    currentDate
  )}`;

  if (isShort) {
    correctOpeningDate = `${splittedText[0].split(" ")[0]} ${monthNames[+splittedText[0].split(" ")[1]].slice(0, 3)}.`;
    correctClosingDate = `${splittedText[1].split(" ")[1]} ${monthNames[+splittedText[1].split(" ")[2]].slice(0, 3)}.`;
  }

  return {
    open: correctOpeningDate,
    close: correctClosingDate,
  };
};

export const getNextAccrual = (deposit) => {
  let nearestDate = new Date(deposit.date.seconds * 1000);
  const planNumber = Number(deposit.planNumber.match(/\d+/)[0]);

  if (planNumber > 3) {
    nearestDate.setDate(nearestDate.getDate() + deposit.days);
  } else {
    nearestDate.setDate(nearestDate.getDate() + deposit.charges + 1);
  }

  return nearestDate.getTime();
};

export const declensionNum = (num, words) => {
  return words[num % 100 > 4 && num % 100 < 20 ? 2 : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? num % 10 : 5]];
};

export const getClosingDate = (openDate, offsetDays, language, settings) => {
  const t = new Date(openDate);
  t.setDate(t.getDate() + offsetDays);

  return new Date(t).toLocaleDateString(language, settings);
};

export const calculateIncomeInDay = (form) => {
  const plan = form.getFieldValue("plan");

  if (!plan?.percent) return;

  return +((form.getFieldValue("amount") / 100) * form.getFieldValue("plan").percent).toFixed(2) || 0;
};

export const calculateTotalIncome = (form) => {
  const plan = form.getFieldValue("plan");

  if (!plan?.percent) return;

  return (
    +(
      (form.getFieldValue("amount") / 100) *
      form.getFieldValue("plan")?.percent *
      form.getFieldValue("plan")?.days
    ).toFixed(2) || 0
  );
};

export const setUserCustomFields = (signedUpUser, customFields) => {
  return {
    uid: signedUpUser.uid,
    email: customFields.email.toLowerCase(),
    nickname: customFields.nickname,
    phoneNumber: customFields.phone ? customFields.phone : "",
    referredBy: customFields.referredBy,
    registrationDate: new Date(signedUpUser.metadata.creationTime),
    referredTo: {},
    earned: 0,
    referals: 0,
    withdrawn: 0,
    invested: 0,
    paymentMethods: {
      [PERFECT_MONEY]: {
        available: 0,
        deposited: 0,
        referrals: 0,
        withdrawn: 0,
        number: "",
      },
      [BITCOIN]: {
        available: 0,
        deposited: 0,
        referrals: 0,
        withdrawn: 0,
        number: "",
      },
      [ETHEREUM]: {
        available: 0,
        deposited: 0,
        referrals: 0,
        withdrawn: 0,
        number: "",
      },
      [TRC20_TETHER]: {
        available: 0,
        deposited: 0,
        referrals: 0,
        withdrawn: 0,
        number: "",
      },
      [SOLANA]: {
        available: 0,
        deposited: 0,
        referrals: 0,
        withdrawn: 0,
        number: "",
      },
      [POLKADOT]: {
        available: 0,
        deposited: 0,
        referrals: 0,
        withdrawn: 0,
        number: "",
      },
      [BNB]: {
        available: 0,
        deposited: 0,
        referrals: 0,
        withdrawn: 0,
        number: "",
      },
      [QIWI]: {
        available: 0,
        deposited: 0,
        referrals: 0,
        withdrawn: 0,
        number: "",
      },
    },
  };
};
