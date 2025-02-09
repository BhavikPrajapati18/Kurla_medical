import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.on("Error", (error) => {
      console.log("DB Connection failed in index.s file :-", error);
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on the PORT :- ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MONGO DB connection failed !!!", error);
  });
