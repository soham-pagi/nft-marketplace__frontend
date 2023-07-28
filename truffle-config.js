const HDWalletProvider = require('@truffle/hdwallet-provider');
const mnemonic = "trick increase agent spot make come require phrase before urge distance help"
const alchemyApiKey = "m3ZhghonD5KpQKNavSsYtwug5Glsyve2";


module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    mumbai: {
      provider: () => new HDWalletProvider(mnemonic, `wss://polygon-mumbai.g.alchemy.com/v2/${alchemyApiKey}`),
      network_id: 80001,
      gasPrice: 30000, // 1 gwei (Optional)
      confirmations: 2, // Number of blocks to wait between deployments (Optional)
      timeoutBlocks: 200, // Number of blocks before a deployment times out (Optional)
      skipDryRun: true, // Skip dry run before migrations? (Optional for faster deployments)
    },
  },
  contracts_directory: "./contracts/",
  contracts_build_directory: "./src/abis/",
  compilers: {
    solc: {
      version: "0.8.4",
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
