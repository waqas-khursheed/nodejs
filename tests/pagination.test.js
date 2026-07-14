import { getPagination, buildPaginationMeta } from "../src/shared/utils/pagination.js";

describe("getPagination", () => {
  it("defaults to page 1, limit 10 when nothing is provided", () => {
    expect(getPagination({})).toEqual({ page: 1, limit: 10, offset: 0 });
  });

  it("computes the correct offset for a later page", () => {
    expect(getPagination({ page: 3, limit: 20 })).toEqual({ page: 3, limit: 20, offset: 40 });
  });

  it("clamps page below 1 up to 1", () => {
    expect(getPagination({ page: -5 }).page).toBe(1);
  });

  it("clamps limit above 100 down to 100", () => {
    expect(getPagination({ limit: 9999 }).limit).toBe(100);
  });

  it("treats a limit of 0 as not provided and falls back to the default of 10", () => {
    // `parseInt(0, 10) || 10` treats 0 as falsy, same as an empty/missing limit.
    expect(getPagination({ limit: 0 }).limit).toBe(10);
  });

  it("clamps a negative limit up to 1", () => {
    expect(getPagination({ limit: -5 }).limit).toBe(1);
  });

  it("ignores non-numeric input and falls back to defaults", () => {
    expect(getPagination({ page: "abc", limit: "xyz" })).toEqual({ page: 1, limit: 10, offset: 0 });
  });
});

describe("buildPaginationMeta", () => {
  it("computes total pages from count and limit", () => {
    expect(buildPaginationMeta({ count: 95, page: 1, limit: 10 })).toEqual({
      total: 95,
      page: 1,
      limit: 10,
      totalPages: 10,
    });
  });

  it("returns at least 1 total page when count is 0", () => {
    expect(buildPaginationMeta({ count: 0, page: 1, limit: 10 }).totalPages).toBe(1);
  });
});
