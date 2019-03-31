const dev = {
  API_URL: 'http://localhost:8080/api',
};

const prod = {
  API_URL: 'http://84.201.150.106:8080/api',
};

const config = process.env.NODE_ENV === 'production' ? prod : dev;

export default {
  ...config,
};