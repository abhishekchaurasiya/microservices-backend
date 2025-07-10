import app from "./app";
import "dotenv/config";

const PORT = process.env.PORT || 4000;

const appStart = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Gateway Server is running at port: ${PORT}`);
    });
  } catch (error) {
    console.log(`Failed to start application: ${error}`);
    process.exit(1);
  }
};
appStart();
