import faker from "faker/locale/ko";

const getRandomBrowser = random => {
	const browserNo = random % 5;
	switch (browserNo) {
		case 0:
			return "Chrome";
		case 1:
			return "Internet Explorer";
		case 2:
			return "Safari";
		case 3:
			return "Firefox";
		case 4:
			return "Opera";
		default:
			return "삼성인터넷";
	}
};

const mockRows = () => {
  const rows = [];
  for (let i = 0; i < 104; i++) {
    rows.push({
      loginDate: faker.date.past().toLocaleString(),
      ip: faker.internet.ip(),
      device: faker.internet.userAgent(),
      browser: getRandomBrowser(
        faker.random.number({
          min: 0,
          max: 50
        })
      ),
      version: `${faker.random.number({
        min: 0,
        max: 3
      })}.${faker.random.number({
        min: 0,
        max: 9
      })}.${faker.random.number({
        min: 0,
        max: 9
      })}`,
      loginState:
        faker.random.number() % 2 === 0
          ? {
              label: "로그인",
              value: "login"
            }
          : {
              label: "로그아웃",
              value: "logout"
            }
    });
  }
  return rows;
};

const mocks = [...mockRows()];

// eslint-disable-next-line
export const requestLoginHistories = (offset = 0, limit = 30, callback) => {
  const mockRows = mocks;
  setTimeout(() => {
    const res = {
      rows: [],
      count: mockRows.length
    };

    for (let i = offset; i < offset + limit; i++) {
      if (i < mockRows.length) {
        res.rows.push(mockRows[i]);
      }
    }

    callback(res);
  }, 500);
};
