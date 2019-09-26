export default {
  addressList: () => {
    const addressList = [];
    for (let i = 0; i < 10; i++) {
      addressList.push({
        zipCode: `1020${i}`,
        roadAddress: `서울특별시 마포구 월드컵 북로21 ${i}번`,
        jibunAddress: `서울특별시 마포구 서교동 49-${i}`
      });
    }
    return addressList;
  }
};
