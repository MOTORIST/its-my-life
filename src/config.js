const dev = {
  API_URL: 'http://api.localhost/api',
  MAX_SIZE_UPLOAD_FILE: 2000,
};

const prod = {
  API_URL: 'https://api.itsmylife.space/api',
  MAX_SIZE_UPLOAD_FILE: 5000,
};

const config = process.env.NODE_ENV === 'production' ? prod : dev;

export default {
  ...config,
};