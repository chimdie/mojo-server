import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash';
import SessionService from '@services/session.service';
import { verifyJwt } from '@utils/jwt.utils';

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');

  const refreshToken = get(req, 'headers.x-refresh');

  if (!accessToken) {
    return next();
  }

  const { decoded, expired } = verifyJwt(accessToken, 'accessToken.publicKey');

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    const newSession = new SessionService();
    const newAccessToken = await newSession.reIssueAccessToken({ refreshToken });

    if (newAccessToken) {
      res.setHeader('x-access-token', newAccessToken);
    }

    const result = verifyJwt(newAccessToken as string, 'accessToken.publicKey');

    res.locals.user = result.decoded;
    return next();
  }

  return next();
};

export default deserializeUser;
