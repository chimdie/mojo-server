import mongoose from 'mongoose';
import { SERVER_DB_URI } from 'src/config';
import log from './logger';

function connect() {
  return mongoose
    .connect(SERVER_DB_URI)
    .then(() => {
      log.info('Database Connected successfully');
    })
    .catch((error) => {
      log.error('Database Error: ', error);
      process.exit(1);
    });
}

export const disconnect = () => {
  if (process?.env?.NODE_ENV?.toString() == 'test') {
    return mongoose.connection.db.dropDatabase().then(() => {
      return mongoose.disconnect();
    });
  }

  return mongoose.disconnect();
};

export default connect;
