import * as dotenv from "dotenv";

dotenv.config();

export const config = {
  PORT: process.env.PORT || 2233,
  MONGO_DB_URI: process.env.MONGO_DB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_LIFETIME: process.env.JWT_LIFETIME,
  GOOGLE_OAUTH_URL: process.env.GOOGLE_OAUTH_URL,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL: "http://localhost:2233/google/callback",
  GOOGLE_ACCESS_TOKEN_URL: process.env.GOOGLE_ACCESS_TOKEN_URL,
  GOOGLE_TOKEN_INFO_URL: process.env.GOOGLE_TOKEN_INFO_URL,
  GOOGLE_OAUTH_SCOPES: [
    "https%3A//www.googleapis.com/auth/userinfo.email",
    "https%3A//www.googleapis.com/auth/userinfo.profile",
  ]
};
