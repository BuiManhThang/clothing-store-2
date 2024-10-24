import { JwtService } from '../../application/services/JwtService'
import { AuthMiddleware } from '../../shared/middlewares/authMiddleware'

const jwtService = new JwtService()
const authMiddleware = new AuthMiddleware(jwtService)

//#region Import Entities
//#region Import Token
import { TokenPostgresRepo } from '../../infrastructure/repositories/TokenPostgresRepo'
import { TokenController } from '../controllers/TokenController'
import { createTokenRouter } from './TokenRouter'
import { CreateTokenUseCase } from '../../application/use-cases/token/CreateTokenUseCase'
import { UpdateTokenUseCase } from '../../application/use-cases/token/UpdateTokenUseCase'
import { FindTokenByIdUseCase } from '../../application/use-cases/token/FindTokenByIdUseCase'
import { FindAllTokensUseCase } from '../../application/use-cases/token/FindAllTokensUseCase'
import { GetTokenPaginationUseCase } from '../../application/use-cases/token/GetTokenPaginationUseCase'
import { DeleteTokenUseCase } from '../../application/use-cases/token/DeleteTokenUseCase'
//#endregion

//#region Import File
import { FilePostgresRepo } from '../../infrastructure/repositories/FilePostgresRepo'
import { FileController } from '../controllers/FileController'
import { createFileRouter } from './FileRouter'
import { CreateFileUseCase } from '../../application/use-cases/file/CreateFileUseCase'
import { UpdateFileUseCase } from '../../application/use-cases/file/UpdateFileUseCase'
import { FindFileByIdUseCase } from '../../application/use-cases/file/FindFileByIdUseCase'
import { FindAllFilesUseCase } from '../../application/use-cases/file/FindAllFilesUseCase'
import { GetFilePaginationUseCase } from '../../application/use-cases/file/GetFilePaginationUseCase'
import { DeleteFileUseCase } from '../../application/use-cases/file/DeleteFileUseCase'
//#endregion

//#region Import Category
import { CategoryPostgresRepo } from '../../infrastructure/repositories/CategoryPostgresRepo'
import { CategoryController } from '../controllers/CategoryController'
import { createCategoryRouter } from './CategoryRouter'
import { CreateCategoryUseCase } from '../../application/use-cases/category/CreateCategoryUseCase'
import { UpdateCategoryUseCase } from '../../application/use-cases/category/UpdateCategoryUseCase'
import { FindCategoryByIdUseCase } from '../../application/use-cases/category/FindCategoryByIdUseCase'
import { FindAllCategoriesUseCase } from '../../application/use-cases/category/FindAllCategoriesUseCase'
import { GetCategoryPaginationUseCase } from '../../application/use-cases/category/GetCategoryPaginationUseCase'
import { DeleteCategoryUseCase } from '../../application/use-cases/category/DeleteCategoryUseCase'
//#endregion

//#region Import Product
import { ProductPostgresRepo } from '../../infrastructure/repositories/ProductPostgresRepo'
import { ProductController } from '../controllers/ProductController'
import { createProductRouter } from './ProductRouter'
import { CreateProductUseCase } from '../../application/use-cases/product/CreateProductUseCase'
import { UpdateProductUseCase } from '../../application/use-cases/product/UpdateProductUseCase'
import { FindProductByIdUseCase } from '../../application/use-cases/product/FindProductByIdUseCase'
import { FindAllProductsUseCase } from '../../application/use-cases/product/FindAllProductsUseCase'
import { GetProductPaginationUseCase } from '../../application/use-cases/product/GetProductPaginationUseCase'
import { DeleteProductUseCase } from '../../application/use-cases/product/DeleteProductUseCase'
//#endregion

//#region Import ProductColor
import { ProductColorPostgresRepo } from '../../infrastructure/repositories/ProductColorPostgresRepo'
import { ProductColorController } from '../controllers/ProductColorController'
import { createProductColorRouter } from './ProductColorRouter'
import { CreateProductColorUseCase } from '../../application/use-cases/productColor/CreateProductColorUseCase'
import { UpdateProductColorUseCase } from '../../application/use-cases/productColor/UpdateProductColorUseCase'
import { FindProductColorByIdUseCase } from '../../application/use-cases/productColor/FindProductColorByIdUseCase'
import { FindAllProductColorsUseCase } from '../../application/use-cases/productColor/FindAllProductColorsUseCase'
import { GetProductColorPaginationUseCase } from '../../application/use-cases/productColor/GetProductColorPaginationUseCase'
import { DeleteProductColorUseCase } from '../../application/use-cases/productColor/DeleteProductColorUseCase'
//#endregion

//#region Import ProductSize
import { ProductSizePostgresRepo } from '../../infrastructure/repositories/ProductSizePostgresRepo'
import { ProductSizeController } from '../controllers/ProductSizeController'
import { createProductSizeRouter } from './ProductSizeRouter'
import { CreateProductSizeUseCase } from '../../application/use-cases/productSize/CreateProductSizeUseCase'
import { UpdateProductSizeUseCase } from '../../application/use-cases/productSize/UpdateProductSizeUseCase'
import { FindProductSizeByIdUseCase } from '../../application/use-cases/productSize/FindProductSizeByIdUseCase'
import { FindAllProductSizesUseCase } from '../../application/use-cases/productSize/FindAllProductSizesUseCase'
import { GetProductSizePaginationUseCase } from '../../application/use-cases/productSize/GetProductSizePaginationUseCase'
import { DeleteProductSizeUseCase } from '../../application/use-cases/productSize/DeleteProductSizeUseCase'
//#endregion

//#region Import ProductImage
import { ProductImagePostgresRepo } from '../../infrastructure/repositories/ProductImagePostgresRepo'
import { ProductImageController } from '../controllers/ProductImageController'
import { createProductImageRouter } from './ProductImageRouter'
import { CreateProductImageUseCase } from '../../application/use-cases/productImage/CreateProductImageUseCase'
import { UpdateProductImageUseCase } from '../../application/use-cases/productImage/UpdateProductImageUseCase'
import { FindProductImageByIdUseCase } from '../../application/use-cases/productImage/FindProductImageByIdUseCase'
import { FindAllProductImagesUseCase } from '../../application/use-cases/productImage/FindAllProductImagesUseCase'
import { GetProductImagePaginationUseCase } from '../../application/use-cases/productImage/GetProductImagePaginationUseCase'
import { DeleteProductImageUseCase } from '../../application/use-cases/productImage/DeleteProductImageUseCase'
//#endregion

//#region Import ProductInventory
import { ProductInventoryPostgresRepo } from '../../infrastructure/repositories/ProductInventoryPostgresRepo'
import { ProductInventoryController } from '../controllers/ProductInventoryController'
import { createProductInventoryRouter } from './ProductInventoryRouter'
import { CreateProductInventoryUseCase } from '../../application/use-cases/productInventory/CreateProductInventoryUseCase'
import { UpdateProductInventoryUseCase } from '../../application/use-cases/productInventory/UpdateProductInventoryUseCase'
import { FindProductInventoryByIdUseCase } from '../../application/use-cases/productInventory/FindProductInventoryByIdUseCase'
import { FindAllProductInventoryUseCase } from '../../application/use-cases/productInventory/FindAllProductInventoryUseCase'
import { GetProductInventoryPaginationUseCase } from '../../application/use-cases/productInventory/GetProductInventoryPaginationUseCase'
import { DeleteProductInventoryUseCase } from '../../application/use-cases/productInventory/DeleteProductInventoryUseCase'
//#endregion

//#region Import Role
import { RolePostgresRepo } from '../../infrastructure/repositories/RolePostgresRepo'
import { RoleController } from '../controllers/RoleController'
import { createRoleRouter } from './RoleRouter'
import { CreateRoleUseCase } from '../../application/use-cases/role/CreateRoleUseCase'
import { UpdateRoleUseCase } from '../../application/use-cases/role/UpdateRoleUseCase'
import { FindRoleByIdUseCase } from '../../application/use-cases/role/FindRoleByIdUseCase'
import { FindAllRolesUseCase } from '../../application/use-cases/role/FindAllRolesUseCase'
import { GetRolePaginationUseCase } from '../../application/use-cases/role/GetRolePaginationUseCase'
import { DeleteRoleUseCase } from '../../application/use-cases/role/DeleteRoleUseCase'
//#endregion

//#region Import Order
import { OrderPostgresRepo } from '../../infrastructure/repositories/OrderPostgresRepo'
import { OrderController } from '../controllers/OrderController'
import { createOrderRouter } from './OrderRouter'
import { CreateOrderUseCase } from '../../application/use-cases/order/CreateOrderUseCase'
import { UpdateOrderUseCase } from '../../application/use-cases/order/UpdateOrderUseCase'
import { FindOrderByIdUseCase } from '../../application/use-cases/order/FindOrderByIdUseCase'
import { FindAllOrdersUseCase } from '../../application/use-cases/order/FindAllOrdersUseCase'
import { GetOrderPaginationUseCase } from '../../application/use-cases/order/GetOrderPaginationUseCase'
import { DeleteOrderUseCase } from '../../application/use-cases/order/DeleteOrderUseCase'
//#endregion

//#region Import Coupon
import { CouponPostgresRepo } from '../../infrastructure/repositories/CouponPostgresRepo'
import { CouponController } from '../controllers/CouponController'
import { createCouponRouter } from './CouponRouter'
import { CreateCouponUseCase } from '../../application/use-cases/coupon/CreateCouponUseCase'
import { UpdateCouponUseCase } from '../../application/use-cases/coupon/UpdateCouponUseCase'
import { FindCouponByIdUseCase } from '../../application/use-cases/coupon/FindCouponByIdUseCase'
import { FindAllCouponsUseCase } from '../../application/use-cases/coupon/FindAllCouponsUseCase'
import { GetCouponPaginationUseCase } from '../../application/use-cases/coupon/GetCouponPaginationUseCase'
import { DeleteCouponUseCase } from '../../application/use-cases/coupon/DeleteCouponUseCase'
//#endregion

//#region Import Receipt
import { ReceiptPostgresRepo } from '../../infrastructure/repositories/ReceiptPostgresRepo'
import { ReceiptController } from '../controllers/ReceiptController'
import { createReceiptRouter } from './ReceiptRouter'
import { CreateReceiptUseCase } from '../../application/use-cases/receipt/CreateReceiptUseCase'
import { UpdateReceiptUseCase } from '../../application/use-cases/receipt/UpdateReceiptUseCase'
import { FindReceiptByIdUseCase } from '../../application/use-cases/receipt/FindReceiptByIdUseCase'
import { FindAllReceiptsUseCase } from '../../application/use-cases/receipt/FindAllReceiptsUseCase'
import { GetReceiptPaginationUseCase } from '../../application/use-cases/receipt/GetReceiptPaginationUseCase'
import { DeleteReceiptUseCase } from '../../application/use-cases/receipt/DeleteReceiptUseCase'
//#endregion

//#region Import ReceiptDetail
import { ReceiptDetailPostgresRepo } from '../../infrastructure/repositories/ReceiptDetailPostgresRepo'
import { ReceiptDetailController } from '../controllers/ReceiptDetailController'
import { createReceiptDetailRouter } from './ReceiptDetailRouter'
import { CreateReceiptDetailUseCase } from '../../application/use-cases/receiptDetail/CreateReceiptDetailUseCase'
import { UpdateReceiptDetailUseCase } from '../../application/use-cases/receiptDetail/UpdateReceiptDetailUseCase'
import { FindReceiptDetailByIdUseCase } from '../../application/use-cases/receiptDetail/FindReceiptDetailByIdUseCase'
import { FindAllReceiptDetailsUseCase } from '../../application/use-cases/receiptDetail/FindAllReceiptDetailsUseCase'
import { GetReceiptDetailPaginationUseCase } from '../../application/use-cases/receiptDetail/GetReceiptDetailPaginationUseCase'
import { DeleteReceiptDetailUseCase } from '../../application/use-cases/receiptDetail/DeleteReceiptDetailUseCase'
//#endregion

//#region Import OrderDetail
import { OrderDetailPostgresRepo } from '../../infrastructure/repositories/OrderDetailPostgresRepo'
import { OrderDetailController } from '../controllers/OrderDetailController'
import { createOrderDetailRouter } from './OrderDetailRouter'
import { CreateOrderDetailUseCase } from '../../application/use-cases/orderDetail/CreateOrderDetailUseCase'
import { UpdateOrderDetailUseCase } from '../../application/use-cases/orderDetail/UpdateOrderDetailUseCase'
import { FindOrderDetailByIdUseCase } from '../../application/use-cases/orderDetail/FindOrderDetailByIdUseCase'
import { FindAllOrderDetailsUseCase } from '../../application/use-cases/orderDetail/FindAllOrderDetailsUseCase'
import { GetOrderDetailPaginationUseCase } from '../../application/use-cases/orderDetail/GetOrderDetailPaginationUseCase'
import { DeleteOrderDetailUseCase } from '../../application/use-cases/orderDetail/DeleteOrderDetailUseCase'
//#endregion

//#region Import User
import { UserPostgresRepo } from '../../infrastructure/repositories/UserPostgresRepo'
import { UserController } from '../controllers/UserController'
import { createUserRouter } from './UserRouter'
import { CreateUserUseCase } from '../../application/use-cases/user/CreateUserUseCase'
import { UpdateUserUseCase } from '../../application/use-cases/user/UpdateUserUseCase'
import { FindUserByIdUseCase } from '../../application/use-cases/user/FindUserByIdUseCase'
import { FindAllUsersUseCase } from '../../application/use-cases/user/FindAllUsersUseCase'
import { GetUserPaginationUseCase } from '../../application/use-cases/user/GetUserPaginationUseCase'
import { DeleteUserUseCase } from '../../application/use-cases/user/DeleteUserUseCase'
//#endregion

//#region Import Card
import { CardPostgresRepo } from '../../infrastructure/repositories/CardPostgresRepo'
import { CardController } from '../controllers/CardController'
import { createCardRouter } from './CardRouter'
import { CreateCardUseCase } from '../../application/use-cases/card/CreateCardUseCase'
import { UpdateCardUseCase } from '../../application/use-cases/card/UpdateCardUseCase'
import { FindCardByIdUseCase } from '../../application/use-cases/card/FindCardByIdUseCase'
import { FindAllCardsUseCase } from '../../application/use-cases/card/FindAllCardsUseCase'
import { GetCardPaginationUseCase } from '../../application/use-cases/card/GetCardPaginationUseCase'
import { DeleteCardUseCase } from '../../application/use-cases/card/DeleteCardUseCase'
//#endregion

//#region Import Review
import { ReviewPostgresRepo } from '../../infrastructure/repositories/ReviewPostgresRepo'
import { ReviewController } from '../controllers/ReviewController'
import { createReviewRouter } from './ReviewRouter'
import { CreateReviewUseCase } from '../../application/use-cases/review/CreateReviewUseCase'
import { UpdateReviewUseCase } from '../../application/use-cases/review/UpdateReviewUseCase'
import { FindReviewByIdUseCase } from '../../application/use-cases/review/FindReviewByIdUseCase'
import { FindAllReviewsUseCase } from '../../application/use-cases/review/FindAllReviewsUseCase'
import { GetReviewPaginationUseCase } from '../../application/use-cases/review/GetReviewPaginationUseCase'
import { DeleteReviewUseCase } from '../../application/use-cases/review/DeleteReviewUseCase'
//#endregion
//#endregion

import { AuthController } from '../controllers/AuthController'
import { RegisterUseCase } from '../../application/use-cases/auth/RegisterUseCase'
import { AuthService } from '../../application/services/AuthService'
import { RefreshTokenUseCase } from '../../application/use-cases/auth/RefreshTokenUseCase'
import { LoginUseCase } from '../../application/use-cases/auth/LoginUseCase'
import { LogoutUseCase } from '../../application/use-cases/auth/LogoutUseCase'
import { createAuthRouter } from './AuthRouter'

//#region Declare Entities
//#region Declare Token
const tokenRepo = new TokenPostgresRepo()
const createTokenUseCase = new CreateTokenUseCase(tokenRepo)
const updateTokenUseCase = new UpdateTokenUseCase(tokenRepo)
const findTokenByIdUseCase = new FindTokenByIdUseCase(tokenRepo)
const findAllTokensUseCase = new FindAllTokensUseCase(tokenRepo)
const getPaginationTokenUseCase = new GetTokenPaginationUseCase(tokenRepo)
const deleteTokenUseCase = new DeleteTokenUseCase(tokenRepo)
const tokenController = new TokenController(
  createTokenUseCase,
  updateTokenUseCase,
  findTokenByIdUseCase,
  findAllTokensUseCase,
  getPaginationTokenUseCase,
  deleteTokenUseCase
)
export const tokenRouter = createTokenRouter(tokenController, authMiddleware)
//#endregion

//#region Declare File
const fileRepo = new FilePostgresRepo()
const createFileUseCase = new CreateFileUseCase(fileRepo)
const updateFileUseCase = new UpdateFileUseCase(fileRepo)
const findFileByIdUseCase = new FindFileByIdUseCase(fileRepo)
const findAllFilesUseCase = new FindAllFilesUseCase(fileRepo)
const getPaginationFileUseCase = new GetFilePaginationUseCase(fileRepo)
const deleteFileUseCase = new DeleteFileUseCase(fileRepo)
const fileController = new FileController(
  createFileUseCase,
  updateFileUseCase,
  findFileByIdUseCase,
  findAllFilesUseCase,
  getPaginationFileUseCase,
  deleteFileUseCase
)
export const fileRouter = createFileRouter(fileController, authMiddleware)
//#endregion

//#region Declare Category
const categoryRepo = new CategoryPostgresRepo()
const createCategoryUseCase = new CreateCategoryUseCase(categoryRepo)
const updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepo)
const findCategoryByIdUseCase = new FindCategoryByIdUseCase(categoryRepo)
const findAllCategoriesUseCase = new FindAllCategoriesUseCase(categoryRepo)
const getPaginationCategoryUseCase = new GetCategoryPaginationUseCase(categoryRepo)
const deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepo)
const categoryController = new CategoryController(
  createCategoryUseCase,
  updateCategoryUseCase,
  findCategoryByIdUseCase,
  findAllCategoriesUseCase,
  getPaginationCategoryUseCase,
  deleteCategoryUseCase
)
export const categoryRouter = createCategoryRouter(categoryController, authMiddleware)
//#endregion

//#region Declare Product
const productRepo = new ProductPostgresRepo()
const createProductUseCase = new CreateProductUseCase(productRepo)
const updateProductUseCase = new UpdateProductUseCase(productRepo)
const findProductByIdUseCase = new FindProductByIdUseCase(productRepo)
const findAllProductsUseCase = new FindAllProductsUseCase(productRepo)
const getPaginationProductUseCase = new GetProductPaginationUseCase(productRepo)
const deleteProductUseCase = new DeleteProductUseCase(productRepo)
const productController = new ProductController(
  createProductUseCase,
  updateProductUseCase,
  findProductByIdUseCase,
  findAllProductsUseCase,
  getPaginationProductUseCase,
  deleteProductUseCase
)
export const productRouter = createProductRouter(productController, authMiddleware)
//#endregion

//#region Declare ProductColor
const productColorRepo = new ProductColorPostgresRepo()
const createProductColorUseCase = new CreateProductColorUseCase(productColorRepo)
const updateProductColorUseCase = new UpdateProductColorUseCase(productColorRepo)
const findProductColorByIdUseCase = new FindProductColorByIdUseCase(productColorRepo)
const findAllProductColorsUseCase = new FindAllProductColorsUseCase(productColorRepo)
const getPaginationProductColorUseCase = new GetProductColorPaginationUseCase(productColorRepo)
const deleteProductColorUseCase = new DeleteProductColorUseCase(productColorRepo)
const productColorController = new ProductColorController(
  createProductColorUseCase,
  updateProductColorUseCase,
  findProductColorByIdUseCase,
  findAllProductColorsUseCase,
  getPaginationProductColorUseCase,
  deleteProductColorUseCase
)
export const productColorRouter = createProductColorRouter(productColorController, authMiddleware)
//#endregion

//#region Declare ProductSize
const productSizeRepo = new ProductSizePostgresRepo()
const createProductSizeUseCase = new CreateProductSizeUseCase(productSizeRepo)
const updateProductSizeUseCase = new UpdateProductSizeUseCase(productSizeRepo)
const findProductSizeByIdUseCase = new FindProductSizeByIdUseCase(productSizeRepo)
const findAllProductSizesUseCase = new FindAllProductSizesUseCase(productSizeRepo)
const getPaginationProductSizeUseCase = new GetProductSizePaginationUseCase(productSizeRepo)
const deleteProductSizeUseCase = new DeleteProductSizeUseCase(productSizeRepo)
const productSizeController = new ProductSizeController(
  createProductSizeUseCase,
  updateProductSizeUseCase,
  findProductSizeByIdUseCase,
  findAllProductSizesUseCase,
  getPaginationProductSizeUseCase,
  deleteProductSizeUseCase
)
export const productSizeRouter = createProductSizeRouter(productSizeController, authMiddleware)
//#endregion

//#region Declare ProductImage
const productImageRepo = new ProductImagePostgresRepo()
const createProductImageUseCase = new CreateProductImageUseCase(productImageRepo)
const updateProductImageUseCase = new UpdateProductImageUseCase(productImageRepo)
const findProductImageByIdUseCase = new FindProductImageByIdUseCase(productImageRepo)
const findAllProductImagesUseCase = new FindAllProductImagesUseCase(productImageRepo)
const getPaginationProductImageUseCase = new GetProductImagePaginationUseCase(productImageRepo)
const deleteProductImageUseCase = new DeleteProductImageUseCase(productImageRepo)
const productImageController = new ProductImageController(
  createProductImageUseCase,
  updateProductImageUseCase,
  findProductImageByIdUseCase,
  findAllProductImagesUseCase,
  getPaginationProductImageUseCase,
  deleteProductImageUseCase
)
export const productImageRouter = createProductImageRouter(productImageController, authMiddleware)
//#endregion

//#region Declare ProductInventory
const productInventoryRepo = new ProductInventoryPostgresRepo()
const createProductInventoryUseCase = new CreateProductInventoryUseCase(productInventoryRepo)
const updateProductInventoryUseCase = new UpdateProductInventoryUseCase(productInventoryRepo)
const findProductInventoryByIdUseCase = new FindProductInventoryByIdUseCase(productInventoryRepo)
const findAllProductInventoryUseCase = new FindAllProductInventoryUseCase(productInventoryRepo)
const getPaginationProductInventoryUseCase = new GetProductInventoryPaginationUseCase(
  productInventoryRepo
)
const deleteProductInventoryUseCase = new DeleteProductInventoryUseCase(productInventoryRepo)
const productInventoryController = new ProductInventoryController(
  createProductInventoryUseCase,
  updateProductInventoryUseCase,
  findProductInventoryByIdUseCase,
  findAllProductInventoryUseCase,
  getPaginationProductInventoryUseCase,
  deleteProductInventoryUseCase
)
export const productInventoryRouter = createProductInventoryRouter(
  productInventoryController,
  authMiddleware
)
//#endregion

//#region Declare Role
const roleRepo = new RolePostgresRepo()
const createRoleUseCase = new CreateRoleUseCase(roleRepo)
const updateRoleUseCase = new UpdateRoleUseCase(roleRepo)
const findRoleByIdUseCase = new FindRoleByIdUseCase(roleRepo)
const findAllRolesUseCase = new FindAllRolesUseCase(roleRepo)
const getPaginationRoleUseCase = new GetRolePaginationUseCase(roleRepo)
const deleteRoleUseCase = new DeleteRoleUseCase(roleRepo)
const roleController = new RoleController(
  createRoleUseCase,
  updateRoleUseCase,
  findRoleByIdUseCase,
  findAllRolesUseCase,
  getPaginationRoleUseCase,
  deleteRoleUseCase
)
export const roleRouter = createRoleRouter(roleController, authMiddleware)
//#endregion

//#region Declare Order
const orderRepo = new OrderPostgresRepo()
const createOrderUseCase = new CreateOrderUseCase(orderRepo)
const updateOrderUseCase = new UpdateOrderUseCase(orderRepo)
const findOrderByIdUseCase = new FindOrderByIdUseCase(orderRepo)
const findAllOrdersUseCase = new FindAllOrdersUseCase(orderRepo)
const getPaginationOrderUseCase = new GetOrderPaginationUseCase(orderRepo)
const deleteOrderUseCase = new DeleteOrderUseCase(orderRepo)
const orderController = new OrderController(
  createOrderUseCase,
  updateOrderUseCase,
  findOrderByIdUseCase,
  findAllOrdersUseCase,
  getPaginationOrderUseCase,
  deleteOrderUseCase
)
export const orderRouter = createOrderRouter(orderController, authMiddleware)
//#endregion

//#region Declare Coupon
const couponRepo = new CouponPostgresRepo()
const createCouponUseCase = new CreateCouponUseCase(couponRepo)
const updateCouponUseCase = new UpdateCouponUseCase(couponRepo)
const findCouponByIdUseCase = new FindCouponByIdUseCase(couponRepo)
const findAllCouponsUseCase = new FindAllCouponsUseCase(couponRepo)
const getPaginationCouponUseCase = new GetCouponPaginationUseCase(couponRepo)
const deleteCouponUseCase = new DeleteCouponUseCase(couponRepo)
const couponController = new CouponController(
  createCouponUseCase,
  updateCouponUseCase,
  findCouponByIdUseCase,
  findAllCouponsUseCase,
  getPaginationCouponUseCase,
  deleteCouponUseCase
)
export const couponRouter = createCouponRouter(couponController, authMiddleware)
//#endregion

//#region Declare Receipt
const receiptRepo = new ReceiptPostgresRepo()
const createReceiptUseCase = new CreateReceiptUseCase(receiptRepo)
const updateReceiptUseCase = new UpdateReceiptUseCase(receiptRepo)
const findReceiptByIdUseCase = new FindReceiptByIdUseCase(receiptRepo)
const findAllReceiptsUseCase = new FindAllReceiptsUseCase(receiptRepo)
const getPaginationReceiptUseCase = new GetReceiptPaginationUseCase(receiptRepo)
const deleteReceiptUseCase = new DeleteReceiptUseCase(receiptRepo)
const receiptController = new ReceiptController(
  createReceiptUseCase,
  updateReceiptUseCase,
  findReceiptByIdUseCase,
  findAllReceiptsUseCase,
  getPaginationReceiptUseCase,
  deleteReceiptUseCase
)
export const receiptRouter = createReceiptRouter(receiptController, authMiddleware)
//#endregion

//#region Declare ReceiptDetail
const receiptDetailRepo = new ReceiptDetailPostgresRepo()
const createReceiptDetailUseCase = new CreateReceiptDetailUseCase(receiptDetailRepo)
const updateReceiptDetailUseCase = new UpdateReceiptDetailUseCase(receiptDetailRepo)
const findReceiptDetailByIdUseCase = new FindReceiptDetailByIdUseCase(receiptDetailRepo)
const findAllReceiptDetailsUseCase = new FindAllReceiptDetailsUseCase(receiptDetailRepo)
const getPaginationReceiptDetailUseCase = new GetReceiptDetailPaginationUseCase(receiptDetailRepo)
const deleteReceiptDetailUseCase = new DeleteReceiptDetailUseCase(receiptDetailRepo)
const receiptDetailController = new ReceiptDetailController(
  createReceiptDetailUseCase,
  updateReceiptDetailUseCase,
  findReceiptDetailByIdUseCase,
  findAllReceiptDetailsUseCase,
  getPaginationReceiptDetailUseCase,
  deleteReceiptDetailUseCase
)
export const receiptDetailRouter = createReceiptDetailRouter(
  receiptDetailController,
  authMiddleware
)
//#endregion

//#region Declare OrderDetail
const orderDetailRepo = new OrderDetailPostgresRepo()
const createOrderDetailUseCase = new CreateOrderDetailUseCase(orderDetailRepo)
const updateOrderDetailUseCase = new UpdateOrderDetailUseCase(orderDetailRepo)
const findOrderDetailByIdUseCase = new FindOrderDetailByIdUseCase(orderDetailRepo)
const findAllOrderDetailsUseCase = new FindAllOrderDetailsUseCase(orderDetailRepo)
const getPaginationOrderDetailUseCase = new GetOrderDetailPaginationUseCase(orderDetailRepo)
const deleteOrderDetailUseCase = new DeleteOrderDetailUseCase(orderDetailRepo)
const orderDetailController = new OrderDetailController(
  createOrderDetailUseCase,
  updateOrderDetailUseCase,
  findOrderDetailByIdUseCase,
  findAllOrderDetailsUseCase,
  getPaginationOrderDetailUseCase,
  deleteOrderDetailUseCase
)
export const orderDetailRouter = createOrderDetailRouter(orderDetailController, authMiddleware)
//#endregion

//#region Declare User
const userRepo = new UserPostgresRepo()
const createUserUseCase = new CreateUserUseCase(userRepo)
const updateUserUseCase = new UpdateUserUseCase(userRepo)
const findUserByIdUseCase = new FindUserByIdUseCase(userRepo)
const findAllUsersUseCase = new FindAllUsersUseCase(userRepo)
const getPaginationUserUseCase = new GetUserPaginationUseCase(userRepo)
const deleteUserUseCase = new DeleteUserUseCase(userRepo)
const userController = new UserController(
  createUserUseCase,
  updateUserUseCase,
  findUserByIdUseCase,
  findAllUsersUseCase,
  getPaginationUserUseCase,
  deleteUserUseCase
)
export const userRouter = createUserRouter(userController, authMiddleware)
//#endregion

//#region Declare Card
const cardRepo = new CardPostgresRepo()
const createCardUseCase = new CreateCardUseCase(cardRepo)
const updateCardUseCase = new UpdateCardUseCase(cardRepo)
const findCardByIdUseCase = new FindCardByIdUseCase(cardRepo)
const findAllCardsUseCase = new FindAllCardsUseCase(cardRepo)
const getPaginationCardUseCase = new GetCardPaginationUseCase(cardRepo)
const deleteCardUseCase = new DeleteCardUseCase(cardRepo)
const cardController = new CardController(
  createCardUseCase,
  updateCardUseCase,
  findCardByIdUseCase,
  findAllCardsUseCase,
  getPaginationCardUseCase,
  deleteCardUseCase
)
export const cardRouter = createCardRouter(cardController, authMiddleware)
//#endregion

//#region Declare Review
const reviewRepo = new ReviewPostgresRepo()
const createReviewUseCase = new CreateReviewUseCase(reviewRepo)
const updateReviewUseCase = new UpdateReviewUseCase(reviewRepo)
const findReviewByIdUseCase = new FindReviewByIdUseCase(reviewRepo)
const findAllReviewsUseCase = new FindAllReviewsUseCase(reviewRepo)
const getPaginationReviewUseCase = new GetReviewPaginationUseCase(reviewRepo)
const deleteReviewUseCase = new DeleteReviewUseCase(reviewRepo)
const reviewController = new ReviewController(
  createReviewUseCase,
  updateReviewUseCase,
  findReviewByIdUseCase,
  findAllReviewsUseCase,
  getPaginationReviewUseCase,
  deleteReviewUseCase
)
export const reviewRouter = createReviewRouter(reviewController, authMiddleware)
//#endregion
//#endregion

const authService = new AuthService(userRepo, roleRepo, tokenRepo, jwtService)
const registerUseCase = new RegisterUseCase(authService)
const loginUseCase = new LoginUseCase(authService)
const refreshTokenUseCase = new RefreshTokenUseCase(authService)
const logoutUseCase = new LogoutUseCase(authService)
const authController = new AuthController(
  registerUseCase,
  loginUseCase,
  refreshTokenUseCase,
  logoutUseCase
)
export const authRouter = createAuthRouter(authController)
