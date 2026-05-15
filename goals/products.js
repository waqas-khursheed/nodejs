// Product

// Level 1 (Master / Parent Tables)
// product_categories
// brands
// product_attributes
// product_tags
// size_charts

// Level 2
// products


// brand_id → brands
// category relation → assign_cat_to_products
// tags → assign_tag_to_products


// Pivot / Relationship Tables (Child of Products)
// 🥉 Level 3
// assign_cat_to_products
// assign_tag_to_products
// assign_attr_to_products
// product_cities
// product_galleries


// 5. Stock / Variation System
// Level 4
// stocks
// stock_items


// 🛒 6. Shopping System (Product ke baad dependents)
// Level 5
// carts
// wishlists
// reviews
// order_details

// 7. Order System (Final Layer)
// Level 6
// orders
// order_details
// order_galleries
// billing_details

// 7. Order System (Final Layer)
// Level 6
// orders
// order_details
// order_galleries
// billing_details

// SIMPLE GRAPH (Visual Structure)

//                 product_categories
//                         |
// brands -----> products <------ product_tags
//                  |
//      --------------------------------
//      |              |               |
// stocks        product_galleries   assign_cat_to_products
//      |
// stock_items

// products → carts
// products → wishlists
// products → reviews
// products → order_details → orders