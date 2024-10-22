export default {
  app: {
    port: process.env.PORT || 3000,
    apiPrefix: '/api/v1',
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || 'youraccesstokensecret',
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'yourrefreshtokensecret',
    accessTokenExpireSeconds: parseInt(process.env.ACCESS_TOKEN_EXPIRE_SECONDS || '900'),
    refreshTokenExpireSeconds: parseInt(process.env.REFRESH_TOKEN_EXPIRE_SECONDS || '604800'),
  },
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'dev_user',
    password: process.env.DB_PASSWORD || 'dev_password',
    database: process.env.DB_NAME || 'dev_db',
  },
}
