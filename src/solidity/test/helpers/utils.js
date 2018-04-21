const chai = require('chai')

const expect = chai.expect;

const BigNumber = web3.toBigNumber;

const DEFAULT_GAS_PRICE = 10; // 10
const PLANETS_COUNT = 10;

const expectVMException = prom => new Promise((resolve, reject) => {
  prom
    .then(result => reject(result))
    .catch((e) => {
      expect(e.message).to.include('VM Exception');
      resolve(e);
    });
});

const getBlock = async blockNumber => await web3.eth.getBlock(blockNumber);
const getBalance = async addr => await web3.eth.getBalance(addr);

const verifyContribution = async (expected, actual, blockNumber) => {
  expect(actual.ethValue.toString()).to.equal(web3.toWei(expected.ethValue, 'shannon'));
  expect(actual.fees.toString()).to.equal(web3.toWei(expected.fees, 'shannon'));

  const block = await getBlock('latest');
  expect(actual.ts.toNumber()).to.equal(block.timestamp);
}

const getGasCost = gasUsed => BigNumber(gasUsed).mul(DEFAULT_GAS_PRICE);
const delay = ms => new Promise((resolve, reject) => setTimeout(resolve, ms));

module.exports = {
  PLANETS_COUNT,
  BigNumber,
  expectVMException, 
  getBlock, 
  getBalance,
  getGasCost,
  delay
}
