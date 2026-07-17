import swaggerJsdoc from "swagger-jsdoc";
import config from "./config.js";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ecommerce API",
      version: "1.0.0",
      description:
        "REST API documentation for the Ecommerce backend (admin + user side).",
    },
    servers: [
      {
        url: `http://localhost:${config.port || 3000}`,
        description: "Local development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          description: "Enter token in format: Bearer {token}",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        SuccessResponse: {
          type: "object",
          description: "Generic success response without a data payload",
          properties: {
            status: { type: "boolean", example: true },
            message: { type: "string", example: "Operation successful" },
          },
        },
        SuccessDataResponse: {
          type: "object",
          description: "Generic success response with a data payload",
          properties: {
            status: { type: "boolean", example: true },
            message: { type: "string", example: "Operation successful" },
            data: { type: "object", nullable: true },
          },
        },
        ErrorResponse: {
          type: "object",
          description: "Generic error response",
          properties: {
            status: { type: "boolean", example: false },
            message: { type: "string", example: "Something went wrong" },
            errors: { type: "object", nullable: true, example: null },
          },
        },
        ValidationErrorResponse: {
          type: "object",
          description: "Joi validation failure (422)",
          properties: {
            status: { type: "boolean", example: false },
            message: { type: "string", example: "Validation Error" },
            errors: {
              type: "array",
              items: { type: "string" },
              example: ["\"title\" is required"],
            },
          },
        },
        UnauthorizedResponse: {
          type: "object",
          description: "Missing / invalid / expired JWT",
          properties: {
            status: { type: "boolean", example: false },
            message: { type: "string", example: "Unauthorized" },
            errors: {
              type: "object",
              example: { token: "Access token is required" },
            },
          },
        },
      },
    },
    tags: [
      { name: "Admin Auth", description: "Admin authentication" },
      { name: "Admin Categories", description: "Category management (admin)" },
      { name: "Admin Brands", description: "Brand management (admin)" },
      {
        name: "Admin Attributes",
        description: "Product attribute & attribute-item management (admin)",
      },
      { name: "Admin Products", description: "Product management (admin)" },
      { name: "Admin Stock", description: "Stock / inventory management (admin)" },
      { name: "Admin Banners", description: "Slides & banner management (admin)" },
      { name: "Admin Coupons", description: "Coupon management (admin)" },
      { name: "Admin Orders", description: "Order management (admin)" },
      { name: "Admin Users", description: "Customer account management (admin)" },
      { name: "Admin Reviews", description: "Review moderation (admin)" },
      { name: "Admin Rewards", description: "Reward settings, earning rules & user reward balances (admin)" },
      { name: "Admin FAQ", description: "FAQ categories & FAQs (admin)" },
      { name: "Admin CMS Pages", description: "Static CMS pages & contact-us page (admin)" },
      { name: "Admin Web Settings", description: "Site-wide configuration (admin)" },
      { name: "Admin Location", description: "Country/state/city & geo location management (admin)" },
      { name: "Admin Notifications", description: "Admin dashboard notification feed" },
      { name: "Admin Leads", description: "Contact form queries & newsletter subscribers (admin)" },
      { name: "Admin Dashboard", description: "Sales overview & reports (admin)" },
      { name: "User Auth", description: "Customer registration, login, password reset & profile" },
      { name: "User Categories", description: "Browse product categories" },
      { name: "User Brands", description: "Browse brands" },
      { name: "User Products", description: "Browse/search/filter products, stock check" },
      { name: "User Reviews", description: "Submit and view product reviews" },
      { name: "User Wishlist", description: "Save/remove products to a wishlist" },
      { name: "User Cart", description: "Shopping cart management" },
      { name: "User Addresses", description: "Manage saved shipping/billing address" },
      { name: "User Coupons", description: "Apply/validate coupon codes against the cart" },
      { name: "User Checkout & Orders", description: "Place orders, view order history" },
      { name: "User Rewards", description: "View reward balance & program settings" },
      { name: "User Exchanges", description: "Submit an order return/exchange request" },
      { name: "User Home & Content", description: "Homepage content, FAQs, static pages" },
      { name: "User Leads", description: "Newsletter subscribe & contact form" },
    ],
  },
  apis: ["./src/swagger/**/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
