import fetch from "node-fetch";
import { config } from "../config/env.js";

const {
  GOOGLE_OAUTH_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,
  GOOGLE_ACCESS_TOKEN_URL,
  GOOGLE_TOKEN_INFO_URL,
  GOOGLE_OAUTH_SCOPES
} = config;

export const getGoogleAuthURL = (state = "some_state") => {
  const scopes = GOOGLE_OAUTH_SCOPES.join(" ");
  return `${GOOGLE_OAUTH_URL}?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(GOOGLE_CALLBACK_URL)}&access_type=offline&response_type=code&state=${state}&scope=${scopes}`;
};

export const getGoogleTokens = async (code) => {
  const data = {
    code,
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET,
    redirect_uri: GOOGLE_CALLBACK_URL,
    grant_type: "authorization_code",
  };

  const response = await fetch(GOOGLE_ACCESS_TOKEN_URL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return response.json();
};

export const getGoogleUserInfo = async (idToken) => {
  const response = await fetch(
    `${GOOGLE_TOKEN_INFO_URL}?id_token=${idToken}`
  );
  
  return response.json();
};
