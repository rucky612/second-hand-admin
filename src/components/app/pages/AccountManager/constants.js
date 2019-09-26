import React from "react";
import Img from "../../../../style/img/profile2.png";
import Icon from "../../../base/common/Icon";

export const paperOptions = [
  {
    icon: <Icon icon="la-cloud" size="2rem" />,
    onClick: () => console.log("link click!")
  },
  {
    icon: <Icon icon="la-cog" size="2rem" />
  },
  {
    icon: <Icon icon="la-ellipsis-h" size="2rem" />
  }
];

export const accountInfo = {
  positionOptions: [
    {
      label: "사원",
      value: "employee"
    },
    {
      label: "수습",
      value: "apprentice"
    }
  ],
  authorOptions: [
    {
      label: "관리자",
      value: "admin"
    },
    {
      label: "사원",
      value: "employee"
    },
    {
      label: "수습",
      value: "apprentice"
    }
  ]
};

export const userInfo = {
  photoList: {
    fileList: [
      {
        uid: "-1",
        name: "profile.jpg",
        status: "done",
        url: Img
      }
    ]
  },
  name: "이로아",
  position: {
    ...accountInfo.positionOptions[1]
  },
  email: "sngsng12@naver.com",
  authority: {
    ...accountInfo.authorOptions[0]
  },
  phone: "01011112222",
  nickname: "sng23"
};

export const pwdInfo = {
  prevPwd: "123qwe"
};
