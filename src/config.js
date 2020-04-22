
export const config = {
  graphql : {
    uri: process.env.REACT_APP_GRAPHQL_URI,
  },
  auth0 : {
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
  },
};

function assertNotEmpty(key, val) {
  if (
    (val === undefined) ||
    (val === '') ||
    (val === null)
  ) {
    throw new Error(`Missing configuration for ${key}`);
  }
}

function assertNoEmptyValues(obj) {
  for (let key in obj) {
    const val = obj[key];
    if (typeof(val) === 'object') {
      assertNoEmptyValues(val);
    } else {
      assertNotEmpty(key, val);
    }
  }
}

assertNoEmptyValues(config)

export default config;
