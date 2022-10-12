import mongoose from "mongoose";
import config from "config";
import log from "./logger";
import { SERVER_DB_URI } from "src/config";

function connect() {

  return mongoose
    .connect(SERVER_DB_URI)
    .then(() => {
      log.info("Database Connected successfully");
    })
    .catch((error) => {
      log.error("Database Error: ", error);
      process.exit(1);
    });
}

export const disconnect = ()  => {
    if(process?.env?.NODE_ENV?.toString() == "test"){
      return mongoose.connection.db.dropDatabase().then(() => {
        return mongoose.disconnect()
      
      })
    }
  else{
    return mongoose.disconnect()
  }
}


export default connect;
