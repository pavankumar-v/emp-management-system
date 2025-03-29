import { configDotenv } from "dotenv";
import { cleanEnv, host, num, port, str, testOnly } from "envalid";

configDotenv({ path: `.env.${process.env.NODE_ENV}` });

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ devDefault: testOnly("test"), choices: ["development", "production", "test"] }),
  PORT: port({ devDefault: testOnly(8080) }),
  CORS_ORIGIN: str({ devDefault: testOnly("http://localhost:3000") }),

  DB_HOST: host({ devDefault: testOnly("localhost") }),
  DB_PORT: num({ devDefault: testOnly(5432) }),
  DB_USER: str({ devDefault: testOnly("root") }),
  DB_PASSWORD: str({ devDefault: testOnly("root") }),
  DB_NAME: str({ devDefault: testOnly("employee_db_development") }),
});
