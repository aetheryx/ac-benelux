import fastify from 'fastify';
import fastifyRawBody from 'fastify-raw-body';
import { Logger } from '@acbot/util/Logger';
import config from '@acbot/util/config';
import { handleWebhook } from './handlers/webhook';

const app = fastify();
const logger = new Logger('http');

app.register(fastifyRawBody, {
  field: 'rawBody',
  encoding: false,
});

app.post('/webhook', {}, handleWebhook);

app.listen(config.listen, () => {
  logger.info('listening');
});
