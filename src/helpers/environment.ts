type ENV_TYPE = {
  [x: string]: {
    API_URL: string;
    [y: string]: any;
  };
};

const ENV: ENV_TYPE = {
  development: {
    API_URL: 'http://localhost:8080',
  },
  staging: {
    API_URL: 'http://localhost:8080',
  },
  production: {
    API_URL: 'https://api.brightchamps.click',
  },
};

const getEnvVars = (env = process.env.NODE_ENV as string) => {
  return ENV[env];
};

export default getEnvVars;
