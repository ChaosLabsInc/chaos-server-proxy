export interface Config {
  port: string;
  simulationID: string;
  accessToken: string;
}

import fs from "fs";
import { resolve } from "path";

const path = "../config/config.json";

export function Configuration(): Config {
  let config = readConfig();
  const token = process.env.CHAOS_ACCESS_TOKEN;
  if (token === undefined) {
    throw new Error("CHAOS_ACCESS_TOKEN needs to be exported to the terminal env.");
  }
  config.accessToken = token;
  return config;
}

function readConfig(): Config {
  try {
    const rawData = fs.readFileSync(resolve(__dirname, path));
    return JSON.parse(rawData.toString());
  } catch (e) {
    throw e;
  }
}
