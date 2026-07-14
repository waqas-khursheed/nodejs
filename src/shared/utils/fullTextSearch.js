import { Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

// Product search used to be a leading-wildcard `LIKE '%term%'`, which can't
// use any index. `products_fulltext_search` (see the migration) is a MySQL
// FULLTEXT index on (title, short_desc) — this builds the matching
// `MATCH ... AGAINST (... IN BOOLEAN MODE)` clause.
//
// Boolean mode is used (not natural language mode) so short/partial terms
// still match via a trailing `*` wildcard — natural language mode has no
// prefix matching, which would regress "type as you search" UX. Boolean
// mode's special operators (+-<>()~*"@) are stripped from user input first
// so the search phrase can't accidentally form invalid or unintended
// operator syntax, and the final string is passed through `sequelize.escape`
// (not raw string interpolation) before being embedded in the literal.
export const buildProductSearchCondition = (searchTerm) => {
  const words = searchTerm
    .replace(/[+\-<>()~*"@]/g, " ")
    .trim()
    .split(/\s+/)
    .filter((word) => word.length >= 2);

  if (!words.length) return null;

  const booleanQuery = words.map((word) => `+${word}*`).join(" ");

  // Qualified with the Sequelize model alias ("Product", not the "products"
  // table name — Sequelize aliases the root table as \`products\` AS
  // \`Product\` in the generated SQL). The product list query joins in
  // categories/brand/etc, some of which also have a `title` column, so an
  // unqualified `title` is ambiguous to MySQL once those joins are present.
  return Sequelize.literal(
    `MATCH (\`Product\`.\`title\`, \`Product\`.\`short_desc\`) AGAINST (${sequelize.escape(booleanQuery)} IN BOOLEAN MODE)`
  );
};
