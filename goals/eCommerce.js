// 1. Authentication Module
// Tables
// users
// admins
// password_resets
// reset_password_codes
// Features
// Register
// Login
// Logout
// JWT Authentication
// Forgot Password
// Reset Password
// Email Verification
// Social Login
// Admin Login


// 2. User Module
// Tables
// users
// user_addresses
// user_rewards
// Features
// User Profile
// Update Profile
// Change Password
// Multiple Addresses
// Reward Points
// Account Status


// 3. Admin Module
// Tables
// admins
// Features
// Dashboard
// Admin Roles
// Admin Profile
// Admin Login
// Permissions


// 4. Product Module
// Tables
// products
// product_galleries
// product_attributes
// attribute_items
// stocks
// stock_items
// assign_attr_to_products
// Features
// Product CRUD
// Product Variations
// Product Gallery
// Product Attributes
// Inventory
// Product Videos
// Product SEO
// Product Stock
// Discount System


// 5. Category Module
// Tables
// product_categories
// assign_cat_to_products
// Features
// Parent Categories
// Child Categories
// Category Products
// Category SEO
// Category Banner/Icon


// 6. Brand Module
// Tables
// brands
// Features
// Brand CRUD
// Brand Products
// Brand Logo
// Brand SEO

// 7. Tag Module
// Tables
// product_tags
// assign_tag_to_products
// assign_tag_to_tags
// Features
// Product Tags
// Related Products
// Tag SEO

// 8. Cart Module
// Tables
// carts
// Features
// Add To Cart
// Guest Cart
// User Cart
// Update Quantity
// Coupon Apply
// Card Discount
// Cart Merge


// 9. Wishlist Module
// Tables
// wishlists
// Features
// Add Wishlist
// Remove Wishlist
// User Wishlist


// 10. Order Module
// Tables
// orders
// order_details
// billing_details
// order_galleries
// Features
// Place Order
// Order History
// Order Tracking
// Order Status
// Delivery Schedule
// Order Invoice
// Payment Status


// 11. Payment Module
// Tables
// card_details
// card_categories
// card_types
// banks
// mobile_card
// Features
// Card Verification
// Payment Discounts
// Bank Discounts
// Card Type Management


// 12. Coupon Module
// Tables
// coupons
// mobile_coupons
// random_coupons
// used_coupons
// meta_coupon_categories
// Features
// Coupon Apply
// Discount Rules
// Coupon Expiry
// User Coupon Usage
// Random Coupons


// 13. Review & Rating Module
// Tables
// reviews
// Features
// Product Reviews
// Product Ratings
// Approve Reviews
// Review Status


// 14. Reward Points Module
// Tables
// reward_settings
// rewards_earning_method
// user_rewards
// Features
// Earn Rewards
// Redeem Rewards
// Reward Calculation


// 15. Notification Module
// Tables
// notifications
// Features
// Order Notifications
// Product Notifications
// User Notifications
// Admin Notifications


// 16. Banner & Slider Module
// Tables
// slides
// mobile_sliders
// home_banners
// application_home_banners
// application_slides
// side_banners
// Features
// Website Sliders
// Mobile Sliders
// Promotional Banners


// 17. CMS Module
// Tables
// common_pages
// contact_us_page
// faqs
// faq_categories
// Features
// Dynamic Pages
// About Us
// Contact Us
// FAQs
// Terms & Conditions
// Privacy Policy


// 18. Subscription Module
// Tables
// subscribes
// Features
// Newsletter Subscription
// Email Marketing


// 19. Contact / Query Module
// Tables
// query_forms
// Features
// Contact Form
// Customer Queries
// Admin Responses


// 20. Exchange / Return Module
// Tables
// exchanges
// Features
// Return Requests
// Exchange Requests
// Exchange Status


// 21. Settings Module
// Tables
// web_settings
// Features
// Website Settings
// Shipping Settings
// Delivery Time
// Logos
// SEO Settings


// 22. Geo Location Module
// Tables
// countries
// states
// cities
// geo_countries
// geo_states
// geo_cities
// geo_continents
// geo_sub_continents
// geo_zones
// Features
// Country List
// State List
// City List
// Delivery Regions


// 23. Size Chart Module
// Tables
// size_charts
// Features
// Product Size Guides
// Mobile Size Charts


// 24. Inventory Module
// Tables
// stocks
// stock_items
// Features
// Stock Management
// Variant Inventory
// Quantity Tracking


// 25. Search Module
// Uses
// products
// categories
// brands
// tags
// Features
// Product Search
// Filter Search
// Category Search
// Brand Search


// 26. SEO Module
// Uses
// products
// categories
// brands
// tags
// pages
// Features
// Meta Tags
// Meta Keywords
// Slugs
// Open Graph Images


// 27. Delivery Scheduling Module
// Tables
// orders
// web_settings
// Features
// Delivery Days
// Delivery Time Slots
// Shipping Charges


// 28. Mobile App Module
// Tables
// mobile_card
// mobile_coupons
// mobile_sliders
// application_slides
// Features
// Mobile APIs
// App Sliders
// App Coupons



// Recommended Development Order


// Phase 1 (Core)
// 1. Auth
// 2. User
// 3. Category
// 4. Brand
// 5. Product
// 6. Product Variants
// 7. Cart
// 8. Wishlist
// Phase 2 (Orders)
// 9. Coupon
// 10. Checkout
// 11. Orders
// 12. Payment
// 13. Billing
// Phase 3 (Advanced)
// 14. Reviews
// 15. Rewards
// 16. Notifications
// 17. Returns/Exchange
// 18. CMS
// 19. SEO
// 20. Search
// Phase 4 (Admin)
// 21. Dashboard
// 22. Analytics
// 23. Reports
// 24. Settings
// 25. Inventory


// Modular Monolith Structure
// src/
// │
// ├── app.js
// ├── server.js
// │
// ├── config/
// │   ├── database.js
// │   ├── app.config.js
// │   └── jwt.config.js
// │
// ├── modules/
// │
// │   ├── auth/
// │   │   ├── controllers/
// │   │   ├── services/
// │   │   ├── repositories/
// │   │   ├── routes/
// │   │   ├── validations/
// │   │   ├── middleware/
// │   │   └── auth.module.js
// │   │
// │   ├── users/
// │   │   ├── controllers/
// │   │   ├── services/
// │   │   ├── repositories/
// │   │   ├── routes/
// │   │   ├── validations/
// │   │   └── user.module.js
// │   │
// │   ├── products/
// │   │   ├── controllers/
// │   │   ├── services/
// │   │   ├── repositories/
// │   │   ├── routes/
// │   │   ├── validations/
// │   │   ├── helpers/
// │   │   └── product.module.js
// │   │
// │   ├── categories/
// │   ├── brands/
// │   ├── orders/
// │   ├── carts/
// │   ├── coupons/
// │   ├── wishlists/
// │   ├── reviews/
// │   ├── rewards/
// │   ├── notifications/
// │   ├── banners/
// │   ├── settings/
// │   └── cms/
// │
// ├── database/
// │   │
// │   ├── migrations/
// │   ├── seeders/
// │   │
// │   ├── models/
// │   │   ├── User.js
// │   │   ├── Product.js
// │   │   ├── Category.js
// │   │   ├── Brand.js
// │   │   └── etc...
// │   │
// │   ├── associations/
// │   │   ├── user.association.js
// │   │   ├── product.association.js
// │   │   ├── order.association.js
// │   │   └── index.js
// │   │
// │   └── index.js
// │
// ├── shared/
// │   ├── helpers/
// │   ├── middleware/
// │   ├── utils/
// │   ├── constants/
// │   ├── services/
// │   └── responses/
// │
// ├── storage/
// │   ├── uploads/
// │   └── temp/
// │
// └── docs/