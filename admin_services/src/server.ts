import app from "./app";
import { port } from "./config/config";
import dbService from "./database/database";
import Logger from "./utils/Logger";

const appStart = async () => {
  try {
    await dbService.connect();
    app.listen(port, () => {
      Logger.info(`Server is running at port: ${port}`);
    });
  } catch (error) {
    Logger.error(`Failed to start application: ${error}`);
    process.exit(1);
  }
};

appStart();
