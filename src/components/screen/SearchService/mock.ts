const THUMBNAIL =
  'https://facebook.github.io/react-native/docs/assets/favicon.png';

export interface Service {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  initialGroup: string;
}

// category key is already localized
export const SERVICE_LIST: Service[] = [
  {
    id: '1',
    name: '휴대폰ㆍ인터넷ㆍTV',
    category: 'CATEGORY_COMMUNICATION_EXPENSE',
    thumbnail: THUMBNAIL,
    initialGroup: '0',
  },
  {
    id: '2',
    name: '대출ㆍ보험ㆍ적금ㆍ예금ㆍ곗돈',
    category: 'CATEGORY_FINANCE',
    thumbnail: THUMBNAIL,
    initialGroup: '0',
  },
  {
    id: '3',
    name: '공과금ㆍ렌탈',
    category: 'CATEGORY_RESIDENCE_AND_MAINTENANCE',
    thumbnail: THUMBNAIL,
    initialGroup: '0',
  },
  {
    id: '4',
    name: '학원ㆍ기부ㆍ헌금',
    category: 'CATEGORY_ETC',
    thumbnail: THUMBNAIL,
    initialGroup: '0',
  },
  {
    id: '5',
    name: '넷플릭스',
    category: 'CATEGORY_ENTERTAINMENT',
    thumbnail: THUMBNAIL,
    initialGroup: '1',
  },
  {
    id: '6',
    name: '에버노트',
    category: 'CATEGORY_PRODUCTIVITY',
    thumbnail: THUMBNAIL,
    initialGroup: '1',
  },
  {
    id: '7',
    name: '폴라리스 오피스',
    category: 'CATEGORY_PRODUCTIVITY',
    thumbnail: THUMBNAIL,
    initialGroup: '1',
  },
  {
    id: '8',
    name: '유투브 프리미엄',
    category: 'CATEGORY_ENTERTAINMENT',
    thumbnail: THUMBNAIL,
    initialGroup: '1',
  },
  {
    id: '9',
    name: '멜론',
    category: 'CATEGORY_MUSIC',
    thumbnail: THUMBNAIL,
    initialGroup: '1',
  },
];

export const EXCEPTIONAL_CATEGORY_CASE = 'CATEGORY_RECOMMENDED';
export const CATEGORY_LIST = [
  'CATEGORY_COMMUNICATION_EXPENSE',
  'CATEGORY_FINANCE',
  'CATEGORY_RESIDENCE_AND_MAINTENANCE',
  'CATEGORY_ETC',
  'CATEGORY_ENTERTAINMENT',
  'CATEGORY_PRODUCTIVITY',
  'CATEGORY_MUSIC',
];
// push the exceptional case to the first index
CATEGORY_LIST.unshift(EXCEPTIONAL_CATEGORY_CASE);

export interface SeviceGroupTable {
  [key: string]: { key: string; order: number };
}
// title order lookup table
// `order` should starts from 0 and consecutively
// `order` is being used when initial case
export const INITIAL_GROUP_ORDER_TABLE: SeviceGroupTable = {
  0: { key: 'SERVICE_GROUP_LIVING_EXPENSE', order: 0 },
  1: { key: 'SERVICE_GROUP_SUBSCRIPTION_SERVICE', order: 1 },
};
