const IotexViewToken = artifacts.require("IotexViewToken");

require("chai")
  .should();

contract("IotexViewToken", accounts => {

  const _name = "IotexView";
  const _symbol = "TXV";
  const _decimals = web3.utils.toBN(18);
  
  beforeEach(async function() {
    this.token = await IotexViewToken.new(_name, _symbol);
  });
  
  describe("Token attributes", function() {
    it("Has the correct name", async function() {
      const name = await this.token.name();
      name.should.equal(_name);
    });

    it("Has the correct symbol", async function() {
        const symbol = await this.token.symbol();
        symbol.should.equal(_symbol);
    });

    it("Has the correct decimals", async function() {
        const decimals = await this.token.decimals();
        decimals.should.be.eql(_decimals);
    });
  });
});