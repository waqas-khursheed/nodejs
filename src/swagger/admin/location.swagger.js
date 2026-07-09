/**
 * @openapi
 * components:
 *   schemas:
 *     Country:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 1 }
 *         country_code: { type: string, example: "PK" }
 *         country_name: { type: string, example: "Pakistan" }
 *     State:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 1 }
 *         name: { type: string, example: "Punjab" }
 *         country_id: { type: integer, example: 1 }
 *         country: { $ref: "#/components/schemas/Country" }
 *     City:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 1 }
 *         name: { type: string, example: "Lahore" }
 *         state_id: { type: integer, example: 1 }
 *         state: { $ref: "#/components/schemas/State" }
 *     GeoContinent:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 1 }
 *         name: { type: string, example: "Asia" }
 *     GeoSubContinent:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 1 }
 *         name: { type: string, example: "South Asia" }
 *         continent_id: { type: integer, example: 1 }
 *     GeoCountry:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 1 }
 *         name: { type: string, example: "Pakistan" }
 *         cca2: { type: string, example: "PK" }
 *         cca3: { type: string, example: "PAK" }
 *         ccn3: { type: integer, example: 586 }
 *         continent_id: { type: integer, example: 1 }
 *         sub_continent_id: { type: integer, example: 0, description: "0 = no sub-continent assigned" }
 *     GeoState:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 1 }
 *         name: { type: string, example: "Punjab" }
 *         country_id: { type: integer, example: 1 }
 *         hasc: { type: string, example: "PK.PB" }
 *         order_by: { type: integer, nullable: true }
 *     GeoCity:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 1 }
 *         name: { type: string, example: "Lahore" }
 *         country_id: { type: integer, example: 1 }
 *         state_id: { type: integer, example: 1 }
 *         zone_id: { type: integer, example: 0, description: "0 = no zone assigned" }
 *         latitude: { type: number, example: 31.5204 }
 *         longitude: { type: number, example: 74.3587 }
 *     GeoZone:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 1 }
 *         code: { type: string, example: "Z1" }
 *         name: { type: string, example: "Central Zone" }
 *     ProductCity:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 1 }
 *         product_id: { type: integer, example: 1 }
 *         city_id: { type: integer, example: 1 }
 *         city: { $ref: "#/components/schemas/City" }
 */

/**
 * @openapi
 * /api/admin/country/create:
 *   post:
 *     tags: [Admin Location]
 *     summary: Create a country
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [country_code, country_name]
 *             properties:
 *               country_code: { type: string, example: "PK" }
 *               country_name: { type: string, example: "Pakistan" }
 *     responses:
 *       201:
 *         description: Country created
 *         content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { $ref: "#/components/schemas/Country" } } }] } } }
 * /api/admin/country:
 *   get:
 *     tags: [Admin Location]
 *     summary: List countries
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - { in: query, name: page, schema: { type: integer, default: 1 } }
 *       - { in: query, name: limit, schema: { type: integer, default: 10 } }
 *       - { in: query, name: search, schema: { type: string } }
 *     responses:
 *       200:
 *         description: List of countries
 *         content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { type: object, properties: { countries: { type: array, items: { $ref: "#/components/schemas/Country" } }, meta: { type: object } } } } }] } } }
 * /api/admin/country/{id}:
 *   get:
 *     tags: [Admin Location]
 *     summary: Get a country
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200: { description: Found, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { $ref: "#/components/schemas/Country" } } }] } } } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 *   put:
 *     tags: [Admin Location]
 *     summary: Update a country
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     requestBody: { content: { application/json: { schema: { type: object, properties: { country_code: { type: string }, country_name: { type: string } } } } } }
 *     responses:
 *       200: { description: Updated, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { $ref: "#/components/schemas/Country" } } }] } } } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 *   delete:
 *     tags: [Admin Location]
 *     summary: Delete a country
 *     description: Blocked with 409 if the country still has states assigned to it.
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200: { description: Deleted, content: { application/json: { schema: { $ref: "#/components/schemas/SuccessResponse" } } } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 *       409: { description: Country still has states, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 */

/**
 * @openapi
 * /api/admin/state/create:
 *   post:
 *     tags: [Admin Location]
 *     summary: Create a state
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { type: object, required: [name, country_id], properties: { name: { type: string, example: "Punjab" }, country_id: { type: integer, example: 1 } } }
 *     responses:
 *       201: { description: State created, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { $ref: "#/components/schemas/State" } } }] } } } }
 *       422: { description: Country does not exist, content: { application/json: { schema: { $ref: "#/components/schemas/ValidationErrorResponse" } } } }
 * /api/admin/state:
 *   get:
 *     tags: [Admin Location]
 *     summary: List states (optionally filtered by country)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - { in: query, name: page, schema: { type: integer, default: 1 } }
 *       - { in: query, name: limit, schema: { type: integer, default: 10 } }
 *       - { in: query, name: search, schema: { type: string } }
 *       - { in: query, name: country_id, schema: { type: integer } }
 *     responses:
 *       200: { description: List of states, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { type: object, properties: { states: { type: array, items: { $ref: "#/components/schemas/State" } }, meta: { type: object } } } } }] } } } }
 * /api/admin/state/{id}:
 *   get:
 *     tags: [Admin Location]
 *     summary: Get a state
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200: { description: Found, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { $ref: "#/components/schemas/State" } } }] } } } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 *   put:
 *     tags: [Admin Location]
 *     summary: Update a state
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     requestBody: { content: { application/json: { schema: { type: object, properties: { name: { type: string }, country_id: { type: integer } } } } } }
 *     responses:
 *       200: { description: Updated, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { $ref: "#/components/schemas/State" } } }] } } } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 *   delete:
 *     tags: [Admin Location]
 *     summary: Delete a state
 *     description: Blocked with 409 if the state still has cities assigned to it.
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200: { description: Deleted, content: { application/json: { schema: { $ref: "#/components/schemas/SuccessResponse" } } } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 *       409: { description: State still has cities, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 */

/**
 * @openapi
 * /api/admin/city/create:
 *   post:
 *     tags: [Admin Location]
 *     summary: Create a city
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { type: object, required: [name, state_id], properties: { name: { type: string, example: "Lahore" }, state_id: { type: integer, example: 1 } } }
 *     responses:
 *       201: { description: City created, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { $ref: "#/components/schemas/City" } } }] } } } }
 *       422: { description: State does not exist, content: { application/json: { schema: { $ref: "#/components/schemas/ValidationErrorResponse" } } } }
 * /api/admin/city:
 *   get:
 *     tags: [Admin Location]
 *     summary: List cities (optionally filtered by state)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - { in: query, name: page, schema: { type: integer, default: 1 } }
 *       - { in: query, name: limit, schema: { type: integer, default: 10 } }
 *       - { in: query, name: search, schema: { type: string } }
 *       - { in: query, name: state_id, schema: { type: integer } }
 *     responses:
 *       200: { description: List of cities, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { type: object, properties: { cities: { type: array, items: { $ref: "#/components/schemas/City" } }, meta: { type: object } } } } }] } } } }
 * /api/admin/city/{id}:
 *   get:
 *     tags: [Admin Location]
 *     summary: Get a city
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200: { description: Found, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { $ref: "#/components/schemas/City" } } }] } } } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 *   put:
 *     tags: [Admin Location]
 *     summary: Update a city
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     requestBody: { content: { application/json: { schema: { type: object, properties: { name: { type: string }, state_id: { type: integer } } } } } }
 *     responses:
 *       200: { description: Updated, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { $ref: "#/components/schemas/City" } } }] } } } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 *   delete:
 *     tags: [Admin Location]
 *     summary: Delete a city
 *     description: Blocked with 409 if the city still has products assigned to it.
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200: { description: Deleted, content: { application/json: { schema: { $ref: "#/components/schemas/SuccessResponse" } } } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 *       409: { description: City still has products, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 */

/**
 * @openapi
 * /api/admin/geo-continent/create:
 *   post:
 *     tags: [Admin Location]
 *     summary: Create a geo continent
 *     security: [{ bearerAuth: [] }]
 *     requestBody: { required: true, content: { application/json: { schema: { type: object, required: [name], properties: { name: { type: string, example: "Asia" } } } } } }
 *     responses:
 *       201: { description: Created, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { $ref: "#/components/schemas/GeoContinent" } } }] } } } }
 * /api/admin/geo-continent:
 *   get:
 *     tags: [Admin Location]
 *     summary: List geo continents
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: query, name: page, schema: { type: integer, default: 1 } }, { in: query, name: limit, schema: { type: integer, default: 10 } }, { in: query, name: search, schema: { type: string } }]
 *     responses:
 *       200: { description: List, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { type: object, properties: { continents: { type: array, items: { $ref: "#/components/schemas/GeoContinent" } }, meta: { type: object } } } } }] } } } }
 * /api/admin/geo-continent/{id}:
 *   get:
 *     tags: [Admin Location]
 *     summary: Get a geo continent
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200: { description: Found, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { $ref: "#/components/schemas/GeoContinent" } } }] } } } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 *   put:
 *     tags: [Admin Location]
 *     summary: Update a geo continent
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     requestBody: { content: { application/json: { schema: { type: object, properties: { name: { type: string } } } } } }
 *     responses:
 *       200: { description: Updated, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { $ref: "#/components/schemas/GeoContinent" } } }] } } } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 *   delete:
 *     tags: [Admin Location]
 *     summary: Delete a geo continent
 *     description: Blocked with 409 if it still has geo countries assigned to it.
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200: { description: Deleted, content: { application/json: { schema: { $ref: "#/components/schemas/SuccessResponse" } } } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 *       409: { description: Still has countries, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 */

/**
 * @openapi
 * /api/admin/geo-sub-continent/create:
 *   post:
 *     tags: [Admin Location]
 *     summary: Create a geo sub-continent
 *     security: [{ bearerAuth: [] }]
 *     requestBody: { required: true, content: { application/json: { schema: { type: object, required: [name, continent_id], properties: { name: { type: string, example: "South Asia" }, continent_id: { type: integer, example: 1 } } } } } }
 *     responses:
 *       201: { description: Created, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { $ref: "#/components/schemas/GeoSubContinent" } } }] } } } }
 *       422: { description: Continent does not exist, content: { application/json: { schema: { $ref: "#/components/schemas/ValidationErrorResponse" } } } }
 * /api/admin/geo-sub-continent:
 *   get:
 *     tags: [Admin Location]
 *     summary: List geo sub-continents (optionally filtered by continent)
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: query, name: page, schema: { type: integer, default: 1 } }, { in: query, name: limit, schema: { type: integer, default: 10 } }, { in: query, name: continent_id, schema: { type: integer } }]
 *     responses:
 *       200: { description: List, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { type: object, properties: { subContinents: { type: array, items: { $ref: "#/components/schemas/GeoSubContinent" } }, meta: { type: object } } } } }] } } } }
 * /api/admin/geo-sub-continent/{id}:
 *   get:
 *     tags: [Admin Location]
 *     summary: Get a geo sub-continent
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200: { description: Found, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { $ref: "#/components/schemas/GeoSubContinent" } } }] } } } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 *   put:
 *     tags: [Admin Location]
 *     summary: Update a geo sub-continent
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     requestBody: { content: { application/json: { schema: { type: object, properties: { name: { type: string }, continent_id: { type: integer } } } } } }
 *     responses:
 *       200: { description: Updated, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { $ref: "#/components/schemas/GeoSubContinent" } } }] } } } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 *   delete:
 *     tags: [Admin Location]
 *     summary: Delete a geo sub-continent
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200: { description: Deleted, content: { application/json: { schema: { $ref: "#/components/schemas/SuccessResponse" } } } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 */

/**
 * @openapi
 * /api/admin/geo-country/create:
 *   post:
 *     tags: [Admin Location]
 *     summary: Create a geo country
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { type: object, required: [name, cca2, cca3, ccn3, continent_id], properties: { name: { type: string, example: "Pakistan" }, cca2: { type: string, example: "PK" }, cca3: { type: string, example: "PAK" }, ccn3: { type: integer, example: 586 }, continent_id: { type: integer, example: 1 }, sub_continent_id: { type: integer, example: 0, default: 0 } } }
 *     responses:
 *       201: { description: Created, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { $ref: "#/components/schemas/GeoCountry" } } }] } } } }
 *       422: { description: Continent/sub-continent does not exist, content: { application/json: { schema: { $ref: "#/components/schemas/ValidationErrorResponse" } } } }
 * /api/admin/geo-country:
 *   get:
 *     tags: [Admin Location]
 *     summary: List geo countries (optionally filtered by continent)
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: query, name: page, schema: { type: integer, default: 1 } }, { in: query, name: limit, schema: { type: integer, default: 10 } }, { in: query, name: search, schema: { type: string } }, { in: query, name: continent_id, schema: { type: integer } }]
 *     responses:
 *       200: { description: List, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { type: object, properties: { geoCountries: { type: array, items: { $ref: "#/components/schemas/GeoCountry" } }, meta: { type: object } } } } }] } } } }
 * /api/admin/geo-country/{id}:
 *   get:
 *     tags: [Admin Location]
 *     summary: Get a geo country
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200: { description: Found, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { $ref: "#/components/schemas/GeoCountry" } } }] } } } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 *   put:
 *     tags: [Admin Location]
 *     summary: Update a geo country
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     requestBody: { content: { application/json: { schema: { type: object, properties: { name: { type: string }, cca2: { type: string }, cca3: { type: string }, ccn3: { type: integer }, continent_id: { type: integer }, sub_continent_id: { type: integer } } } } } }
 *     responses:
 *       200: { description: Updated, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { $ref: "#/components/schemas/GeoCountry" } } }] } } } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 *   delete:
 *     tags: [Admin Location]
 *     summary: Delete a geo country
 *     description: Blocked with 409 if it still has geo states/cities assigned to it.
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200: { description: Deleted, content: { application/json: { schema: { $ref: "#/components/schemas/SuccessResponse" } } } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 *       409: { description: Still has states/cities, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 */

/**
 * @openapi
 * /api/admin/geo-state/create:
 *   post:
 *     tags: [Admin Location]
 *     summary: Create a geo state
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { type: object, required: [name, country_id, hasc], properties: { name: { type: string, example: "Punjab" }, country_id: { type: integer, example: 1 }, hasc: { type: string, example: "PK.PB" }, order_by: { type: integer } } }
 *     responses:
 *       201: { description: Created, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { $ref: "#/components/schemas/GeoState" } } }] } } } }
 *       422: { description: Geo country does not exist, content: { application/json: { schema: { $ref: "#/components/schemas/ValidationErrorResponse" } } } }
 * /api/admin/geo-state:
 *   get:
 *     tags: [Admin Location]
 *     summary: List geo states (optionally filtered by country)
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: query, name: page, schema: { type: integer, default: 1 } }, { in: query, name: limit, schema: { type: integer, default: 10 } }, { in: query, name: search, schema: { type: string } }, { in: query, name: country_id, schema: { type: integer } }]
 *     responses:
 *       200: { description: List, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { type: object, properties: { geoStates: { type: array, items: { $ref: "#/components/schemas/GeoState" } }, meta: { type: object } } } } }] } } } }
 * /api/admin/geo-state/{id}:
 *   get:
 *     tags: [Admin Location]
 *     summary: Get a geo state
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200: { description: Found, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { $ref: "#/components/schemas/GeoState" } } }] } } } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 *   put:
 *     tags: [Admin Location]
 *     summary: Update a geo state
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     requestBody: { content: { application/json: { schema: { type: object, properties: { name: { type: string }, country_id: { type: integer }, hasc: { type: string }, order_by: { type: integer } } } } } }
 *     responses:
 *       200: { description: Updated, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { $ref: "#/components/schemas/GeoState" } } }] } } } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 *   delete:
 *     tags: [Admin Location]
 *     summary: Delete a geo state
 *     description: Blocked with 409 if it still has geo cities assigned to it.
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200: { description: Deleted, content: { application/json: { schema: { $ref: "#/components/schemas/SuccessResponse" } } } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 *       409: { description: Still has cities, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 */

/**
 * @openapi
 * /api/admin/geo-city/create:
 *   post:
 *     tags: [Admin Location]
 *     summary: Create a geo city
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { type: object, required: [name, country_id, state_id], properties: { name: { type: string, example: "Lahore" }, country_id: { type: integer, example: 1 }, state_id: { type: integer, example: 1 }, zone_id: { type: integer, example: 0, default: 0 }, latitude: { type: number, example: 31.5204 }, longitude: { type: number, example: 74.3587 } } }
 *     responses:
 *       201: { description: Created, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { $ref: "#/components/schemas/GeoCity" } } }] } } } }
 *       422: { description: Country/state/zone does not exist, content: { application/json: { schema: { $ref: "#/components/schemas/ValidationErrorResponse" } } } }
 * /api/admin/geo-city:
 *   get:
 *     tags: [Admin Location]
 *     summary: List geo cities (optionally filtered by country/state)
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: query, name: page, schema: { type: integer, default: 1 } }, { in: query, name: limit, schema: { type: integer, default: 10 } }, { in: query, name: search, schema: { type: string } }, { in: query, name: country_id, schema: { type: integer } }, { in: query, name: state_id, schema: { type: integer } }]
 *     responses:
 *       200: { description: List, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { type: object, properties: { geoCities: { type: array, items: { $ref: "#/components/schemas/GeoCity" } }, meta: { type: object } } } } }] } } } }
 * /api/admin/geo-city/{id}:
 *   get:
 *     tags: [Admin Location]
 *     summary: Get a geo city
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200: { description: Found, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { $ref: "#/components/schemas/GeoCity" } } }] } } } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 *   put:
 *     tags: [Admin Location]
 *     summary: Update a geo city
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     requestBody: { content: { application/json: { schema: { type: object, properties: { name: { type: string }, country_id: { type: integer }, state_id: { type: integer }, zone_id: { type: integer }, latitude: { type: number }, longitude: { type: number } } } } } }
 *     responses:
 *       200: { description: Updated, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { $ref: "#/components/schemas/GeoCity" } } }] } } } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 *   delete:
 *     tags: [Admin Location]
 *     summary: Delete a geo city
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200: { description: Deleted, content: { application/json: { schema: { $ref: "#/components/schemas/SuccessResponse" } } } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 */

/**
 * @openapi
 * /api/admin/geo-zone/create:
 *   post:
 *     tags: [Admin Location]
 *     summary: Create a delivery zone
 *     security: [{ bearerAuth: [] }]
 *     requestBody: { required: true, content: { application/json: { schema: { type: object, required: [code, name], properties: { code: { type: string, example: "Z1" }, name: { type: string, example: "Central Zone" } } } } } }
 *     responses:
 *       201: { description: Created, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { $ref: "#/components/schemas/GeoZone" } } }] } } } }
 * /api/admin/geo-zone:
 *   get:
 *     tags: [Admin Location]
 *     summary: List delivery zones
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: query, name: page, schema: { type: integer, default: 1 } }, { in: query, name: limit, schema: { type: integer, default: 10 } }, { in: query, name: search, schema: { type: string } }]
 *     responses:
 *       200: { description: List, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { type: object, properties: { zones: { type: array, items: { $ref: "#/components/schemas/GeoZone" } }, meta: { type: object } } } } }] } } } }
 * /api/admin/geo-zone/{id}:
 *   get:
 *     tags: [Admin Location]
 *     summary: Get a delivery zone
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200: { description: Found, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { $ref: "#/components/schemas/GeoZone" } } }] } } } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 *   put:
 *     tags: [Admin Location]
 *     summary: Update a delivery zone
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     requestBody: { content: { application/json: { schema: { type: object, properties: { code: { type: string }, name: { type: string } } } } } }
 *     responses:
 *       200: { description: Updated, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { $ref: "#/components/schemas/GeoZone" } } }] } } } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 *   delete:
 *     tags: [Admin Location]
 *     summary: Delete a delivery zone
 *     description: Blocked with 409 if geo cities still reference it.
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200: { description: Deleted, content: { application/json: { schema: { $ref: "#/components/schemas/SuccessResponse" } } } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 *       409: { description: Zone still referenced, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 */

/**
 * @openapi
 * /api/admin/product-city/{productId}:
 *   get:
 *     tags: [Admin Location]
 *     summary: List cities where a product is available
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: productId, required: true, schema: { type: integer } }]
 *     responses:
 *       200:
 *         description: Assigned cities
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         productCities:
 *                           type: array
 *                           items: { $ref: "#/components/schemas/ProductCity" }
 *       404:
 *         description: Product not found
 *         content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } }
 *   put:
 *     tags: [Admin Location]
 *     summary: Replace the set of cities a product is available in
 *     description: Full sync — pass the complete list of city IDs; an empty array removes all availability restrictions data.
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: productId, required: true, schema: { type: integer } }]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               city_ids:
 *                 type: array
 *                 items: { type: integer }
 *                 example: [1, 2, 3]
 *     responses:
 *       200:
 *         description: Cities synced
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         productCities:
 *                           type: array
 *                           items: { $ref: "#/components/schemas/ProductCity" }
 *       404:
 *         description: Product not found
 *         content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } }
 *       422:
 *         description: One or more cities do not exist
 *         content: { application/json: { schema: { $ref: "#/components/schemas/ValidationErrorResponse" } } }
 */
