const {promisify} = require('es6-promisify')
const Web3 = require('web3')
const Maybe = require('folktale/maybe')
const {prop} = require('../fn')

let _web3 = Maybe.Nothing();

const getProvider = () => global.web3 !== undefined 
  ? web3.currentProvider 
  : new Web3.providers.HttpProvider(process.env.WEB3_HTTP_PROVIDER);

const getWeb3 = () => _web3.matchWith({
  Just: prop('value'),
  Nothing: () => {
    const provider = getProvider();
    const _web3Inst = new Web3(provider);
    _web3 = Maybe.fromNullable(_web3Inst);

    return _web3Inst;
  }
});

const getAccounts = promisify(getWeb3().eth.getAccounts);

const getDefaultAccount = async () => {
  const accounts = await getAccounts();
  return accounts[0];
}

async function getTransactionsByAccount(myaccount, startBlockNumber, endBlockNumber) {
  const web3 = getWeb3()
  const getEndBlockNumber = promisify(web3.eth.getBlockNumber);
  const getBlock = promisify(web3.eth.getBlock);

  if (endBlockNumber == null) {
    endBlockNumber = await getEndBlockNumber()
  }
  if (startBlockNumber == null) {
    startBlockNumber = endBlockNumber - 1000;
    console.log("Using startBlockNumber: " + startBlockNumber);
  }

  let transactions = []

  for (var i = startBlockNumber; i <= endBlockNumber; i++) {
    if (i % 1000 == 0) {
      console.log("Searching block " + i);
    }

    var block = await getBlock(i, true);

    if (block != null && block.transactions != null) {
      block.transactions.forEach(function (e) {
        if (myaccount == "*" || myaccount == e.from || myaccount == e.to) {

          transactions.push(e)

          // console.log("  tx hash          : " + e.hash + "\n"
          //   + "   nonce           : " + e.nonce + "\n"
          //   + "   blockHash       : " + e.blockHash + "\n"
          //   + "   blockNumber     : " + e.blockNumber + "\n"
          //   + "   transactionIndex: " + e.transactionIndex + "\n"
          //   + "   from            : " + e.from + "\n"
          //   + "   to              : " + e.to + "\n"
          //   + "   value           : " + e.value + "\n"
          //   + "   time            : " + block.timestamp + " " + new Date(block.timestamp * 1000).toGMTString() + "\n"
          //   + "   gasPrice        : " + e.gasPrice + "\n"
          //   + "   gas             : " + e.gas + "\n"
          //   + "   input           : " + e.input);
        }
      })
    }
  }

  return transactions;
}

// const BigBumber = getWeb3().toBigNumber;
const estimateGas = promisify(getWeb3().eth.estimateGas);
const deploy = contract => promisify(contract.new.bind(contract));
const toWei = (unit, num) => getWeb3().toWei(num, unit);

module.exports = {
  getProvider,
  getWeb3,
  // BigBumber, 
  getAccounts,
  getDefaultAccount,
  getTransactionsByAccount,
  estimateGas,
  deploy,
  toWei
}
