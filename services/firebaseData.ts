const raw = require("./nvchinh-538be-default-rtdb-categories-export.json");

const data: any = raw;

export const categories = Object.values(data.categories || {});
export const products = Object.values(data.products || {});
export const featuredProducts = data.featuredProducts || {};
