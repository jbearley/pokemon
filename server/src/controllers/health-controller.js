const { getHealthMessage } = require(`../services/health-service`);

const healthCheck = (request, response) => response.status(200).json(getHealthMessage());

module.exports = { healthCheck };
