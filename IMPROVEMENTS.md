# Backend — Areas That Need Improvement

This file started as a code-review snapshot of `backed/` and has since been updated to reflect
what was actually implemented. Payment gateway integration was excluded throughout, per instruction
— nothing here touches a real payment provider.

## ✅ Status: most of this has been implemented

New migrations were written and run against the dev DB, models were updated to match, and the
service/controller layer was reworked accordingly. Each item below is marked **✅ Done**,
**◐ Partially done**, or **⏳ Not done** with a note on what actually happened and why.

---

## 1. Database schema

- **✅ Done — Indexes added.** New migrations add indexes on `products.slug/status/brand_id`,
  `orders.user_id/status/payment_status/order_number` (the last one unique), `reviews.product_id/status`,
  `carts.user_id/device_id`, `wishlists.(user_id, product_id)`, `assign_cat_to_products.product_id/category_id`.

- **✅ Done — Unique constraints added.** `coupons.code`, `products.sku`, `product_categories.slug`,
  `brands.slug`, `stocks.(product_id, color_id, size_id, fitting_id)`, and
  `used_coupons.(user_id, coupon_id)` all now have DB-level unique indexes (previously only
  `users.email`/`admins.email`/`subscribes.email` did).

- **◐ Partially done — Soft deletes.** `Order` is now `paranoid: true` (has `deleted_at`) — deleting
  an order no longer erases order details/billing history. Products, coupons, stocks, reviews, and
  notifications are still hard-deleted; only orders were converted, since that's where losing
  history actually matters for revenue/dispute records.

- **◐ Partially done — Timestamps.** `Order` now has a real Sequelize-managed `updated_at` (was
  missing entirely) and is `paranoid`. The `stocks.update_at` / `web_settings.update_at` column-name
  typo (missing the "d") is fixed to `updated_at` on both tables and both models. `Coupon`,
  `Review`, `Wishlist`, `Notification` still use `timestamps: false` as before — left alone since
  changing them wasn't load-bearing for the fixes above.

- **◐ Partially done — Audit trail.** No general `created_by`/`updated_by` was added across the
  schema (would touch every table and every write path — out of scope for this pass). What *was*
  added: `order_status_histories` records every `status`/`payment_status` change with the previous
  value, new value, and which admin made the change (see §4).

- **⏳ Not done — `Order.status` as a raw INTEGER.** Left as-is; converting it to an enum/lookup
  table would be a bigger, separate migration (needs agreement on what each status code should mean
  across the whole app first).

- **✅ Done — Exchange ↔ Order link.** `exchanges.order_id` (FK to `orders`) was added; the service
  now looks up the order by `order_number`, 404s if it doesn't exist, and rejects (403) if a
  provided email doesn't match the order's account/billing email.

---

## 2. Data integrity

- **✅ Done — Transactions.** `sequelize.transaction()` now wraps: order placement (stock decrement
  → order → order details → billing → coupon usage → reward deduction → cart clear, all atomic),
  product create/update (product + category sync + gallery), and coupon create/update (coupon +
  category sync). A failure at any step rolls back the whole thing instead of leaving partial data.

- **✅ Done — Stock/reward race condition.** Checkout now does an atomic conditional
  `UPDATE ... WHERE stock_qty >= :qty` (and the equivalent for `Product.quantity` and
  `UserReward.rewards`) instead of read-then-write. Two concurrent checkouts for the last unit can
  no longer both succeed — the second one's conditional update affects 0 rows and the whole order
  transaction rolls back with `INSUFFICIENT_STOCK`/`REWARDS_BALANCE_CHANGED`.

---

## 3. Code quality / architecture

- **✅ Done — Error-handling duplication.** `shared/utils/controllerErrorHandler.js` now exports
  `createErrorHandler(errorMap)`; all ~25 controllers that had a hand-rolled `handleServiceError`
  now do `const handleServiceError = createErrorHandler(errorMap);` — each module keeps its own
  domain-specific `errorMap`, only the response-writing mechanism is shared.

- **✅ Done — N+1 queries.** Cart pricing now batch-fetches all `Stock` rows in one query. Checkout
  batch-fetches Stock/Product once and reuses that map when building order-detail rows (previously
  fetched a third time). Category tree building now fetches all children in one
  `parent_id IN (...)` query instead of one query per top-level category.

- **✅ Done — Duplicated coupon-eligibility logic.** Extracted into
  `coupons/services/couponEligibility.service.js` (`resolveEligibleSubtotal`,
  `assertCouponIsUsable`), now used by both the coupon-preview endpoint and checkout — can't drift
  apart anymore.

- **✅ Done — Duplicated image-cleanup logic.** `shared/utils/fileUtils.js` now exports
  `scheduleImageReplacement(folder, oldFilename, newFilename)`; applied everywhere the
  "delete the old file if a new one was uploaded" branch was previously repeated inline (products,
  brands, categories, attribute items, slides, common pages, web settings, and the shared banner
  image-resource factory).

- **⏳ Not done — Joi `allowUnknown: true`.** Left as-is; tightening this to `stripUnknown` touches
  every validated route and risks breaking existing clients that send extra fields — flagged but
  not changed in this pass.

---

## 4. Missing or half-built features

- **✅ Done (via §2's atomic update) — Stock overselling under concurrency.** No separate "reserved
  quantity" system was added, but the actual bug (two concurrent checkouts both succeeding) is
  fixed by the atomic conditional decrement.

- **✅ Done — Order status history.** New `order_status_histories` table + `OrderStatusHistory`
  model; every admin status/payment-status change now writes a history row (old value, new value,
  admin id, timestamp) in the same transaction as the update.

- **✅ Done — Coupon fields.** Added `expires_at`, `usage_limit`, `used_count`, `min_order_amount` to
  the `Coupon` model/migration/validation. Checkout and coupon-preview both now enforce expiry,
  usage limit (atomically — see §2), and minimum order amount, with dedicated error codes
  (`COUPON_EXPIRED`, `COUPON_USAGE_LIMIT_REACHED`, `COUPON_MIN_ORDER_NOT_MET`).

- **✅ Done — Review verified-purchase.** `reviews.is_verified_purchase` added; set automatically
  when the reviewing user has a `payment_status: "paid"` order containing that product.

- **◐ Partially done — Notifications.** `shared/services/notifier.service.js` (`notifyAdmins`) now
  actually creates rows — wired into order placement, new review submission, and new contact-form
  messages, so the admin notification feed is no longer entirely empty. Still no external
  email/SMS/push delivery for these — they're in-app/DB notifications only, and there's still no
  user-facing notifications endpoint (that would be new scope, not a fix to existing code).

- **✅ Done — Password reset.** `shared/utils/mailer.js` (nodemailer) now actually sends the OTP
  email. When `SMTP_HOST` isn't configured (default in a fresh `.env`), it logs the email to the
  console instead of silently discarding it, so the flow is still testable without real SMTP
  credentials — set `SMTP_HOST`/`PORT`/`USER`/`PASS` in `.env` to send for real.

- **✅ Done — Image resize/compression.** `shared/middleware/imageResize.js` (sharp) now runs after
  every upload; anything wider than 1600px is downscaled in place. Animated GIFs are intentionally
  skipped (sharp would collapse them to a single frame).

- **✅ Done — Full-text search.** Added a MySQL `FULLTEXT` index on `products.(title, short_desc)`
  and `shared/utils/fullTextSearch.js` builds a sanitized `MATCH ... AGAINST (... IN BOOLEAN MODE)`
  query (with `*` prefix matching so partial/"type as you search" queries still work), replacing
  the old leading-wildcard `LIKE '%term%'` which couldn't use any index.

- **◐ Partially done — Automated tests.** Jest is now installed and configured for this project's
  native-ESM setup (`npm test`), with 22 passing unit tests covering pure business logic
  (`computeUnitPrice`, `getPagination`/`buildPaginationMeta`, `assertCouponIsUsable`). This is a
  starting point, not full coverage — no integration tests against a real/test DB were added (that
  needs a separate test-database setup decision).

- **✅ Done — Centralized logging.** `shared/utils/logger.js` (winston) replaces the ~9 raw
  `console.log`/`console.error` calls in bootstrap code; `morgan` now logs every HTTP request
  through the same logger; unexpected (non-operational) errors are logged with a stack trace in the
  global error handler.

- **Not actually a gap — Swagger for `locations`.** Re-checked during implementation:
  `src/swagger/admin/location.swagger.js` already exists and documents the module thoroughly (622
  lines). The original review's claim here was a false positive.

- **⏳ Not done — Dead schema columns (`email_verified_at`, `provider_id`/`provider_name`).** These
  are unimplemented *features* (email verification, social login), not bugs in existing code —
  building them out is new scope, not something to "fix" in this pass.

---

## 5. Security

- **✅ Done — CORS tightened.** Explicit origin allow-list via `ALLOWED_ORIGINS` in `.env`
  (comma-separated; defaults to the local admin/user frontend dev ports) instead of the previous
  `cors()` wildcard default. Disallowed browser origins get no `Access-Control-Allow-Origin` header
  (browser blocks reading the response) rather than the request erroring out.

- **✅ Done — Global rate limiter enabled.** `app.use(apiLimiter)` is no longer commented out —
  every route now has the 300 req/15 min general limit on top of the existing 10 req/15 min
  `authLimiter` on login/register/password-reset.

- **◐ Partially done — JWT expiry.** Now configurable via `JWT_EXPIRES_IN` in `.env` (defaults to
  the previous `1d`) instead of hardcoded in source. No refresh-token mechanism or token
  revocation/blacklist was added — that's a bigger feature, not a config fix.

- **⏳ Not done — HTTPS enforcement, tailored Helmet/CSP config.** Left as defaults; HTTPS
  termination is normally an infra/reverse-proxy concern rather than application code, and the
  existing Helmet defaults are a reasonable baseline.

**Already fine, confirmed during this pass (no action needed):** admin/user auth middleware is
consistently applied, no raw/unparameterized SQL exists anywhere, password hashing uses bcrypt with
a reasonable cost factor, no secrets are hardcoded in source, and request body size limits are
configured sensibly.

---

## What's genuinely left, if you want to keep going

1. Joi `stripUnknown` instead of `allowUnknown` (needs care — check no client relies on extra fields being silently accepted).
2. Soft-delete + audit fields on more tables than just `orders`, if that matters for your use case.
3. `Order.status` as an enum instead of a raw integer.
4. Real integration tests against a test database (the current Jest setup only covers pure logic).
5. JWT refresh-token flow / server-side logout & revocation.
6. Email verification and social login (the DB columns already exist, unused).
7. External delivery (email/push) for the notifications that now get created in-app.
