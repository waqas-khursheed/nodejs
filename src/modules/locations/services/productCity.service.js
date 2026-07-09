import {
  findProductCitiesRepo,
  findCitiesByIdsRepo,
  syncProductCitiesRepo,
} from "../repositories/productCity.repository.js";
import { findProductByIdRepo } from "../../products/repositories/product.repository.js";

export const getProductCitiesService = async (productId) => {
  const product = await findProductByIdRepo(productId);
  if (!product) throw new Error("PRODUCT_NOT_FOUND");

  return await findProductCitiesRepo(productId);
};

export const syncProductCitiesService = async (productId, cityIds) => {
  const product = await findProductByIdRepo(productId);
  if (!product) throw new Error("PRODUCT_NOT_FOUND");

  if (cityIds && cityIds.length > 0) {
    const found = await findCitiesByIdsRepo(cityIds);
    if (found.length !== cityIds.length) {
      throw new Error("CITY_NOT_FOUND");
    }
  }

  await syncProductCitiesRepo(productId, cityIds);
  return await findProductCitiesRepo(productId);
};
