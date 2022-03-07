import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { SimulationNodeURL } from "./chaos";
import { Configuration } from "./config";

export async function StartProxy() {
  const conf = Configuration();

  const targetURL = await SimulationNodeURL(conf);
  const app = express();
  app.use("/", createProxyMiddleware({ target: targetURL, changeOrigin: true }));
  app.listen(conf.port);
}
