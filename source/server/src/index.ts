import express, { json } from 'express'
import morgan from 'morgan'
import pool from './config/database'
import {
  authRouter,
  cardRouter,
  categoryRouter,
  couponRouter,
  fileRouter,
  orderDetailRouter,
  orderRouter,
  productColorRouter,
  productImageRouter,
  productInventoryRouter,
  productRouter,
  productSizeRouter,
  receiptDetailRouter,
  receiptRouter,
  reviewRouter,
  roleRouter,
  tokenRouter,
  userRouter,
} from './presentation/routers'
import config from './config'
import { errorMiddleware } from './shared/middlewares/errorMiddleware'
import { userContextMiddleware } from './shared/middlewares/userContextMiddleware'

const app = express()
const PORT = config.app.port

app.use(morgan('dev'))
app.use(json())

pool
  .connect()
  .then(() => {
    console.log('Connected to PostgreSQL database')

    app.use(userContextMiddleware)

    app.use(`${config.app.apiPrefix}/roles`, roleRouter)
    app.use(`${config.app.apiPrefix}/tokens`, tokenRouter)
    app.use(`${config.app.apiPrefix}/files`, fileRouter)
    app.use(`${config.app.apiPrefix}/categories`, categoryRouter)
    app.use(`${config.app.apiPrefix}/products`, productRouter)
    app.use(`${config.app.apiPrefix}/product-colors`, productColorRouter)
    app.use(`${config.app.apiPrefix}/product-sizes`, productSizeRouter)
    app.use(`${config.app.apiPrefix}/product-images`, productImageRouter)
    app.use(`${config.app.apiPrefix}/product-inventory`, productInventoryRouter)
    app.use(`${config.app.apiPrefix}/orders`, orderRouter)
    app.use(`${config.app.apiPrefix}/coupons`, couponRouter)
    app.use(`${config.app.apiPrefix}/receipts`, receiptRouter)
    app.use(`${config.app.apiPrefix}/receipt-details`, receiptDetailRouter)
    app.use(`${config.app.apiPrefix}/order-details`, orderDetailRouter)
    app.use(`${config.app.apiPrefix}/users`, userRouter)
    app.use(`${config.app.apiPrefix}/cards`, cardRouter)
    app.use(`${config.app.apiPrefix}/reviews`, reviewRouter)

    app.use(`${config.app.apiPrefix}/auth`, authRouter)

    app.use(errorMiddleware)

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`)
    })
  })
  .catch((error) => {
    console.error('Error connecting to database', error)
  })
