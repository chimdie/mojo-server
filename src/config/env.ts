import config from 'config';

export const SERVER_PORT = config.get('server.port') as number;
export const SERVER_HOST = config.get('server.host') as string;
export const SERVER_DB_URI = config.get('server.dbUri') as string;

export const ACCESS_TOKEN_PRIVATE_KEY = config.get('accessToken.privateKey') as string;
export const ACCESS_TOKEN_PUBLIC_KEY = config.get('accessToken.publicKey') as string;
export const ACCESS_TOKEN_TIME_TO_LEAVE = config.get('accessToken.accessTokenTtl') as string;

export const REFRESH_PRIVATE_KEY = config.get('refreshToken.privateKey') as string;
export const REFRESH_PUBLIC_KEY = config.get('refreshToken.publicKey') as string;
export const REFRESH_TOKEN_TIME_TO_LEAVE = config.get('refreshToken.refreshTokenTtl') as string;
