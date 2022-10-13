import { get } from 'lodash';
import { autoInjectable } from 'tsyringe';
import { SessionDocumentI, UserDocumentI } from '@interfaces/document.interface';
import SessionModel from '@models/userSession.model';
import { verifyJwt, signJwt } from '@utils/jwt.utils';
import { ACCESS_TOKEN_TIME_TO_LEAVE } from 'src/config';
import BaseService from './base.service';
import UserService from './user.service';

@autoInjectable()
export default class SessionService extends BaseService<SessionDocumentI> {
  constructor(modelI?: SessionModel) {
    super(modelI!);
  }

  async reIssueAccessToken({ refreshToken }: { refreshToken: string }) {
    const { decoded } = verifyJwt(refreshToken, 'refreshToken.publicKey');

    if (!decoded || !get(decoded, 'session')) return false;

    const session = await this.model.findById(get(decoded, 'session'));

    if (!session || !session.valid) return false;

    // const user = await this.model.findUser(
    //   { _id: session.user },
    //   { lean: true }
    // );
    const userService = new UserService();
    const user = await userService.getById<UserDocumentI>(session.user, { lean: true });

    if (!user) return false;

    const accessToken = signJwt(
      { ...user, session: session._id },
      'accessToken.privateKey',
      { expiresIn: ACCESS_TOKEN_TIME_TO_LEAVE } // 15 minutes
    );

    return accessToken;
  }
}
