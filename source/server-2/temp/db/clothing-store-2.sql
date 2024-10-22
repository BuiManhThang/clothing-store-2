CREATE TABLE "files" (
  "id" uuid PRIMARY KEY NOT NULL,
  "name" varchar(500) NOT NULL,
  "status" varchar(255) NOT NULL DEFAULT 'Temp',
  "createdAt" timestamp NOT NULL,
  "createdBy" varchar(255) NOT NULL,
  "modifiedAt" timestamp,
  "modifiedBy" varchar(255)
);

CREATE TABLE "roles" (
  "id" uuid PRIMARY KEY NOT NULL,
  "code" varchar(255) NOT NULL,
  "name" varchar(255) NOT NULL,
  "description" text NOT NULL DEFAULT '',
  "roleDetails" json NOT NULL,
  "createdAt" timestamp NOT NULL,
  "createdBy" varchar(255) NOT NULL,
  "modifiedAt" timestamp,
  "modifiedBy" varchar(255)
);

CREATE TABLE "users" (
  "id" uuid PRIMARY KEY NOT NULL,
  "code" varchar(255) NOT NULL,
  "fullName" varchar(255) NOT NULL,
  "email" varchar(255) NOT NULL,
  "password" varchar(255) NOT NULL,
  "phoneNumber" varchar(50),
  "status" varchar(255) NOT NULL DEFAULT 'Active',
  "createdAt" timestamp NOT NULL,
  "createdBy" varchar(255) NOT NULL,
  "modifiedAt" timestamp,
  "modifiedBy" varchar(255),
  "roleId" uuid NOT NULL,
  "avatarId" uuid
);

CREATE TABLE "tokens" (
  "id" uuid PRIMARY KEY NOT NULL,
  "refreshToken" varchar(1000) NOT NULL,
  "expireDate" timestamp NOT NULL,
  "device" varchar(500),
  "createdAt" timestamp NOT NULL,
  "createdBy" varchar(255) NOT NULL,
  "modifiedAt" timestamp,
  "modifiedBy" varchar(255),
  "userId" uuid NOT NULL
);

CREATE TABLE "categories" (
  "id" uuid PRIMARY KEY NOT NULL,
  "code" varchar(255) NOT NULL,
  "name" varchar(500) NOT NULL,
  "description" text NOT NULL DEFAULT '',
  "productCount" int NOT NULL DEFAULT 0,
  "status" varchar(255) NOT NULL DEFAULT 'Active',
  "createdAt" timestamp NOT NULL,
  "createdBy" varchar(255) NOT NULL,
  "modifiedAt" timestamp,
  "modifiedBy" varchar(255),
  "imageId" uuid
);

CREATE TABLE "productColors" (
  "id" uuid PRIMARY KEY NOT NULL,
  "code" varchar(255) NOT NULL,
  "name" varchar(500) NOT NULL,
  "description" text NOT NULL DEFAULT '',
  "order" int NOT NULL DEFAULT 0,
  "status" varchar(255) NOT NULL DEFAULT 'Active',
  "createdAt" timestamp NOT NULL,
  "createdBy" varchar(255) NOT NULL,
  "modifiedAt" timestamp,
  "modifiedBy" varchar(255),
  "productId" uuid NOT NULL
);

CREATE TABLE "productSizes" (
  "id" uuid PRIMARY KEY NOT NULL,
  "name" varchar(500) NOT NULL,
  "description" text NOT NULL DEFAULT '',
  "order" int NOT NULL DEFAULT 0,
  "status" varchar(255) NOT NULL DEFAULT 'Active',
  "createdAt" timestamp NOT NULL,
  "createdBy" varchar(255) NOT NULL,
  "modifiedAt" timestamp,
  "modifiedBy" varchar(255),
  "productId" uuid NOT NULL
);

CREATE TABLE "products" (
  "id" uuid PRIMARY KEY NOT NULL,
  "code" varchar(255) NOT NULL,
  "name" varchar(500) NOT NULL,
  "description" text NOT NULL DEFAULT '',
  "status" varchar(255) NOT NULL DEFAULT 'Active',
  "createdAt" timestamp NOT NULL,
  "createdBy" varchar(255) NOT NULL,
  "modifiedAt" timestamp,
  "modifiedBy" varchar(255),
  "avatarId" uuid NOT NULL,
  "categoryId" uuid NOT NULL
);

CREATE TABLE "productImages" (
  "id" uuid PRIMARY KEY NOT NULL,
  "productId" uuid NOT NULL,
  "imageId" uuid NOT NULL,
  "description" text NOT NULL DEFAULT '',
  "createdAt" timestamp NOT NULL,
  "createdBy" varchar(255) NOT NULL,
  "modifiedAt" timestamp,
  "modifiedBy" varchar(255)
);

CREATE TABLE "productInventory" (
  "id" uuid PRIMARY KEY NOT NULL,
  "productId" uuid NOT NULL,
  "colorId" uuid NOT NULL,
  "sizeId" uuid NOT NULL,
  "quantity" int NOT NULL DEFAULT 0,
  "createdAt" timestamp NOT NULL,
  "createdBy" varchar(255) NOT NULL,
  "modifiedAt" timestamp,
  "modifiedBy" varchar(255)
);

CREATE TABLE "receipts" (
  "id" uuid PRIMARY KEY NOT NULL,
  "code" varchar(255) NOT NULL,
  "receiptDate" timestamp NOT NULL,
  "totalMoney" DECIMAL(19, 4) NOT NULL,
  "totalProduct" DECIMAL(19, 4) NOT NULL,
  "status" varchar(255) NOT NULL DEFAULT 'Temp',
  "description" text NOT NULL DEFAULT '',
  "createdAt" timestamp NOT NULL,
  "createdBy" varchar(255) NOT NULL,
  "modifiedAt" timestamp,
  "modifiedBy" varchar(255),
  "createdUserId" uuid NOT NULL
);

CREATE TABLE "receiptDetails" (
  "id" uuid UNIQUE PRIMARY KEY NOT NULL,
  "quantity" int NOT NULL,
  "price" DECIMAL(19, 4) NOT NULL,
  "productCode" varchar(255) NOT NULL,
  "productName" varchar(500) NOT NULL,
  "colorCode" varchar(255) NOT NULL,
  "colorName" varchar(500) NOT NULL,
  "sizeName" varchar(500) NOT NULL,
  "createdAt" timestamp NOT NULL,
  "createdBy" varchar(255) NOT NULL,
  "modifiedAt" timestamp,
  "modifiedBy" varchar(255),
  "receiptId" uuid NOT NULL,
  "productId" uuid NOT NULL,
  "colorId" uuid NOT NULL,
  "sizeId" uuid NOT NULL
);

CREATE TABLE "coupons" (
  "id" uuid PRIMARY KEY NOT NULL,
  "code" varchar(255) NOT NULL,
  "expireDate" timestamp,
  "percent" float NOT NULL,
  "description" text NOT NULL DEFAULT '',
  "status" varchar(255) NOT NULL DEFAULT 'Active',
  "createdAt" timestamp NOT NULL,
  "createdBy" varchar(255) NOT NULL,
  "modifiedAt" timestamp,
  "modifiedBy" varchar(255)
);

CREATE TABLE "orders" (
  "id" uuid PRIMARY KEY NOT NULL,
  "code" varchar(255) NOT NULL,
  "orderDate" timestamp NOT NULL,
  "totalMoney" DECIMAL(19, 4) NOT NULL,
  "totalProduct" DECIMAL(19, 4) NOT NULL,
  "couponPercent" float,
  "finalTotalMoney" DECIMAL(19, 4) NOT NULL,
  "status" varchar(255) NOT NULL DEFAULT 'Wait',
  "description" text NOT NULL DEFAULT '',
  "city" varchar(500) NOT NULL,
  "district" varchar(500) NOT NULL,
  "address" text NOT NULL,
  "email" varchar(500),
  "phoneNumber" varchar(50),
  "createdAt" timestamp NOT NULL,
  "createdBy" varchar(255) NOT NULL,
  "modifiedAt" timestamp,
  "modifiedBy" varchar(255),
  "createdUserId" uuid NOT NULL,
  "couponId" uuid
);

CREATE TABLE "orderDetails" (
  "id" uuid UNIQUE PRIMARY KEY NOT NULL,
  "quantity" int NOT NULL,
  "price" DECIMAL(19, 4) NOT NULL,
  "productCode" varchar(255) NOT NULL,
  "productName" varchar(500) NOT NULL,
  "colorCode" varchar(255) NOT NULL,
  "colorName" varchar(500) NOT NULL,
  "sizeName" varchar(500) NOT NULL,
  "createdAt" timestamp NOT NULL,
  "createdBy" varchar(255) NOT NULL,
  "modifiedAt" timestamp,
  "modifiedBy" varchar(255),
  "orderId" uuid NOT NULL,
  "productId" uuid NOT NULL,
  "colorId" uuid NOT NULL,
  "sizeId" uuid NOT NULL
);

CREATE TABLE "cards" (
  "id" uuid UNIQUE PRIMARY KEY NOT NULL,
  "quantity" int NOT NULL,
  "createdAt" timestamp NOT NULL,
  "createdBy" varchar(255) NOT NULL,
  "modifiedAt" timestamp,
  "modifiedBy" varchar(255),
  "userId" uuid NOT NULL,
  "productId" uuid NOT NULL,
  "colorId" uuid NOT NULL,
  "sizeId" uuid NOT NULL
);

CREATE TABLE "reviews" (
  "id" uuid UNIQUE PRIMARY KEY NOT NULL,
  "score" int NOT NULL DEFAULT 0,
  "content" text NOT NULL DEFAULT '',
  "createdAt" timestamp NOT NULL,
  "createdBy" varchar(255) NOT NULL,
  "modifiedAt" timestamp,
  "modifiedBy" varchar(255),
  "userId" uuid NOT NULL,
  "productId" uuid NOT NULL
);

CREATE UNIQUE INDEX ON "files" ("id");

CREATE UNIQUE INDEX ON "roles" ("id");

CREATE UNIQUE INDEX ON "users" ("id");

CREATE INDEX "id_refreshToken" ON "tokens" ("id", "refreshToken");

CREATE UNIQUE INDEX ON "tokens" ("id");

CREATE UNIQUE INDEX ON "categories" ("id");

CREATE UNIQUE INDEX ON "productColors" ("id");

CREATE UNIQUE INDEX ON "productSizes" ("id");

CREATE UNIQUE INDEX ON "products" ("id");

CREATE UNIQUE INDEX ON "productImages" ("id");

CREATE UNIQUE INDEX ON "productInventory" ("id");

CREATE UNIQUE INDEX ON "receipts" ("id");

CREATE UNIQUE INDEX ON "receiptDetails" ("id");

CREATE UNIQUE INDEX ON "orders" ("id");

CREATE UNIQUE INDEX ON "orderDetails" ("id");

CREATE UNIQUE INDEX ON "cards" ("id");

CREATE UNIQUE INDEX ON "reviews" ("id");

COMMENT ON COLUMN "files"."status" IS 'Temp | Real';

COMMENT ON COLUMN "roles"."roleDetails" IS '[{screenCode: ''Users'', actions: [''View'', ''Edit'']}]';

COMMENT ON COLUMN "users"."status" IS 'Inactive | Active';

COMMENT ON COLUMN "categories"."status" IS 'Inactive | Active';

COMMENT ON COLUMN "productColors"."status" IS 'Inactive | Active';

COMMENT ON COLUMN "productSizes"."status" IS 'Inactive | Active';

COMMENT ON COLUMN "products"."status" IS 'Inactive | Active';

COMMENT ON COLUMN "receipts"."status" IS 'Temp | Complete';

COMMENT ON COLUMN "coupons"."status" IS 'Inactive | Active';

COMMENT ON COLUMN "orders"."status" IS 'Wait | Approve | Complete';

ALTER TABLE "users" ADD FOREIGN KEY ("roleId") REFERENCES "roles" ("id");

ALTER TABLE "users" ADD FOREIGN KEY ("avatarId") REFERENCES "files" ("id");

ALTER TABLE "tokens" ADD FOREIGN KEY ("userId") REFERENCES "users" ("id");

ALTER TABLE "categories" ADD FOREIGN KEY ("imageId") REFERENCES "files" ("id");

ALTER TABLE "productColors" ADD FOREIGN KEY ("productId") REFERENCES "products" ("id");

ALTER TABLE "productSizes" ADD FOREIGN KEY ("productId") REFERENCES "products" ("id");

ALTER TABLE "products" ADD FOREIGN KEY ("avatarId") REFERENCES "files" ("id");

ALTER TABLE "products" ADD FOREIGN KEY ("categoryId") REFERENCES "categories" ("id");

ALTER TABLE "productImages" ADD FOREIGN KEY ("productId") REFERENCES "products" ("id");

ALTER TABLE "productImages" ADD FOREIGN KEY ("imageId") REFERENCES "files" ("id");

ALTER TABLE "productInventory" ADD FOREIGN KEY ("productId") REFERENCES "products" ("id");

ALTER TABLE "productInventory" ADD FOREIGN KEY ("colorId") REFERENCES "productColors" ("id");

ALTER TABLE "productInventory" ADD FOREIGN KEY ("sizeId") REFERENCES "productSizes" ("id");

ALTER TABLE "receipts" ADD FOREIGN KEY ("createdUserId") REFERENCES "users" ("id");

ALTER TABLE "receiptDetails" ADD FOREIGN KEY ("receiptId") REFERENCES "receipts" ("id");

ALTER TABLE "receiptDetails" ADD FOREIGN KEY ("productId") REFERENCES "products" ("id");

ALTER TABLE "receiptDetails" ADD FOREIGN KEY ("colorId") REFERENCES "productColors" ("id");

ALTER TABLE "receiptDetails" ADD FOREIGN KEY ("sizeId") REFERENCES "productSizes" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("createdUserId") REFERENCES "users" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("couponId") REFERENCES "coupons" ("id");

ALTER TABLE "orderDetails" ADD FOREIGN KEY ("orderId") REFERENCES "receipts" ("id");

ALTER TABLE "orderDetails" ADD FOREIGN KEY ("productId") REFERENCES "products" ("id");

ALTER TABLE "orderDetails" ADD FOREIGN KEY ("colorId") REFERENCES "productColors" ("id");

ALTER TABLE "orderDetails" ADD FOREIGN KEY ("sizeId") REFERENCES "productSizes" ("id");

ALTER TABLE "cards" ADD FOREIGN KEY ("userId") REFERENCES "users" ("id");

ALTER TABLE "cards" ADD FOREIGN KEY ("productId") REFERENCES "products" ("id");

ALTER TABLE "cards" ADD FOREIGN KEY ("colorId") REFERENCES "productColors" ("id");

ALTER TABLE "cards" ADD FOREIGN KEY ("sizeId") REFERENCES "productSizes" ("id");

ALTER TABLE "reviews" ADD FOREIGN KEY ("userId") REFERENCES "users" ("id");

ALTER TABLE "reviews" ADD FOREIGN KEY ("productId") REFERENCES "products" ("id");


SELECT table_name 
FROM information_schema.tables
WHERE table_schema = 'public';

select * from users;