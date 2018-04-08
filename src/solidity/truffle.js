const HDWalletProvider = require('truffle-hdwallet-provider');
const mnemonic = 'excess stem kitten win couch chief usage yard load noodle attack spy';

module.exports = {
  solc: {
    optimizer: {
      enabled: true,
      runs: 200,
    }
  },
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      gasPrice: 10,
      network_id: '*' // Match any network id,
    },
    coverage: {
      host: 'localhost',
      network_id: '*',
      port: 8555,         // <-- If you change this, also set the port option in .solcover.js.
      gas: 0xfffffffffff, // <-- Use this high gas value
      gasPrice: 1      // <-- Use this low gas price
    },
    ropsten: {
      provider: new HDWalletProvider(mnemonic, 'https://ropsten.infura.io/WuBF2yxew76i2sUGE4N7', 0, 9),
      network_id: 3,
      gas: 4612388,
      gasPrice: 200000000000
    },
    kovan: {
      provider: new HDWalletProvider(mnemonic, 'https://kovan.infura.io/WuBF2yxew76i2sUGE4N7 ', 0, 9),
      network_id: 42,
      gas: 4612388,
      gasPrice: 2000000000
    },
    rinkeby: {
      provider: new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/YYbjP7qALibWOIATmnAC', 0, 9),
      network_id: 4,
      gas: 4612388,
      gasPrice: 20000000000
    }
  }
};
