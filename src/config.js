const dev = {
  API_URL: 'http://localhost:8080/api',
};

const prod = {
  API_URL: 'http://localhost:8080/api',
};

const config = process.env.REACT_APP_STAGE === 'production' ? prod : dev;

export default {
  ...config,
};