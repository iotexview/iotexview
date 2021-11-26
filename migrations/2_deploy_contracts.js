const IotexViewToken = artifacts.require("IotexViewToken");
const IotexViewTokenCrowdsale = artifacts.require("IotexViewTokenCrowdsale");

module.exports = async function (deployer, _, [__, wallet, admin]) {
  const _name = "IotexView";
  const _symbol = "TXV";
  await deployer.deploy(IotexViewToken, _name, _symbol);
  const token = await IotexViewToken.deployed();
  const _rate = 5000;
  const _wallet = wallet;
  const _admin = admin;
  await deployer.deploy(IotexViewTokenCrowdsale, _rate, _wallet, token.address, _admin);
};