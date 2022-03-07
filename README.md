# Chaos Simulation Reverse Proxy

### Intro

This package is used to spin up a local reverse proxy to one of our running simulation RPC nodes.

- What it does:

1. spin up a simulation based on given config
2. start a reverse proxy to the simulation PRC node and serve it from localhost for a chosen port

- What is it good for - Local testing and working directly with our nodes without the needs to use API to spin & connect to the nodes.

### How to configure

First we need to configure the proxy by filling up the config JSON on `config/config.json`
Fill the following:

1. `port` - defaults to 8545. this is where the reverse proxy will serve the chaos node from your local machine
2. `simulationID` - the simulation ID the proxy will spin up and listen to.
3. `accessToken` - leave empty! see the section below.

`accessToken` - This is the token used to authenticate to our severs. For security purpose the proxy will read that value from the terminal env.
To set set it up: `export CHAOS_ACCESS_TOKEN=<YourToken>`

now just run `npm i` to install the dependecies needed to run the proxy.

You're all set up!

### How to run

`npm run start`
