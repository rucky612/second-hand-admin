import LocalizedStrings from "react-localization";

export default new LocalizedStrings({
  ko: {
    SUB_HEADER_PRODUCT_MANAGER: "상품 관리",
    SUB_HEADER_PRODUCT_DETAIL: "상품 상세",
    PAPER_TITLE_PRODUCT_LIST: "상품 ",
    PAPER_TITLE_PRODUCT_DETAIL: "상품 정보",
    PAPER_TITLE_ADD_PRODUCT: "상품 등록",

    // Option
    OPTIONS_ALL: "전체",

    // Tab
    TAB_TITLE_IMAGE: "상품 이미지",
    TAB_TITLE_INFO: "상품 정보",

    // Modal
    MODAL_TITLE_IMAGE_MANAGER: "이미지 관리",
    MODAL_TITLE_ADD_ONE: "상품 등록",
    MODAL_DELETE_TITLE: "해당 상품 이미지를 삭제하시겠습니까?",
    MODAL_DELETE_OK: "삭제",
    MODAL_DELETE_CANCEL: "취소",

    // Table columns
    COL_PRODUCT_NAME: "상품명",
    COL_PRODUCT_UPC: "번호",
    COL_PRODUCT_CATEGORY: "카테고리",
    COL_PRODUCT_DESCRIPTION: "설명",
    COL_PRODUCT_AMOUNT: "수량",
    COL_PRODUCT_PRICE: "가격",
    COL_PRODUCT_STATUS: "상태",
    COL_PRODUCT_PHOTO: "사진",
    COL_ACTION: "액션",

    COL_PRODUCT_ADD_SPEC_TITLE: "제목",
    COL_PRODUCT_ADD_SPEC_CONTENT: "제목",

    TABLE_COL_IMG: "이미지",
    TABLE_COL_NAME: "이름",
    TABLE_COL_SIZE: "사이즈",
    TABLE_COL_DATE: "등록일",

    // Table Error
    TABLE_ERROR: '데이터를 가져오지 못했습니다. 새로고침 부탁드립니다.',

    // Table Category Delete
    TABLE_CATEGORY_DELETE: '정말 삭제하시겠습니까?',

    // Tag String
    TAG_DISPLAY: '전시중',
    TAG_DISPLAY_NOT: '비전시중',

    // Form labels
    FORM_LABEL_CATEGORY: "카테고리",
    FORM_LABEL_STATUS: "진열상태",
    FORM_LABEL_NAME: "상품명",
    FORM_LABEL_DESCRIPTION: "상품설명",
    FORM_LABEL_IMAGE: "상품이미지",
    FORM_LABEL_AMOUNT: "상품수량",
    FORM_LABEL_PRICE: "판매가",

    // Form placeholder
    FORM_PH_CATEGORY: "카테고리를 입력해주세요",
    FORM_PH_STATUS: "진열상태를 선택해주세요",
    FORM_PH_NAME: "상품명을 입력해주세요",
    FORM_PH_DESCRIPTION: "상품설명을 입력해주세요",
    FORM_PH_IMAGE: "상품이미지를 올려주세요",
    FORM_PH_AMOUNT: "상품수량을 선택해주세요",
    FORM_PH_PRICE: "판매가를 입력해주세요",

    // Form validate
    FORM_CATEGORY_REQUIRED: '카테고리명을 적어주세요',
    FORM_NAME_REQUIRED: '상품명을 적어주세요',
    FORM_PRICE_POSITIVE: '가격은 양수만 가능합니다',
    FORM_PRICE_INTEGER: '가격은 정수만 입력해주세요',
    FORM_AMOUNT_POSITIVE: '양은 양수만 가능합니다',
    FORM_AMOUNT_INTEGER: '양은 정수만 입력해주세요',

    // Form errors
    FORM_ERR_PRODUCT_NAME_REQUIRED: "품목명을 입력해주세요"
  }
});
