import axios from "axios";

export const ADDRESS_URL = "http://www.juso.go.kr/addrlink/addrLinkApi.do";

export const ADDRESS_KEY = "U01TX0FVVEgyMDE5MDEzMTE5MzMwOTEwODQ4OTI=";

const searchOpts = {
  confmKey: ADDRESS_KEY,
  currentPage: 1,
  countPerPage: 100,
  keyword: "한국",
  resultType: "json"
};

const AllOption = {
  label: "전체",
  value: "전체"
};

const hasOption = (opts, address, key) =>
  opts.some(item => item.value === address[key]);

let mockAddress = [];

async function mockAddressFunc() {
  const countArr = [];
  for (let i = 0; i < 20; i += 1) {
    countArr.push(i);
  }
  await Promise.all(
    countArr.map(async index => {
      const res = await axios.post(ADDRESS_URL, null, {
        params: { ...searchOpts, currentPage: index }
      });
      const addressArr = res.data.results.juso;
      mockAddress = [...mockAddress, ...addressArr];
    })
  );
  return mockAddress;
}

export async function siOpts(inputValue) {
  let siOpts = [AllOption];
  if (mockAddress.length === 0) {
    await mockAddressFunc();
  }
  mockAddress.forEach(address => {
    if (!hasOption(siOpts, address, "siNm")) {
      if (inputValue) {
        if (address.siNm.indexOf(inputValue) !== -1) {
          siOpts = [
            ...siOpts,
            {
              label: address.siNm,
              value: address.siNm
            }
          ];
        }
      } else {
        siOpts = [
          ...siOpts,
          {
            label: address.siNm,
            value: address.siNm
          }
        ];
      }
    }
  });

  return siOpts;
}

export async function sggOpts(inputValue, callback, key) {
  let mockSggNm = {};
  mockAddress.forEach(address => {
    if (!mockSggNm[address.siNm]) {
      mockSggNm = {
        ...mockSggNm,
        [address.siNm]: [
          AllOption,
          {
            label: address.sggNm,
            value: address.sggNm
          }
        ]
      };
    }
    if (
      !!mockSggNm[address.siNm] &&
      !hasOption(mockSggNm[address.siNm], address, "sggNm")
    ) {
      mockSggNm = {
        ...mockSggNm,
        [address.siNm]: [
          ...mockSggNm[address.siNm],
          {
            label: address.sggNm,
            value: address.sggNm
          }
        ]
      };
    }
  });

  return mockSggNm[key];
}

export async function emdOpts(inputValue, callback, key) {
  let mockEmdNm = {};
  mockAddress.forEach(address => {
    if (!mockEmdNm[address.sggNm]) {
      mockEmdNm = {
        ...mockEmdNm,
        [address.sggNm]: [
          AllOption,
          {
            label: address.emdNm,
            value: address.emdNm
          }
        ]
      };
    }
    if (
      !!mockEmdNm[address.sggNm] &&
      !hasOption(mockEmdNm[address.sggNm], address, "emdNm")
    ) {
      mockEmdNm = {
        ...mockEmdNm,
        [address.sggNm]: [
          ...mockEmdNm[address.sggNm],
          {
            label: address.emdNm,
            value: address.emdNm
          }
        ]
      };
    }
  });
  return mockEmdNm[key];
}
