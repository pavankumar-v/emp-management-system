import "reflect-metadata"
import { DataSource } from "typeorm"
import { env } from "./config/env.config"
import { Employee } from "./entity/Employee"

export const AppDataSource = new DataSource({
  type: "postgres",
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Employee],
  migrations: [],
  subscribers: [],
})
