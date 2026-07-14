'use strict';

// Project uses native ESM ("type": "module" in package.json) with no
// TypeScript/JSX, so no babel transform is needed or configured — tests run
// directly under Node's experimental VM modules support (see the "test"
// script in package.json).
module.exports = {
  testEnvironment: 'node',
  transform: {},
  testMatch: ['**/tests/**/*.test.js'],
};
