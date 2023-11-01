# Obsoleted by https://github.com/rndlabs/monSI
This repository is obsolete, nmaintained, and likely no longer works.   It is being retained strictly for historical (hysterical, if you compare the code bases) reasons.   Please use https://github.com/rndlabs/monSI

# monSI
A monitor for the upcoming Storage Incentives (SI) for the Ethersphere Bee swarm written in JavaScript for node.js

## Installing packages

To get started the following commands, or their equivalents, should work if you don't already have node and/or npm

sudo apt-get install nodejs

sudo apt-get install npm

Or for Windows or macOS, https://nodejs.org/en/download/

You'll also need git to clone this repository: https://git-scm.com/download/win

## Installing dependencies

Then the following command should install the needed dependencies when executed in the cloned directory.

npm i

monSI uses blessed for drawing its TUI (Text User Interface)

## Configuring

Currently you need to edit monSI.js to set your web sockets RPC provider on the goerli blockchain.   This is set on the first line
of the file as rpcURL.

You may also change the myOverlays array to specify your testnet node overlays.   These overlays will be highlighted whenever
they participate in the storage incentives lottery.

monSI can also go back in time to preload transactions from previously committed rounds.  You can specify how many rounds to go back in time via the preloadRounds variable.

These parameterw will eventually be moved to command-line arguments.

## Running

Finally, to run monSI, use the following command in a shell or command prompt window:

node monSI.js

### Manual Dependencies

If "node monSI.js" shows errors even after "npm i" was executed, try these:

npm install blessed

## Disclaimer

Note: This is only my third github repository and second public release of an open-source project.  I am NOT a JavaScript programmer, so please be gentle with any criticism.

## Warning

Just don't run monSI for a long time if you use infura.io's (or any other provider's) free account because monSI monitors every single block and will eat up your 100,000 API hits in short order.  No gETH, but every query is counted at infura.io.
