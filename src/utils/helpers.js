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

const monthNames = ["янв.", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];

export const parseDate = (date, offset = 0) => {
  const currentDate = new Date(date.seconds * 1000);
  currentDate.setDate(currentDate.getDate());
  const offsetDate = new Date(date.seconds * 1000);
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

export const getNextAccrual = (deposit) => {
  let nearestDate = new Date(deposit.date.seconds * 1000);
  nearestDate.setDate(nearestDate.getDate() + deposit.charges + 1);
  return nearestDate.getTime();
};

export const declensionNum = (num, words) => {
  return words[num % 100 > 4 && num % 100 < 20 ? 2 : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? num % 10 : 5]];
};
