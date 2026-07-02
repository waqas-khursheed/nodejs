import Slide from "../../../database/models/Slide.js";
import { deleteUploadedFile } from "../../../shared/utils/fileUtils.js";
import { getPagination, buildPaginationMeta } from "../../../shared/utils/pagination.js";

export const createSlideService = async (data) => {
  if (!data.image) throw new Error("IMAGE_REQUIRED");
  return await Slide.create(data);
};

export const getSlidesService = async (query) => {
  const { page, limit, offset } = getPagination(query);
  const where = {};

  if (query.status !== undefined && query.status !== "") {
    where.status = query.status;
  }

  const { count, rows } = await Slide.findAndCountAll({
    where,
    limit,
    offset,
    order: [["id", "DESC"]],
  });

  return { slides: rows, meta: buildPaginationMeta({ count, page, limit }) };
};

export const getSlideByIdService = async (id) => {
  const slide = await Slide.findByPk(id);
  if (!slide) throw new Error("SLIDE_NOT_FOUND");
  return slide;
};

export const updateSlideService = async (id, data) => {
  const slide = await Slide.findByPk(id);
  if (!slide) throw new Error("SLIDE_NOT_FOUND");

  if (data.image) {
    deleteUploadedFile("slides", slide.image);
  }

  await Slide.update(data, { where: { id } });
  return await Slide.findByPk(id);
};

export const toggleSlideStatusService = async (id) => {
  const slide = await Slide.findByPk(id);
  if (!slide) throw new Error("SLIDE_NOT_FOUND");

  const newStatus = Number(slide.status) === 1 ? 0 : 1;
  await Slide.update({ status: newStatus }, { where: { id } });
  return await Slide.findByPk(id);
};

export const deleteSlideService = async (id) => {
  const slide = await Slide.findByPk(id);
  if (!slide) throw new Error("SLIDE_NOT_FOUND");

  await Slide.destroy({ where: { id } });
  if (slide.image) deleteUploadedFile("slides", slide.image);

  return true;
};
