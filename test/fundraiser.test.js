const FundraiserContract = artifacts.require("Fundraiser");

contract("Fund raiser", (accounts) => {
  let fundraiser;
  const name = "Beneficiary Name";
  const url = "Beneficiaryname.org";
  const imageURL = "https://placekitten.com/600";
  const description = "Beneficiary descriptions";
  const beneficiary = accounts[1];
  const owner = accounts[0];

  beforeEach(async () => {
    fundraiser = await FundraiserContract.new(
      name,
      url,
      imageURL,
      description,
      owner,
      beneficiary
    );
  });
  describe("initialisation", () => {
    it("gets the beneficiary's name", async () => {
      const actual = await fundraiser.name();
      assert.equal(actual, name, "names should be the same ");
    });
    it("gets the beneficiary's url", async () => {
      const actual = await fundraiser.url();
      assert.equal(actual, url, "url should be the same ");
    });
    it("gets the beneficiary's mageURL", async () => {
      const actual = await fundraiser.imageURL();
      assert.equal(actual, imageURL, "mageURL should be the same ");
    });
    it("gets the beneficiary's description", async () => {
      const actual = await fundraiser.description();
      assert.equal(actual, description, "description should be the same ");
    });
    it("gets the beneficiary", async () => {
      const actual = await fundraiser.beneficiary();
      assert.equal(actual, beneficiary, "beneficiary should be the same ");
    });
    // it("gets the beneficiary", async () => {
    //   const actual = await fundraiser.beneficiary();
    //   assert.equal(actual, beneficiary, "beneficiary should be the same ");
    // });
    // it("gets teh custodian", async () => {
    //   const actual = await fundraiser.custodian();
    //   assert.equal(actual, custodian, "custodian should be the same");
    // });
    it("gets the owner", async () => {
      const actual = await fundraiser.owner();
      assert.equal(actual, owner, "bios should match");
    });
  });
  describe("setBeneficiary test", () => {
    const newBeneficiary = accounts[2];

    it("updated the beneficiary when called by owner account", async () => {
      await fundraiser.setBeneficiary(newBeneficiary, { from: owner });
      const actual = await fundraiser.beneficiary();
      assert.equal(actual, newBeneficiary, "newBeneficiary should be alright");
    });

    it("throws an error when it is called by a non-owner person", async () => {
      try {
        await fundraiser.setBeneficiary(newBeneficiary, { from: accounts[4] });
        assert.fail("withdraw was not restricted to the owner");
      } catch (err) {
        const expectedError = "Ownable: caller is not the owner";
        const actualError = err.reason;
        assert.equal(
          actualError,
          expectedError,
          "shoud not be permited if called by someone else"
        );
      }
    });
  });

  describe("making donation", () => {
    const value = web3.utils.toWei("0.0289");
    const donor = accounts[2];

    it("increased my donationsCount", async () => {
      const currentDonationsCount = await fundraiser.myDonationsCount({
        from: donor,
      });
      await fundraiser.donate({ from: donor, value });
      const newDonationCount = await fundraiser.myDonationsCount({
        from: donor,
      });
      assert.equal(1, newDonationCount - currentDonationsCount),
        "myDonationsCount should increase by 1";
    });
    it("includes donation in my donations");
  });
});
