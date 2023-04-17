require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {},
    polygon_mumbai: {
      url: "localhost:8545",
      accounts: [
        `0x${"59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"}`,
      ],
      // accounts: [`0x${"Your private key here"}`],
    },
  },
};
