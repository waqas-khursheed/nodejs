# Admin-Side Modules — Build Order

Admin panel modules, sequence dependency ke hisaab se (upar wala pehle banana hai, kyunke neechay wale usi par depend karte hain).

## 1. Admin Auth ✅ (already built)
Admin login.
Tables: `admins`

## 2. Categories Management 🚧 (create route already built — list/update/delete baaki)
CRUD + parent/child tree.
Tables: `product_categories`

## 3. Brands Management
CRUD.
Tables: `brands`

## 4. Product Attributes Management
Attributes (size/color/fitting) + attribute values, products se pehle banana zaroori hai.
Tables: `product_attributes`, `attribute_items`

## 5. Products Management
CRUD, gallery images, variations assign (attributes/category/tags), stock per variation.
Tables: `products`, `assign_attr_to_products`, `assign_cat_to_products`, `assign_tag_to_products`, `product_galleries`, `product_tags`, `assign_tag_to_tags`

## 6. Stock / Inventory Management
Stock qty, per-variation discount pricing.
Tables: `stocks`, `stock_items`

## 7. Banners & Slides Management
Homepage/app slides, home/side/application banners.
Tables: `slides`, `application_slides`, `mobile_sliders`, `home_banners`, `application_home_banners`, `side_banners`

## 8. Coupons Management
Coupon create, category-restricted coupons, random/mobile coupons, usage tracking.
Tables: `coupons`, `random_coupons`, `mobile_coupons`, `meta_coupon_categories`, `used_coupons`

## 9. Orders Management
Order list/detail, status update, billing details, order gallery, exchange requests.
Tables: `orders`, `order_details`, `order_galleries`, `billing_details`, `exchanges`

## 10. Users Management
Customer list/detail, activate/deactivate, addresses view.
Tables: `users`, `user_addresses`

## 11. Reviews Moderation
Approve/reject/delete reviews.
Tables: `reviews`

## 12. Rewards Settings
Points-earning rules, redemption settings.
Tables: `reward_settings`, `rewards_earning_method`, `user_rewards`

## 13. FAQ & CMS Pages
FAQ categories/items, static pages (about/contact/terms), contact page config.
Tables: `faq_categories`, `faqs`, `common_pages`, `contact_us_page`

## 14. Web Settings
Site-wide config: logo, delivery days/time, shipping rate, footer widgets.
Tables: `web_settings`

## 15. Location Management
Countries/states/cities (legacy) ya geo_* (continent→country→state→city→zone), product-city availability.
Tables: `countries`, `states`, `cities`, `geo_continents`, `geo_sub_continents`, `geo_countries`, `geo_states`, `geo_cities`, `geo_zones`, `product_cities`

## 16. Card / Bank Management
Payment-related discount config (bank, card type/category, discount %).
Tables: `banks`, `card_categories`, `card_types`, `card_details`, `mobile_card`

## 17. Notifications Feed
Admin dashboard ke liye naye order/product/user/subscribe events.
Tables: `notifications`

## 18. Leads (Query Forms & Subscribers)
Contact form submissions, newsletter subscriber list.
Tables: `query_forms`, `subscribes`

## 19. Dashboard / Reports (last — sab modules ke baad)
Sales overview, top products, order stats — inko baaki sab modules ka data chahiye is liye sab se aakhir mein.
