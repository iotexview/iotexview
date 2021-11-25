const IotexViewToken = artifacts.require("IotexViewToken");

module.exports = function (deployer) {
  const _name = "IotexView";
  const _symbol = "TXV";
  deployer.deploy(IotexViewToken, _name, _symbol);
};