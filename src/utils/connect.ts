import mongoose from "mongoose";
import config from "config";
import log from "./logger";

function connect() {
  const dbUri = config.get("dbUri") as string;
  return mongoose
    .connect(dbUri, {})
    .then(() => {
      log.info("Database Connected successfully");
    })
    .catch((error) => {
      log.error("Database Error: ", error);
      process.exit(1);
    });
}

export const disconnect = ()  => {
  console.log(process.env.NODE_ENV)
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
