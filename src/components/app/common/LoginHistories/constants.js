export default {
  mockRows: () => {
    const rows = [];
    for (let i = 0; i < 100; i++) {
      rows.push({
        loginDate: `2019-01-03 22:00:22`,
        ip: `192.168.${i}.1`,
        device: `OS X Windows Android`,
        browser: "Chrome Explorer",
        version: `0.0.${i}`,
        loginState:
          i % 2 === 0
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
  }
};
