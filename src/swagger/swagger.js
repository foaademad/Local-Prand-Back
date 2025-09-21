const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
// const swaggerDocument = require('./swagger.json');
const swaggerDocument = YAML.load(`${__dirname}/swagger.yml`);

module.exports = (app) => {

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
