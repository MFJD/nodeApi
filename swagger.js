const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Management API System',
            version: '1.0.0',
            description: 'API documentation for Product management',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT', // Optional, you can specify if you're using JWT
                },
            },
        },
    },
    apis: ['./routes/*.js'], // Adjust according to where your routes are defined
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
// console.log(JSON.stringify(swaggerDocs, null, 2)); // Debugging line

module.exports = { swaggerUi, swaggerDocs };
