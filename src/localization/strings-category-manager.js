import LocalizedStrings from 'react-localization';

export default new LocalizedStrings({
  ko: {
    SUB_HEADER_CATEGORY_MANAGER: '카테고리 관리',
    SUB_HEADER_CATEGORY_DETAIL: '취급품목상세',
    PAPER_TITLE_CATEGORY_LIST: '카테고리',
    PAPER_TITLE_CATEGORY_DETAIL: '취급품목정보',
    PAPER_TITLE_ADD_CATEGORY: '카테고리 등록',

    // Option
    OPTIONS_ALL: '전체',

    // Tab
    TAB_TITLE_DEFAULT: '기본정보',
    TAB_TITLE_INFO: '상품정보제공고시',

    // Modal
    MODAL_TITLE_IMAGE_MANAGER: '이미지 관리',
    MODAL_TITLE_ADD_ONE: '카테고리 등록',
    MODAL_DELETE_TITLE: '해당 카테고리를 삭제하면 카테고리의 상품들도 자동 삭제됩니다. 삭제하시겠습니까?',
    MODAL_DELETE_OK: '삭제',
    MODAL_DELETE_CANCEL: '취소',

    // Table columns
    COL_CATEGORY_NAME: '카테고리명',
    COL_CATEGORY_UPC: '번호',
    COL_CATEGORY_MODEL: '모델명',
    COL_CATEGORY_BRAND: '브랜드',
    COL_CATEGORY_CATEGORY1: '카테고리1',
    COL_CATEGORY_CATEGORY2: '카테고리2',
    COL_CATEGORY_CATEGORY3: '카테고리3',
    COL_CATEGORY_PRICE: '매입가',
    COL_CATEGORY_PHOTO: '사진',
    COL_ACTION: '액션',

    COL_CATEGORY_ADD_SPEC_TITLE: '제목',
    COL_CATEGORY_ADD_SPEC_CONTENT: '제목',

    // Table Error
    TABLE_ERROR: '데이터를 가져오지 못했습니다. 새로고침 부탁드립니다.',

    // Table Category Delete
    TABLE_CATEGORY_DELETE: '정말 삭제하시겠습니까?',

    // Form labels
    FORM_LABEL_CATEGORY: '카테고리',
    FORM_LABEL_NAME: '상품명',
    FORM_LABEL_DESCRIPTION: '상품설명',
    FORM_LABEL_IMAGE: '상품이미지',
    FORM_LABEL_AMOUNT: '상품수량',
    FORM_LABEL_PRICE: '판매가',

    // Form placeholder
    FORM_PH_CATEGORY: '카테고리를 입력해주세요',
    FORM_PH_NAME: '상품명을 입력해주세요',
    FORM_PH_DESCRIPTION: '상품설명을 입력해주세요',
    FORM_PH_IMAGE: '상품이미지를 올려주세요',
    FORM_PH_AMOUNT: '상품수량을 선택해주세요',
    FORM_PH_PRICE: '판매가를 입력해주세요',

    // Form validate
    FORM_CATEGORM_REQUIRED: '카테고리명을 적어주세요',

    // Form errors
    FORM_ERR_CATEGORY_NAME_REQUIRED: '품목명을 입력해주세요',
    FORM_FETCH_ERR: '해당 카테고리는 이미 존재합니다. 다른 이름으로 설정해주세요'
  },
});
