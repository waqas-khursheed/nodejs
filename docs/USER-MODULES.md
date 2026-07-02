# User-Side Modules — Build Order

Customer-facing modules, sequence dependency ke hisaab se (upar wala pehle banana hai, kyunke neechay wale usi par depend karte hain).

## 1. Auth ✅ (already built)
Register, login, password reset (OTP via `reset_password_codes`).
Tables: `users`, `password_resets`, `reset_password_codes`

## 2. Categories (browse)
Category listing, category tree (parent/child), category detail page.
Tables: `product_categories`

## 3. Brands (browse)
Brand listing, brand detail page.
Tables: `brands`

## 4. Products (core catalog)
Product listing, detail page, search, filters (by category/brand/price), variations (size/color/fitting via attributes), stock/price.
Tables: `products`, `product_attributes`, `attribute_items`, `assign_attr_to_products`, `assign_cat_to_products`, `product_galleries`, `stocks`, `product_tags`, `assign_tag_to_products`

## 5. Reviews
Product par rating/review dena, apni reviews dekhna.
Tables: `reviews`

## 6. Wishlist
Product save/remove, wishlist listing.
Tables: `wishlists`

## 7. Cart
Add/remove/update qty, guest cart (device_id/user_ip) + logged-in user cart merge.
Tables: `carts`

## 8. Addresses
Shipping/billing address add/edit/list.
Tables: `user_addresses`, `countries`, `states`, `cities`

## 9. Coupons (apply)
Cart/checkout par coupon code apply karna, validation.
Tables: `coupons`, `random_coupons`, `used_coupons`, `meta_coupon_categories`

## 10. Checkout / Orders
Order place karna, order history, order detail, order tracking status.
Tables: `orders`, `order_details`, `order_galleries`, `billing_details`

## 11. Rewards
Order se points earn karna, redeem karna.
Tables: `user_rewards`, `reward_settings`, `rewards_earning_method`

## 12. Notifications
User ke liye order-update / offer notifications.
Tables: `notifications`

## 13. Exchanges
Order return/exchange request.
Tables: `exchanges`

## 14. Homepage / Content (CMS-driven)
Slides, banners, FAQs, static pages (about/contact/terms).
Tables: `slides`, `application_slides`, `home_banners`, `application_home_banners`, `side_banners`, `mobile_sliders`, `faqs`, `faq_categories`, `common_pages`, `contact_us_page`

## 15. Subscribe & Contact
Newsletter subscribe, contact/query form submit.
Tables: `subscribes`, `query_forms`

## 16. Payment (card discounts)
Card-based discount lookup at checkout (bank/card type selection).
Tables: `banks`, `card_categories`, `card_types`, `card_details`, `mobile_card`
