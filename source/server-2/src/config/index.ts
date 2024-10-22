import dotenv from 'dotenv'
import path from 'path'

// Load biến môi trường từ tệp .env
dotenv.config({
  path: path.resolve(__dirname, `../../.env.${process.env.NODE_ENV || 'development'}`),
})

import developmentConfig from './env/development'
import productionConfig from './env/production'
import testConfig from './env/test'

const configs = {
  development: developmentConfig,
  production: productionConfig,
  test: testConfig,
}

const env = (process.env.NODE_ENV || 'development') as keyof typeof configs

export default configs[env]
