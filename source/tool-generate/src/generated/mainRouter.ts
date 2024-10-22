  import { TokenPostgresRepo } from '../../infrastructure/repositories/TokenPostgresRepo'
  import { TokenController } from '../controllers/TokenController'
  import { createTokenRouter } from './TokenRouter'
  import { CreateTokenUseCase } from '../../application/use-cases/token/CreateTokenUseCase'
  import { UpdateTokenUseCase } from '../../application/use-cases/token/UpdateTokenUseCase'
  import { FindTokenByIdUseCase } from '../../application/use-cases/token/FindTokenByIdUseCase'
  import { FindAllTokenssUseCase } from '../../application/use-cases/token/FindAllTokensUseCase'
  import { DeleteTokenUseCase } from '../../application/use-cases/token/DeleteTokenUseCase'

  const tokenRepo = new TokenPostgresRepo()
  const createTokenUseCase = new CreateTokenUseCase(tokenRepo)
  const updateTokenUseCase = new UpdateTokenUseCase(tokenRepo)
  const findTokenByIdUseCase = new FindTokenByIdUseCase(tokenRepo)
  const findAllTokenssUseCase = new FindAllTokenssUseCase(tokenRepo)
  const deleteTokenUseCase = new DeleteTokenUseCase(tokenRepo)
  const tokenController = new TokenController(
    createTokenUseCase,
    updateTokenUseCase,
    findTokenByIdUseCase,
    findAllTokenssUseCase,
    deleteTokenUseCase
  )
  export const tokenRouter = createTokenRouter(tokenController)


  import { FilePostgresRepo } from '../../infrastructure/repositories/FilePostgresRepo'
  import { FileController } from '../controllers/FileController'
  import { createFileRouter } from './FileRouter'
  import { CreateFileUseCase } from '../../application/use-cases/file/CreateFileUseCase'
  import { UpdateFileUseCase } from '../../application/use-cases/file/UpdateFileUseCase'
  import { FindFileByIdUseCase } from '../../application/use-cases/file/FindFileByIdUseCase'
  import { FindAllFilessUseCase } from '../../application/use-cases/file/FindAllFilesUseCase'
  import { DeleteFileUseCase } from '../../application/use-cases/file/DeleteFileUseCase'

  const fileRepo = new FilePostgresRepo()
  const createFileUseCase = new CreateFileUseCase(fileRepo)
  const updateFileUseCase = new UpdateFileUseCase(fileRepo)
  const findFileByIdUseCase = new FindFileByIdUseCase(fileRepo)
  const findAllFilessUseCase = new FindAllFilessUseCase(fileRepo)
  const deleteFileUseCase = new DeleteFileUseCase(fileRepo)
  const fileController = new FileController(
    createFileUseCase,
    updateFileUseCase,
    findFileByIdUseCase,
    findAllFilessUseCase,
    deleteFileUseCase
  )
  export const fileRouter = createFileRouter(fileController)


  import { CategoryPostgresRepo } from '../../infrastructure/repositories/CategoryPostgresRepo'
  import { CategoryController } from '../controllers/CategoryController'
  import { createCategoryRouter } from './CategoryRouter'
  import { CreateCategoryUseCase } from '../../application/use-cases/category/CreateCategoryUseCase'
  import { UpdateCategoryUseCase } from '../../application/use-cases/category/UpdateCategoryUseCase'
  import { FindCategoryByIdUseCase } from '../../application/use-cases/category/FindCategoryByIdUseCase'
  import { FindAllCategoriesUseCase } from '../../application/use-cases/category/FindAllCategorysUseCase'
  import { DeleteCategoryUseCase } from '../../application/use-cases/category/DeleteCategoryUseCase'

  const categoryRepo = new CategoryPostgresRepo()
  const createCategoryUseCase = new CreateCategoryUseCase(categoryRepo)
  const updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepo)
  const findCategoryByIdUseCase = new FindCategoryByIdUseCase(categoryRepo)
  const findAllCategoriesUseCase = new FindAllCategoriesUseCase(categoryRepo)
  const deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepo)
  const categoryController = new CategoryController(
    createCategoryUseCase,
    updateCategoryUseCase,
    findCategoryByIdUseCase,
    findAllCategoriesUseCase,
    deleteCategoryUseCase
  )
  export const categoryRouter = createCategoryRouter(categoryController)


  import { ProductPostgresRepo } from '../../infrastructure/repositories/ProductPostgresRepo'
  import { ProductController } from '../controllers/ProductController'
  import { createProductRouter } from './ProductRouter'
  import { CreateProductUseCase } from '../../application/use-cases/product/CreateProductUseCase'
  import { UpdateProductUseCase } from '../../application/use-cases/product/UpdateProductUseCase'
  import { FindProductByIdUseCase } from '../../application/use-cases/product/FindProductByIdUseCase'
  import { FindAllProductssUseCase } from '../../application/use-cases/product/FindAllProductsUseCase'
  import { DeleteProductUseCase } from '../../application/use-cases/product/DeleteProductUseCase'

  const productRepo = new ProductPostgresRepo()
  const createProductUseCase = new CreateProductUseCase(productRepo)
  const updateProductUseCase = new UpdateProductUseCase(productRepo)
  const findProductByIdUseCase = new FindProductByIdUseCase(productRepo)
  const findAllProductssUseCase = new FindAllProductssUseCase(productRepo)
  const deleteProductUseCase = new DeleteProductUseCase(productRepo)
  const productController = new ProductController(
    createProductUseCase,
    updateProductUseCase,
    findProductByIdUseCase,
    findAllProductssUseCase,
    deleteProductUseCase
  )
  export const productRouter = createProductRouter(productController)


  import { ProductColorPostgresRepo } from '../../infrastructure/repositories/ProductColorPostgresRepo'
  import { ProductColorController } from '../controllers/ProductColorController'
  import { createProductColorRouter } from './ProductColorRouter'
  import { CreateProductColorUseCase } from '../../application/use-cases/productColor/CreateProductColorUseCase'
  import { UpdateProductColorUseCase } from '../../application/use-cases/productColor/UpdateProductColorUseCase'
  import { FindProductColorByIdUseCase } from '../../application/use-cases/productColor/FindProductColorByIdUseCase'
  import { FindAllProductColorssUseCase } from '../../application/use-cases/productColor/FindAllProductColorsUseCase'
  import { DeleteProductColorUseCase } from '../../application/use-cases/productColor/DeleteProductColorUseCase'

  const productColorRepo = new ProductColorPostgresRepo()
  const createProductColorUseCase = new CreateProductColorUseCase(productColorRepo)
  const updateProductColorUseCase = new UpdateProductColorUseCase(productColorRepo)
  const findProductColorByIdUseCase = new FindProductColorByIdUseCase(productColorRepo)
  const findAllProductColorssUseCase = new FindAllProductColorssUseCase(productColorRepo)
  const deleteProductColorUseCase = new DeleteProductColorUseCase(productColorRepo)
  const productColorController = new ProductColorController(
    createProductColorUseCase,
    updateProductColorUseCase,
    findProductColorByIdUseCase,
    findAllProductColorssUseCase,
    deleteProductColorUseCase
  )
  export const productColorRouter = createProductColorRouter(productColorController)


  import { ProductSizePostgresRepo } from '../../infrastructure/repositories/ProductSizePostgresRepo'
  import { ProductSizeController } from '../controllers/ProductSizeController'
  import { createProductSizeRouter } from './ProductSizeRouter'
  import { CreateProductSizeUseCase } from '../../application/use-cases/productSize/CreateProductSizeUseCase'
  import { UpdateProductSizeUseCase } from '../../application/use-cases/productSize/UpdateProductSizeUseCase'
  import { FindProductSizeByIdUseCase } from '../../application/use-cases/productSize/FindProductSizeByIdUseCase'
  import { FindAllProductSizessUseCase } from '../../application/use-cases/productSize/FindAllProductSizesUseCase'
  import { DeleteProductSizeUseCase } from '../../application/use-cases/productSize/DeleteProductSizeUseCase'

  const productSizeRepo = new ProductSizePostgresRepo()
  const createProductSizeUseCase = new CreateProductSizeUseCase(productSizeRepo)
  const updateProductSizeUseCase = new UpdateProductSizeUseCase(productSizeRepo)
  const findProductSizeByIdUseCase = new FindProductSizeByIdUseCase(productSizeRepo)
  const findAllProductSizessUseCase = new FindAllProductSizessUseCase(productSizeRepo)
  const deleteProductSizeUseCase = new DeleteProductSizeUseCase(productSizeRepo)
  const productSizeController = new ProductSizeController(
    createProductSizeUseCase,
    updateProductSizeUseCase,
    findProductSizeByIdUseCase,
    findAllProductSizessUseCase,
    deleteProductSizeUseCase
  )
  export const productSizeRouter = createProductSizeRouter(productSizeController)


  import { ProductImagePostgresRepo } from '../../infrastructure/repositories/ProductImagePostgresRepo'
  import { ProductImageController } from '../controllers/ProductImageController'
  import { createProductImageRouter } from './ProductImageRouter'
  import { CreateProductImageUseCase } from '../../application/use-cases/productImage/CreateProductImageUseCase'
  import { UpdateProductImageUseCase } from '../../application/use-cases/productImage/UpdateProductImageUseCase'
  import { FindProductImageByIdUseCase } from '../../application/use-cases/productImage/FindProductImageByIdUseCase'
  import { FindAllProductImagessUseCase } from '../../application/use-cases/productImage/FindAllProductImagesUseCase'
  import { DeleteProductImageUseCase } from '../../application/use-cases/productImage/DeleteProductImageUseCase'

  const productImageRepo = new ProductImagePostgresRepo()
  const createProductImageUseCase = new CreateProductImageUseCase(productImageRepo)
  const updateProductImageUseCase = new UpdateProductImageUseCase(productImageRepo)
  const findProductImageByIdUseCase = new FindProductImageByIdUseCase(productImageRepo)
  const findAllProductImagessUseCase = new FindAllProductImagessUseCase(productImageRepo)
  const deleteProductImageUseCase = new DeleteProductImageUseCase(productImageRepo)
  const productImageController = new ProductImageController(
    createProductImageUseCase,
    updateProductImageUseCase,
    findProductImageByIdUseCase,
    findAllProductImagessUseCase,
    deleteProductImageUseCase
  )
  export const productImageRouter = createProductImageRouter(productImageController)


  import { ProductInventoryPostgresRepo } from '../../infrastructure/repositories/ProductInventoryPostgresRepo'
  import { ProductInventoryController } from '../controllers/ProductInventoryController'
  import { createProductInventoryRouter } from './ProductInventoryRouter'
  import { CreateProductInventoryUseCase } from '../../application/use-cases/productInventory/CreateProductInventoryUseCase'
  import { UpdateProductInventoryUseCase } from '../../application/use-cases/productInventory/UpdateProductInventoryUseCase'
  import { FindProductInventoryByIdUseCase } from '../../application/use-cases/productInventory/FindProductInventoryByIdUseCase'
  import { FindAllProductInventoryUseCase } from '../../application/use-cases/productInventory/FindAllProductInventorysUseCase'
  import { DeleteProductInventoryUseCase } from '../../application/use-cases/productInventory/DeleteProductInventoryUseCase'

  const productInventoryRepo = new ProductInventoryPostgresRepo()
  const createProductInventoryUseCase = new CreateProductInventoryUseCase(productInventoryRepo)
  const updateProductInventoryUseCase = new UpdateProductInventoryUseCase(productInventoryRepo)
  const findProductInventoryByIdUseCase = new FindProductInventoryByIdUseCase(productInventoryRepo)
  const findAllProductInventoryUseCase = new FindAllProductInventoryUseCase(productInventoryRepo)
  const deleteProductInventoryUseCase = new DeleteProductInventoryUseCase(productInventoryRepo)
  const productInventoryController = new ProductInventoryController(
    createProductInventoryUseCase,
    updateProductInventoryUseCase,
    findProductInventoryByIdUseCase,
    findAllProductInventoryUseCase,
    deleteProductInventoryUseCase
  )
  export const productInventoryRouter = createProductInventoryRouter(productInventoryController)


  import { RolePostgresRepo } from '../../infrastructure/repositories/RolePostgresRepo'
  import { RoleController } from '../controllers/RoleController'
  import { createRoleRouter } from './RoleRouter'
  import { CreateRoleUseCase } from '../../application/use-cases/role/CreateRoleUseCase'
  import { UpdateRoleUseCase } from '../../application/use-cases/role/UpdateRoleUseCase'
  import { FindRoleByIdUseCase } from '../../application/use-cases/role/FindRoleByIdUseCase'
  import { FindAllRolessUseCase } from '../../application/use-cases/role/FindAllRolesUseCase'
  import { DeleteRoleUseCase } from '../../application/use-cases/role/DeleteRoleUseCase'

  const roleRepo = new RolePostgresRepo()
  const createRoleUseCase = new CreateRoleUseCase(roleRepo)
  const updateRoleUseCase = new UpdateRoleUseCase(roleRepo)
  const findRoleByIdUseCase = new FindRoleByIdUseCase(roleRepo)
  const findAllRolessUseCase = new FindAllRolessUseCase(roleRepo)
  const deleteRoleUseCase = new DeleteRoleUseCase(roleRepo)
  const roleController = new RoleController(
    createRoleUseCase,
    updateRoleUseCase,
    findRoleByIdUseCase,
    findAllRolessUseCase,
    deleteRoleUseCase
  )
  export const roleRouter = createRoleRouter(roleController)


  import { OrderPostgresRepo } from '../../infrastructure/repositories/OrderPostgresRepo'
  import { OrderController } from '../controllers/OrderController'
  import { createOrderRouter } from './OrderRouter'
  import { CreateOrderUseCase } from '../../application/use-cases/order/CreateOrderUseCase'
  import { UpdateOrderUseCase } from '../../application/use-cases/order/UpdateOrderUseCase'
  import { FindOrderByIdUseCase } from '../../application/use-cases/order/FindOrderByIdUseCase'
  import { FindAllOrderssUseCase } from '../../application/use-cases/order/FindAllOrdersUseCase'
  import { DeleteOrderUseCase } from '../../application/use-cases/order/DeleteOrderUseCase'

  const orderRepo = new OrderPostgresRepo()
  const createOrderUseCase = new CreateOrderUseCase(orderRepo)
  const updateOrderUseCase = new UpdateOrderUseCase(orderRepo)
  const findOrderByIdUseCase = new FindOrderByIdUseCase(orderRepo)
  const findAllOrderssUseCase = new FindAllOrderssUseCase(orderRepo)
  const deleteOrderUseCase = new DeleteOrderUseCase(orderRepo)
  const orderController = new OrderController(
    createOrderUseCase,
    updateOrderUseCase,
    findOrderByIdUseCase,
    findAllOrderssUseCase,
    deleteOrderUseCase
  )
  export const orderRouter = createOrderRouter(orderController)


  import { CouponPostgresRepo } from '../../infrastructure/repositories/CouponPostgresRepo'
  import { CouponController } from '../controllers/CouponController'
  import { createCouponRouter } from './CouponRouter'
  import { CreateCouponUseCase } from '../../application/use-cases/coupon/CreateCouponUseCase'
  import { UpdateCouponUseCase } from '../../application/use-cases/coupon/UpdateCouponUseCase'
  import { FindCouponByIdUseCase } from '../../application/use-cases/coupon/FindCouponByIdUseCase'
  import { FindAllCouponssUseCase } from '../../application/use-cases/coupon/FindAllCouponsUseCase'
  import { DeleteCouponUseCase } from '../../application/use-cases/coupon/DeleteCouponUseCase'

  const couponRepo = new CouponPostgresRepo()
  const createCouponUseCase = new CreateCouponUseCase(couponRepo)
  const updateCouponUseCase = new UpdateCouponUseCase(couponRepo)
  const findCouponByIdUseCase = new FindCouponByIdUseCase(couponRepo)
  const findAllCouponssUseCase = new FindAllCouponssUseCase(couponRepo)
  const deleteCouponUseCase = new DeleteCouponUseCase(couponRepo)
  const couponController = new CouponController(
    createCouponUseCase,
    updateCouponUseCase,
    findCouponByIdUseCase,
    findAllCouponssUseCase,
    deleteCouponUseCase
  )
  export const couponRouter = createCouponRouter(couponController)


  import { ReceiptPostgresRepo } from '../../infrastructure/repositories/ReceiptPostgresRepo'
  import { ReceiptController } from '../controllers/ReceiptController'
  import { createReceiptRouter } from './ReceiptRouter'
  import { CreateReceiptUseCase } from '../../application/use-cases/receipt/CreateReceiptUseCase'
  import { UpdateReceiptUseCase } from '../../application/use-cases/receipt/UpdateReceiptUseCase'
  import { FindReceiptByIdUseCase } from '../../application/use-cases/receipt/FindReceiptByIdUseCase'
  import { FindAllReceiptssUseCase } from '../../application/use-cases/receipt/FindAllReceiptsUseCase'
  import { DeleteReceiptUseCase } from '../../application/use-cases/receipt/DeleteReceiptUseCase'

  const receiptRepo = new ReceiptPostgresRepo()
  const createReceiptUseCase = new CreateReceiptUseCase(receiptRepo)
  const updateReceiptUseCase = new UpdateReceiptUseCase(receiptRepo)
  const findReceiptByIdUseCase = new FindReceiptByIdUseCase(receiptRepo)
  const findAllReceiptssUseCase = new FindAllReceiptssUseCase(receiptRepo)
  const deleteReceiptUseCase = new DeleteReceiptUseCase(receiptRepo)
  const receiptController = new ReceiptController(
    createReceiptUseCase,
    updateReceiptUseCase,
    findReceiptByIdUseCase,
    findAllReceiptssUseCase,
    deleteReceiptUseCase
  )
  export const receiptRouter = createReceiptRouter(receiptController)


  import { ReceiptDetailPostgresRepo } from '../../infrastructure/repositories/ReceiptDetailPostgresRepo'
  import { ReceiptDetailController } from '../controllers/ReceiptDetailController'
  import { createReceiptDetailRouter } from './ReceiptDetailRouter'
  import { CreateReceiptDetailUseCase } from '../../application/use-cases/receiptDetail/CreateReceiptDetailUseCase'
  import { UpdateReceiptDetailUseCase } from '../../application/use-cases/receiptDetail/UpdateReceiptDetailUseCase'
  import { FindReceiptDetailByIdUseCase } from '../../application/use-cases/receiptDetail/FindReceiptDetailByIdUseCase'
  import { FindAllReceiptDetailssUseCase } from '../../application/use-cases/receiptDetail/FindAllReceiptDetailsUseCase'
  import { DeleteReceiptDetailUseCase } from '../../application/use-cases/receiptDetail/DeleteReceiptDetailUseCase'

  const receiptDetailRepo = new ReceiptDetailPostgresRepo()
  const createReceiptDetailUseCase = new CreateReceiptDetailUseCase(receiptDetailRepo)
  const updateReceiptDetailUseCase = new UpdateReceiptDetailUseCase(receiptDetailRepo)
  const findReceiptDetailByIdUseCase = new FindReceiptDetailByIdUseCase(receiptDetailRepo)
  const findAllReceiptDetailssUseCase = new FindAllReceiptDetailssUseCase(receiptDetailRepo)
  const deleteReceiptDetailUseCase = new DeleteReceiptDetailUseCase(receiptDetailRepo)
  const receiptDetailController = new ReceiptDetailController(
    createReceiptDetailUseCase,
    updateReceiptDetailUseCase,
    findReceiptDetailByIdUseCase,
    findAllReceiptDetailssUseCase,
    deleteReceiptDetailUseCase
  )
  export const receiptDetailRouter = createReceiptDetailRouter(receiptDetailController)


  import { OrderDetailPostgresRepo } from '../../infrastructure/repositories/OrderDetailPostgresRepo'
  import { OrderDetailController } from '../controllers/OrderDetailController'
  import { createOrderDetailRouter } from './OrderDetailRouter'
  import { CreateOrderDetailUseCase } from '../../application/use-cases/orderDetail/CreateOrderDetailUseCase'
  import { UpdateOrderDetailUseCase } from '../../application/use-cases/orderDetail/UpdateOrderDetailUseCase'
  import { FindOrderDetailByIdUseCase } from '../../application/use-cases/orderDetail/FindOrderDetailByIdUseCase'
  import { FindAllOrderDetailssUseCase } from '../../application/use-cases/orderDetail/FindAllOrderDetailsUseCase'
  import { DeleteOrderDetailUseCase } from '../../application/use-cases/orderDetail/DeleteOrderDetailUseCase'

  const orderDetailRepo = new OrderDetailPostgresRepo()
  const createOrderDetailUseCase = new CreateOrderDetailUseCase(orderDetailRepo)
  const updateOrderDetailUseCase = new UpdateOrderDetailUseCase(orderDetailRepo)
  const findOrderDetailByIdUseCase = new FindOrderDetailByIdUseCase(orderDetailRepo)
  const findAllOrderDetailssUseCase = new FindAllOrderDetailssUseCase(orderDetailRepo)
  const deleteOrderDetailUseCase = new DeleteOrderDetailUseCase(orderDetailRepo)
  const orderDetailController = new OrderDetailController(
    createOrderDetailUseCase,
    updateOrderDetailUseCase,
    findOrderDetailByIdUseCase,
    findAllOrderDetailssUseCase,
    deleteOrderDetailUseCase
  )
  export const orderDetailRouter = createOrderDetailRouter(orderDetailController)


  import { UserPostgresRepo } from '../../infrastructure/repositories/UserPostgresRepo'
  import { UserController } from '../controllers/UserController'
  import { createUserRouter } from './UserRouter'
  import { CreateUserUseCase } from '../../application/use-cases/user/CreateUserUseCase'
  import { UpdateUserUseCase } from '../../application/use-cases/user/UpdateUserUseCase'
  import { FindUserByIdUseCase } from '../../application/use-cases/user/FindUserByIdUseCase'
  import { FindAllUserssUseCase } from '../../application/use-cases/user/FindAllUsersUseCase'
  import { DeleteUserUseCase } from '../../application/use-cases/user/DeleteUserUseCase'

  const userRepo = new UserPostgresRepo()
  const createUserUseCase = new CreateUserUseCase(userRepo)
  const updateUserUseCase = new UpdateUserUseCase(userRepo)
  const findUserByIdUseCase = new FindUserByIdUseCase(userRepo)
  const findAllUserssUseCase = new FindAllUserssUseCase(userRepo)
  const deleteUserUseCase = new DeleteUserUseCase(userRepo)
  const userController = new UserController(
    createUserUseCase,
    updateUserUseCase,
    findUserByIdUseCase,
    findAllUserssUseCase,
    deleteUserUseCase
  )
  export const userRouter = createUserRouter(userController)


  import { CardPostgresRepo } from '../../infrastructure/repositories/CardPostgresRepo'
  import { CardController } from '../controllers/CardController'
  import { createCardRouter } from './CardRouter'
  import { CreateCardUseCase } from '../../application/use-cases/card/CreateCardUseCase'
  import { UpdateCardUseCase } from '../../application/use-cases/card/UpdateCardUseCase'
  import { FindCardByIdUseCase } from '../../application/use-cases/card/FindCardByIdUseCase'
  import { FindAllCardssUseCase } from '../../application/use-cases/card/FindAllCardsUseCase'
  import { DeleteCardUseCase } from '../../application/use-cases/card/DeleteCardUseCase'

  const cardRepo = new CardPostgresRepo()
  const createCardUseCase = new CreateCardUseCase(cardRepo)
  const updateCardUseCase = new UpdateCardUseCase(cardRepo)
  const findCardByIdUseCase = new FindCardByIdUseCase(cardRepo)
  const findAllCardssUseCase = new FindAllCardssUseCase(cardRepo)
  const deleteCardUseCase = new DeleteCardUseCase(cardRepo)
  const cardController = new CardController(
    createCardUseCase,
    updateCardUseCase,
    findCardByIdUseCase,
    findAllCardssUseCase,
    deleteCardUseCase
  )
  export const cardRouter = createCardRouter(cardController)


  import { ReviewPostgresRepo } from '../../infrastructure/repositories/ReviewPostgresRepo'
  import { ReviewController } from '../controllers/ReviewController'
  import { createReviewRouter } from './ReviewRouter'
  import { CreateReviewUseCase } from '../../application/use-cases/review/CreateReviewUseCase'
  import { UpdateReviewUseCase } from '../../application/use-cases/review/UpdateReviewUseCase'
  import { FindReviewByIdUseCase } from '../../application/use-cases/review/FindReviewByIdUseCase'
  import { FindAllReviewssUseCase } from '../../application/use-cases/review/FindAllReviewsUseCase'
  import { DeleteReviewUseCase } from '../../application/use-cases/review/DeleteReviewUseCase'

  const reviewRepo = new ReviewPostgresRepo()
  const createReviewUseCase = new CreateReviewUseCase(reviewRepo)
  const updateReviewUseCase = new UpdateReviewUseCase(reviewRepo)
  const findReviewByIdUseCase = new FindReviewByIdUseCase(reviewRepo)
  const findAllReviewssUseCase = new FindAllReviewssUseCase(reviewRepo)
  const deleteReviewUseCase = new DeleteReviewUseCase(reviewRepo)
  const reviewController = new ReviewController(
    createReviewUseCase,
    updateReviewUseCase,
    findReviewByIdUseCase,
    findAllReviewssUseCase,
    deleteReviewUseCase
  )
  export const reviewRouter = createReviewRouter(reviewController)





  app.use(`${config.app.apiPrefix}/tokenss`, tokenRouter)
  app.use(`${config.app.apiPrefix}/filess`, fileRouter)
  app.use(`${config.app.apiPrefix}/categories`, categoryRouter)
  app.use(`${config.app.apiPrefix}/productss`, productRouter)
  app.use(`${config.app.apiPrefix}/productColorss`, productColorRouter)
  app.use(`${config.app.apiPrefix}/productSizess`, productSizeRouter)
  app.use(`${config.app.apiPrefix}/productImagess`, productImageRouter)
  app.use(`${config.app.apiPrefix}/productInventory`, productInventoryRouter)
  app.use(`${config.app.apiPrefix}/roless`, roleRouter)
  app.use(`${config.app.apiPrefix}/orderss`, orderRouter)
  app.use(`${config.app.apiPrefix}/couponss`, couponRouter)
  app.use(`${config.app.apiPrefix}/receiptss`, receiptRouter)
  app.use(`${config.app.apiPrefix}/receiptDetailss`, receiptDetailRouter)
  app.use(`${config.app.apiPrefix}/orderDetailss`, orderDetailRouter)
  app.use(`${config.app.apiPrefix}/userss`, userRouter)
  app.use(`${config.app.apiPrefix}/cardss`, cardRouter)
  app.use(`${config.app.apiPrefix}/reviewss`, reviewRouter)
