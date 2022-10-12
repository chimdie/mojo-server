import { Request, Response } from 'express';
import { verify } from 'argon2';
import { autoInjectable } from 'tsyringe';
import { UserDocumentI } from '@interfaces/document.interface';
import { CreateSessionInput } from '@schemas/index';
import { signJwt } from '@utils/jwt.utils';
import { ACCESS_TOKEN_TIME_TO_LEAVE, REFRESH_TOKEN_TIME_TO_LEAVE } from 'src/config';
import SessionService from '../services/session.service';
import UserService from '../services/user.service';
import BaseController from './base.controller';

@autoInjectable()
export default class SessionController extends BaseController {
  constructor(service?: SessionService) {
    super(service!);
  }

  login = async (req: Request<CreateSessionInput['body']>, res: Response) => {
    // let group = new GroupService();

    const userService = new UserService();

    const user = await userService.getOne<UserDocumentI>({
      emailAddress: req.body.emailAddress,
    });

    if (user && user._id) {
      const { password } = req.body;
      const hashedPassword = user.password;

      const isPasswordCorrect = await verify(hashedPassword, password);

      if (isPasswordCorrect) {
        const session = await this.service.post({
          user: user._id,
          userAgent: req.get('user-agent') || '',
        });

        const sessionPayload = {
          fullName: user.fullName,
          emailAddress: user.emailAddress,
          session: session._id,
        };
        const accessToken = signJwt(
          sessionPayload,
          'accessToken.privateKey',
          { expiresIn: ACCESS_TOKEN_TIME_TO_LEAVE } // 15 minutes,
        );

        // create a refresh token
        const refreshToken = signJwt(
          sessionPayload,
          'refreshToken.privateKey',
          { expiresIn: REFRESH_TOKEN_TIME_TO_LEAVE } // 15 minutes
        );
        return res.status(200).json({ user, accessToken, refreshToken });
      }

      return res.status(401).send({
        message: 'There is no user with this email address or password',
      });
    }
    return res.status(401).send({
      message: 'There is no user with this email address or password',
    });
  };
}
