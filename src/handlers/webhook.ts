import { APIInteraction } from 'discord-api-types';
import { FastifyRequest, RouteHandlerMethod } from 'fastify';
import nacl from 'tweetnacl';
import config from '../util/config';
import { handleInteraction } from './interaction';

function isVerified(req: FastifyRequest) {
  try {
    return nacl.sign.detached.verify(
      Buffer.concat([
        Buffer.from(req.headers['x-signature-timestamp'].toString()),
        req.rawBody as Buffer,
      ]),
      Buffer.from(req.headers['x-signature-ed25519'].toString(), 'hex'),
      Buffer.from(config.publicKey, 'hex')
    );
  } catch (_err) {
    return false;
  }
}

export const handleWebhook: RouteHandlerMethod = async (req, res) => {
  if (!isVerified(req)) {
    return res.status(401).send('invalid request signature');
  }

  const resp = handleInteraction(req.body as APIInteraction);
  return res.status(200).send(resp);
};
