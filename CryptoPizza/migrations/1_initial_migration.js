const OTRCPT = artifacts.require('OTRCPartyToken')

module.exports = function (deployer) {
  deployer.deploy(OTRCPT)
}
