const IotexViewToken = artifacts.require("IotexViewToken");
const IotexViewTokenCrowdsale = artifacts.require("IotexViewTokenCrowdsale");

require("chai")
  .should();

contract("IotexViewTokenCrowdsale", function([_, wallet]) {

  // Token Configuration
  const _name = "IotexView";
  const _symbol = "TXV";
  // Crowdsale Configuration
  const _rate = web3.utils.toBN(5000);
  const _wallet = wallet;
  
  beforeEach(async function() {
    // Deploy Token
    this.token = await IotexViewToken.new(_name, _symbol);
    // Deploy Crowdsale
    this.crowdsale = await IotexViewTokenCrowdsale.new(_rate, _wallet, this.token.address);
  });
  
  describe("Crowdsale", function() {
    it("Tracks the token", async function() {
      const token = await this.crowdsale.token();
      token.should.equal(this.token.address);
    });

    it("Tracks the rate", async function() {
      const rate = await this.crowdsale.rate();
      rate.should.be.eql(_rate);
    });

    it("Tracks the wallet", async function() {
      const wallet = await this.crowdsale.wallet();
      wallet.should.be.equal(_wallet);
    });
  });
});