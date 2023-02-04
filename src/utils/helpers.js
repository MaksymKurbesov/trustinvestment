export function secondsToStringDays(secs) {
  const t = new Date(0); // Epoch
  t.setSeconds(secs);
  return t.toLocaleDateString("ru-RU");
}

export const sortByDate = (a, b) => {
  if (!a.date) return;
  return b.date - a.date;
};

export function getRandomArbitrary() {
  return Math.floor(Math.random() * 90000) + 10000;
}

export const hideDigitsInWallet = (text) => {
  if (!text) return "";

  return text.replace(/^.{2}/g, "**").substring(0, text.length - 2) + "**";
};

export const calculateUserBalance = (user) => {
  if (!user) return;
  return user.paymentMethods.reduce((accum, currentValue) => {
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

const monthNames = [
  "янв.",
  "фев",
  "мар",
  "апр",
  "май",
  "июн",
  "июл",
  "авг",
  "сен",
  "окт",
  "ноя",
  "дек",
];

export const parseDate = (date, offset = 0) => {
  const currentDate = new Date(date * 1000);
  currentDate.setDate(currentDate.getDate());
  const offsetDate = new Date(date * 1000);
  offsetDate.setDate(offsetDate.getDate() + offset);

  const correctDays = new Date(currentDate).getDate();
  const correctMonth = monthNames[new Date(currentDate).getMonth()];

  const offsetDays = new Date(offsetDate).getDate();
  const offsetMonth = monthNames[new Date(offsetDate).getMonth()];

  return `${correctDays} ${correctMonth} : ${offsetDays} ${offsetMonth}`;
};

export const getPaymentMethod = (list, paymentMethod) => {
  return list.find((item) => item.name === paymentMethod);
};
