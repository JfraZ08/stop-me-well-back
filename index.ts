import "dotenv/config";
import cors = require('cors');
import express = require("express");
import { Sequelize, DataTypes } from "sequelize";
import bodyParser from "body-parser";
import { userRouter } from "./router/users";
import { authRouter } from "./router/auth";
import { gamesRouter } from "./router/games";
import { homeRouter } from "./router/home"


export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db/database.sqlite'
});

// sequelize.sync({ force: true });
sequelize.sync();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const apiRouter = express.Router();
apiRouter.use('/home', homeRouter );
apiRouter.use('/games', gamesRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/auth', authRouter);

app.use("/api", apiRouter);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`)
});