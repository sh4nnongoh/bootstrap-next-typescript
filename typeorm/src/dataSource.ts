import "reflect-metadata";
import { DataSource } from "typeorm";
export default new DataSource({
  type: "sqlite",
  database: "data/db.sqlite",
  synchronize: true,
  logging: false,
  entities: ["./src/entities/**/*.ts"],
  migrations: ["./src/migrations/**/*.ts"],
  subscribers: []
});
