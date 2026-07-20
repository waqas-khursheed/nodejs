import path from "path";
import fs from "fs";
import "../../src/database/models/index.js";
import Product from "../../src/database/models/Product.js";
import AttributeItem from "../../src/database/models/AttributeItem.js";
import AssignCatToProduct from "../../src/database/models/AssignCatToProduct.js";
import { slugify } from "../../src/shared/helpers/helpers.js";
import { createStockService } from "../../src/modules/stocks/services/stock.service.js";

export const productsUploadDir = path.join(process.cwd(), "src", "storage", "uploads", "products");

// Fixed attribute *type* ids already seeded in this DB (Size=1, Color=3,
// Fitting=4). Sorting these ascending and mapping positionally onto Stock's
// 3 physical slots (color_id/size_id/fitting_id) is the same convention
// frontend_user/src/lib/variants.ts uses to *display* variants — this just
// has to derive the identical slot order when *writing* them.
const TYPE_ID = { Size: 1, Color: 3, Fitting: 4 };
const SLOT_NAMES = ["color_id", "size_id", "fitting_id"];

function resolveSlots(variantTypesUsed) {
  const sortedTypeNames = [...variantTypesUsed].sort((a, b) => TYPE_ID[a] - TYPE_ID[b]);
  const slotByType = {};
  sortedTypeNames.forEach((typeName, index) => {
    slotByType[typeName] = SLOT_NAMES[index];
  });
  return slotByType;
}

async function findOrCreateAttributeItem(typeName, title) {
  const [item] = await AttributeItem.findOrCreate({
    where: { attribute_id: TYPE_ID[typeName], title },
    defaults: { attribute_id: TYPE_ID[typeName], title, order_by: 0, image: "" },
  });
  return item.id;
}

function copyImage(sourceFile) {
  const ext = path.extname(sourceFile) || ".jpg";
  const filename = `${Date.now()}-${Math.floor(Math.random() * 900000000)}${ext}`;
  fs.copyFileSync(sourceFile, path.join(productsUploadDir, filename));
  return filename;
}

/**
 * def = {
 *   title, short_desc, long_desc, price, dPrice?, categoryId,
 *   featuredImagePath, galleryImagePaths?: string[],
 *   quantity?: number (for non-variant products; default 40),
 *   newArrival?, bestSeller?,
 *   variants?: {              // omit entirely for a non-variant product
 *     Size?: string[], Color?: string[], Fitting?: string[],
 *     combos: { Size?, Color?, Fitting?, qty, price }[]
 *   }
 * }
 */
export async function createCatalogProduct(def) {
  const isVariation = !!def.variants;
  const featured_image = copyImage(def.featuredImagePath);
  const gallery = (def.galleryImagePaths ?? []).map(copyImage);

  const product = await Product.create({
    title: def.title,
    slug: slugify(def.title),
    short_desc: def.short_desc,
    long_desc: def.long_desc,
    price: def.price,
    d_price: def.dPrice ?? 0,
    d_percentage: 0,
    quantity: isVariation ? 0 : (def.quantity ?? 40),
    status: 1,
    sold: Math.floor(Math.random() * 40),
    featured_image,
    hovered_image: gallery[0] ?? null,
    brand_id: null,
    is_variation: isVariation ? 1 : 0,
    is_prescription: 0,
    new_arrival: def.newArrival ? 1 : 0,
    best_seller: def.bestSeller ? 1 : 0,
  });

  await AssignCatToProduct.create({ product_id: product.id, category_id: def.categoryId });

  if (gallery.length > 0) {
    const ProductGallery = (await import("../../src/database/models/ProductGallery.js")).default;
    for (const image of gallery) {
      await ProductGallery.create({ product_id: product.id, image });
    }
  }

  if (isVariation) {
    const variantTypesUsed = Object.keys(def.variants).filter((k) => k !== "combos");
    const slotByType = resolveSlots(variantTypesUsed);

    // Pre-resolve every named value (e.g. Size "M") to its AttributeItem id.
    const itemIdCache = {};
    for (const typeName of variantTypesUsed) {
      itemIdCache[typeName] = {};
      for (const value of def.variants[typeName]) {
        itemIdCache[typeName][value] = await findOrCreateAttributeItem(typeName, value);
      }
    }

    for (const combo of def.variants.combos) {
      const stockData = { product_id: product.id, stock_qty: combo.qty, stock_price: combo.price ?? def.price };
      for (const typeName of variantTypesUsed) {
        const slot = slotByType[typeName];
        stockData[slot] = combo[typeName] ? itemIdCache[typeName][combo[typeName]] : null;
      }
      await createStockService(stockData);
    }
  }

  console.log(`Created product ${product.id}: ${product.title} (category ${def.categoryId})`);
  return product;
}
