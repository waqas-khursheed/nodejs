'use strict';

const TOTAL = 500;
const EXISTING_IMAGE = "1783029790741-787188564.png"; // only real file in storage/uploads/products

const ADJECTIVES = [
  "Premium", "Classic", "Modern", "Elegant", "Sporty", "Compact", "Deluxe", "Ultra",
  "Essential", "Rugged", "Sleek", "Vintage", "Smart", "Portable", "Eco-Friendly",
  "Handcrafted", "Lightweight", "Heavy-Duty", "Wireless", "Adjustable", "Foldable",
  "Waterproof", "Breathable", "Reversible", "Cushioned", "Minimalist", "Bold",
];

const NOUNS = [
  "Backpack", "Sneakers", "Jacket", "Headphones", "Watch", "Sunglasses", "Wallet",
  "Laptop Stand", "Water Bottle", "Desk Lamp", "Yoga Mat", "Coffee Mug", "Bluetooth Speaker",
  "Running Shoes", "Leather Belt", "Office Chair", "Table Lamp", "Denim Jacket", "Wool Sweater",
  "Phone Case", "Camera Bag", "Travel Pillow", "Kitchen Knife Set", "Cotton T-Shirt",
  "Hoodie", "Sandals", "Cap", "Scarf", "Notebook", "Desk Organizer", "Power Bank",
  "Keyboard", "Mouse", "Monitor Stand", "Gaming Chair", "Duffel Bag", "Wristband",
];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomFloat(min, max, decimals = 2) {
  return Number((Math.random() * (max - min) + min).toFixed(decimals));
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const [existing] = await queryInterface.sequelize.query(
      "SELECT COUNT(*) as count FROM products WHERE sku LIKE 'FAKE-%';"
    );
    if (existing[0].count > 0) {
      console.log("Fake products already seeded, skipping.");
      return;
    }

    const [brands] = await queryInterface.sequelize.query("SELECT id FROM brands;");
    const brandIds = brands.map((b) => b.id);

    const now = new Date();
    const rows = [];

    for (let i = 1; i <= TOTAL; i++) {
      const title = `${pick(ADJECTIVES)} ${pick(NOUNS)}`;
      const price = randomFloat(10, 999);
      const hasDiscount = Math.random() < 0.3;
      const dPercentage = hasDiscount ? randomInt(5, 50) : 0;
      const dPrice = hasDiscount ? Math.round(price * (1 - dPercentage / 100)) : 0;

      rows.push({
        title,
        slug: `${slugify(title)}-${i}`,
        short_desc: `${title} — a great addition to your collection.`,
        long_desc: `This ${title.toLowerCase()} is built with quality materials and designed for everyday use. Seeded fake product #${i}.`,
        features: null,
        inside_box: null,
        price,
        d_price: dPrice,
        d_percentage: dPercentage,
        dis_start_date: null,
        dis_end_date: null,
        quantity: randomInt(0, 500),
        sku: `FAKE-${String(i).padStart(5, "0")}`,
        status: Math.random() < 0.9 ? 1 : 0,
        sold: randomInt(0, 300),
        video_1: null,
        video_2: null,
        chart_image: null,
        featured_image: EXISTING_IMAGE,
        hovered_image: EXISTING_IMAGE,
        featured_image_alt: title,
        featured_image_title: title,
        hovered_image_alt: null,
        hovered_image_title: null,
        size_chart_alt: null,
        size_chart_title: null,
        brand_id: brandIds.length > 0 && Math.random() < 0.8 ? pick(brandIds) : null,
        is_variation: 0,
        is_prescription: 0,
        weight: randomFloat(0.1, 5),
        new_arrival: Math.random() < 0.2 ? 1 : 0,
        best_seller: Math.random() < 0.15 ? 1 : 0,
        meta_keywords: title.toLowerCase().split(" ").join(", "),
        meta_description: `Buy ${title} online at the best price.`,
        created_at: now,
        updated_at: now,
      });
    }

    await queryInterface.bulkInsert("products", rows);
    console.log(`Inserted ${TOTAL} fake products.`);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("products", {
      sku: { [require("sequelize").Op.like]: "FAKE-%" },
    });
  },
};
