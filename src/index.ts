import express from "express";
import { authRoutes } from './router/auth';
import { userRoutes } from './router/users';
import { gamesRoutes }from './router/games';
import { Sequelize } from "sequelize";
import  bodyParser  from "body-parser";
import cors = require("cors");
import { Server } from "http";

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db/database.sqlite'
  });


sequelize.sync();

const server = express();
server.use(cors());
server.use(bodyParser.json());

const apiRouter = express.Router();
apiRouter.use('/auth', authRoutes);
apiRouter.use('games', gamesRoutes );
apiRouter.use('/users', userRoutes);

server.use("/api", apiRouter);

server.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}!`)
  });


