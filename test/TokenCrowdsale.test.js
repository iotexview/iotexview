import ether from "./helpers/ether";
import keccak256 from "keccak256";

const IotexViewToken = artifacts.require("IotexViewToken");
const IotexViewTokenCrowdsale = artifacts.require("IotexViewTokenCrowdsale");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("IotexViewTokenCrowdsale", function([_, wallet, admin, investor1, investor2]) {

  // Token Configuration
  const _name = "IotexView";
  const _symbol = "TXV";

  // Crowdsale Configuration
  const _rate = web3.utils.toBN(5000);
  const _wallet = wallet;
  const _admin = admin;
  
  beforeEach(async function() {
    // Deploy Token
    this.token = await IotexViewToken.new(_name, _symbol);
    // Deploy Crowdsale
    this.crowdsale = await IotexViewTokenCrowdsale.new(_rate, _wallet, this.token.address, _admin);
    // Transfer Token Ownership to Crowdsale
    await this.token.grantRole(keccak256("MINTER_ROLE"), this.crowdsale.address);
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

    it("Tracks admin role", async function() {
      const admin = await this.crowdsale.admin();
      admin.should.be.equal(_admin);
    });
  });

  describe("Minted Crowdsale", function() {
    it("Mints tokens after purchase", async function() {
      const originalTotalSupply = await this.token.totalSupply();
      await this.crowdsale.sendTransaction({ value: ether("1"), from: investor1 });
      const newTotalSupply = await this.token.totalSupply();
      assert.isTrue(newTotalSupply > originalTotalSupply);
    })
  })

  describe("Accepting payments", function() {
    it("Should accept payments", async function() {
      const value = ether("1");
      const purchaser = investor2;
      await this.crowdsale.sendTransaction({ value: value, from: investor1 }).should.be.fulfilled;
      await this.crowdsale.buyTokens(investor1, { value: value, from: purchaser }).should.be.fulfilled;
    })
  })
});