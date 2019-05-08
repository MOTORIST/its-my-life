const dev = {
  API_URL: 'http://api.localhost/api',
  MAX_SIZE_UPLOAD_FILE: 2000,
  MASONRY_ITEM_WIDTH: 200,
};

const prod = {
  API_URL: 'https://api.itsmylife.space/api',
  MAX_SIZE_UPLOAD_FILE: 10000,
  MASONRY_ITEM_WIDTH: 200,
};

const config = process.env.NODE_ENV === 'production' ? prod : dev;

export default {
  ...config,
};