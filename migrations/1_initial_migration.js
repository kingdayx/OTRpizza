const CryptoPizza = artifacts.require('./CryptoPizza.sol')
const Stake = artifacts.require('./Stake.sol')
const contract2 = '0x77d672cBf917711cBC2060C9bfDDa6c106B4525B'

module.exports = function (deployer) {
  deployer.deploy(CryptoPizza)
  deployer.deploy(Stake(contract2, contract2))
}
