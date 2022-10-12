import config from 'config';
import jwt from 'jsonwebtoken';

export function signJwt(
  object: object,
  keyName: 'accessToken.privateKey' | 'refreshToken.privateKey',
  options?: jwt.SignOptions | undefined
) {
  const signingKey = Buffer.from(config.get<string>(keyName), 'base64').toString('ascii');

  return jwt.sign(object, signingKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
}

export function verifyJwt(token: string, keyName: 'accessToken.publicKey' | 'refreshToken.publicKey') {
  const publicKey = Buffer.from(config.get<string>(keyName), 'base64').toString('ascii');

  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    console.error(e);
    return {
      valid: false,
      expired: e.message === 'jwt expired',
      decoded: null,
    };
  }
}
