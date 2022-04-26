import axios from "axios";
import { Config, Configuration } from "./config";

const CHAOS_SIMULATION_INIT_URL = "https://cloud.chaoslabs.co/async_simulation";
const CHAOS_SIMULATION_DETAILS = "https://cloud.chaoslabs.co/simulation_details";

const MAX_TIMEOUT = 120 * 1000; // 120 seconds
const RETRY_TIMEOUT = 2 * 1000; // 2 seconds

export async function SimulationNodeURL(conf: Config): Promise<string> {
  const id = await SpinSimulation(conf);
  console.log(` *** Simuattion started [${id}] - Waiting for Node URL *** `);
  const nodeURL = await WaitForSimluationNodeURL(id, conf);
  if (!nodeURL) {
    throw new Error("Failed to get RPC URL");
  }
  console.log(` ***  Node URL [${nodeURL}] Recieved ! *** `);
  return nodeURL;
}

async function SpinSimulation(conf: Config): Promise<string> {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const data = {
      simulationID: conf.simulationID,
    };
    const res = await axios.post(appendTokenToHeader(CHAOS_SIMULATION_INIT_URL, conf), data, {
      headers: headers,
    });
    return res.data;
  } catch (e) {
    throw e;
  }
}

async function WaitForSimluationNodeURL(id: string, conf: Config): Promise<string | undefined> {
  let details = undefined;
  const totalTime = 0;
  while (!details && totalTime < MAX_TIMEOUT) {
    await new Promise((resolve) => setTimeout(resolve, RETRY_TIMEOUT));
    details = await SimulationDetails(id, conf);
  }
  return details;
}

async function SimulationDetails(id: string, conf: Config): Promise<string | undefined> {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const data = {
      id: id,
    };
    const res = await axios.post(appendTokenToHeader(CHAOS_SIMULATION_DETAILS, conf), data, {
      headers: headers,
    });
    if (res.status === 404) {
      return undefined;
    }
    return res.data?.nodeUrl;
  } catch (e) {
    throw e;
  }
}

function appendTokenToHeader(urlInput: string, conf: Config): string {
  var url = new URL(urlInput);
  url.searchParams.append("chaos_token", conf.accessToken);
  return url.toString();
}
