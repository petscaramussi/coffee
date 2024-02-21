CREATE DATABASE coffee;

\c coffee;

CREATE TABLE IF NOT EXISTS "Orders" (
    "Id" SERIAL PRIMARY KEY,
    "Name" VARCHAR(100) NOT NULL,
    "Tel" VARCHAR(100) NOT NULL,
    "Address" TEXT,
    "AddressComplement" TEXT NOT NULL,
    "Payment" TEXT
);

CREATE TABLE IF NOT EXISTS "ProductTypes" (
    "Id" SERIAL PRIMARY KEY,
    "Name" VARCHAR(100),
    "ImgUrl" TEXT
);

CREATE TABLE IF NOT EXISTS "Products" (
    "Id" SERIAL PRIMARY KEY,
    "Name" VARCHAR(100) NOT NULL,
    "Description" VARCHAR(100) NOT NULL,
    "Price" DECIMAL(18,2),
    "PictureUrl" TEXT NOT NULL,
    "ProductTypeId" INT NOT NULL,
    CONSTRAINT "FK_Products_ProductTypes" FOREIGN KEY ("ProductTypeId") REFERENCES "ProductTypes"("Id")
);

CREATE TABLE IF NOT EXISTS "Items" (
    "Id" SERIAL PRIMARY KEY,
    "OrderId" INT NOT NULL,
    "ProductId" INT NOT NULL,
    "Qtde" INT NOT NULL,
    CONSTRAINT "FK_Items_Orders" FOREIGN KEY ("OrderId") REFERENCES "Orders"("Id"),
    CONSTRAINT "FK_Items_Products" FOREIGN KEY ("ProductId") REFERENCES "Products"("Id")
);

CREATE INDEX "IX_Items_OrderId" ON "Items" ("OrderId");
CREATE INDEX "IX_Items_ProductId" ON "Items" ("ProductId");
CREATE INDEX "IX_Products_ProductTypeId" ON "Products" ("ProductTypeId");

INSERT INTO "ProductTypes" ("Name", "ImgUrl")
VALUES ('Café', 'https://cdn-icons-png.flaticon.com/512/924/924514.png')
RETURNING *;

INSERT INTO "Products" ("Name", "Description", "Price", "PictureUrl", "ProductTypeId")
VALUES ('Café preto', 'Café preto, forte e amargo', 10.0, '', 1)
RETURNING *;