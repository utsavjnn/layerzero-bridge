/** @type import('hardhat/config').HardhatUserConfig */
require("dotenv").config();
require("@nomiclabs/hardhat-waffle");
require('hardhat-deploy');
require('hardhat-deploy-ethers');
require('./tasks');

function accounts(chainKey) {
  let networkName = chainKey;
  const private_key = process.env['PRIVATE_KEY_' + networkName.toUpperCase()];
  if (private_key && private_key !== '') {
    return [private_key];
  }
  else {
    console.log(`PrivateKey for the ${chainKey} network doesnt exist in .env`);
    return [""]
  }
}

module.exports = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },//"0.8.18",

  mocha: {
    timeout: 100000000
  },
  
  namedAccounts: {
    deployer: {
      default: 0,    // wallet address 0, of the mnemonic in .env
    },
    proxyOwner: {
      default: 1,
    },
  },

  networks: {
    'bsc-testnet': {
      url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      chainId: 97,
      accounts: accounts("bsc-testnet"),
    },
    'polygon-zk-evm-testnet': {
      url: `https://rpc.public.zkevm-test.net`,
      chainId: 1442,
      accounts: accounts("polygon-zk-evm-testnet"),
    }
  }
};


