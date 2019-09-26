export const phoneNumRegex = new RegExp(
  /(^\+[0-9]{2}|^\+[0-9]{2}\(0\)|^\(\+[0-9]{2}\)\(0\)|^00[0-9]{2}|^0)([0-9]{9}$|[0-9\-\s]{10}$)/
);

export const getYearsOpts = () => {
  const years = [];

  for (let i = 2008; i >= 1980; i -= 1) {
    years.push({
      label: `${i}`,
      value: `${i}`
    });
  }

  return years;
};

export const getMonthsOpts = () => {
  const months = [];

  for (let i = 1; i < 13; i += 1) {
    months.push({
      label: `${i}`,
      value: `${i}`
    });
  }

  return months;
};

export const getDaysOpts = (year, month) => {
  const names = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const date = new Date(Number(year), Number(month) - 1, 1);
  const dates = [];
  while (date.getMonth() === month - 1) {
    dates.push({
      date: {
        label: `${date.getDate()}`,
        value: `${date.getDate()}`
      },
      day: {
        label: `${names[date.getDay()]}`,
        value: `${names[date.getDay()]}`
      }
    });
    date.setDate(date.getDate() + 1);
  }
  return dates;
};
