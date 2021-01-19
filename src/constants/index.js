const ROUTES = {
  LANDING: '/',
  USER: '/user',
  DIRECTIONS: '/directions',
  TRAVEL: '/travels/:travel_id',
  TRAVELS: '/travels',
};

const URLS = {
  GITHUB: 'https://github.com/dohee3520',
  GOOGLE_STREETVIEW: 'https://maps.googleapis.com/maps/api/streetview?size=640x640&pitch=30&fov=100&source=outdoor',
  AWS_S3: 'https://among-earth.s3.ap-northeast-2.amazonaws.com',
};

const MESSAGES = {
  NICKNAME_LENGTH: '닉네임은 한 글자 이상 입력해 주세요.',
  ZERO_RESULT: '검색 결과가 없습니다.',
  REGION_SEARCH: '가고 싶은 나라를 입력해 주세요.',
  LANDMARK_SEARCH: '가고 싶은 랜드마크를 입력해 주세요.',
  RECOMMENDS_FAIL: '추천 경유지를 불러오는데 실패했습니다. 다시 시도해주세요.',
  MAP_FAIL: '지도를 불러오는데 실패했습니다. 다시 시도해주세요.',
  GET_PHOTOS_FAIL: '이미지를 불러들이는데 실패했습니다. 다시 시도해주세요.',
};

export { ROUTES, URLS, MESSAGES };
