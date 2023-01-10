const config = require('config');

process.env.TZ = 'Asia/Kolkata';

const logger = require('./util/logger/logger.util');
require('./util/axios');

async function bootstrap() {
    const database = require('./util/database');
    let sequelize;
    try {
        sequelize = await database.connectDB();
    } catch (err) {
        logger.error(err);
    }

    const app = require('./app');
    app.listen(config.APP.PORT, () =>
        logger.info(`server running on port ${config.APP.PORT}`)
    );

    process.on('SIGINT', async () => {
        if (sequelize) sequelize.close();
        process.exit();
    });
}

bootstrap();
