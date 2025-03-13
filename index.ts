import express from "express";
import cors from "cors";
import { config } from "dotenv";
import errorHandler from "./src/utils/utils.error-handler";
config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.use(errorHandler);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
