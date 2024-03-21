const { ServiceBusClient } = require('@azure/service-bus');
const config = require('config');
const logger = require('../logger/logger.util');

let connection;

async function connect() {
  try {
    connection = new ServiceBusClient(config.CONNECTION_STRING);
    logger.info('Service Bus Client: Connected');
  } catch (err) {
    logger.error(err);
  }
}

async function post({ data,date }) {
  const sender = connection.createSender(config.QUEUE_NAME);


  try {
    await sender.scheduleMessages(
      [
        {
          body: data,
          contentType: 'application/json',
        },
      ],
      new Date(Date.now() + date)
    );
    await sender.close();
  } catch (err) {
    logger.error(`Error in pushing messages to queue: ${err}`);
  }
}

const get = async () => {
  const receiver = connection.createReceiver(config.QUEUE_NAME);

  const processMessage = async (message) => {
    await receiver.completeMessage(message);
    const { body } = message;
     logger.info(`Data Triggered : ${body}`);
  };

  const processError = async (args) => {
    logger.error(
      `Error ${args.errorSource} occurred: `,
      args.error
    );
  };

  receiver.subscribe({
    processMessage,
    processError,
  });
};

const connectBus = async () => {
  await connect();
  get();
};

module.exports = {
  post,
  connectBus,
};
