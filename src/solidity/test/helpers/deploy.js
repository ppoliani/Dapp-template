const Cryptorbit = artifacts.require('Cryptorbit')
const PlanetAuction = artifacts.require('PlanetAuction')

const deploy = async accounts => await Cryptorbit.new();

const deployAuction = async (accounts) => await PlanetAuction.new();

module.exports = {deploy}
