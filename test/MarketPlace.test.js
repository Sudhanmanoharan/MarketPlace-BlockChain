const MarketPlace = artifacts.require("./MarketPlace.sol");

require('chai')
  .use(require('chai-as-promised'))
  .should();


contract('MarketPlace', ([deployer, seller, buyer]) => {

  let marketplace;

  before(async () => {
    marketplace = await MarketPlace.deployed()
  });

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await marketplace.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, '');
      assert.notEqual(address, null);
      assert.notEqual(address, undefined)
    });

    it('it has name', async () => {
      const name = await marketplace.name();
      assert.equal(name, 'Sudhan')
    })
  });

  describe('products', async () => {

    let result, productCount;

    before(async () => {
      result = await marketplace.createProduct('OnePlus', web3.utils.toWei('1', 'Ether'), {from: seller});
      productCount = await marketplace.productCount()
    });

    // Create the products

    it('create products', async () => {
      //SUCCESS
      assert.equal(productCount, 1);
      const event = result.logs[0].args;
      assert.equal(event.id.toNumber(), productCount.toNumber(), 'id is correct');
      assert.equal(event.name, 'OnePlus', 'name is correct');
      assert.equal(event.price, '1000000000000000000', 'price is correct');
      assert.equal(event.owner, seller, 'owner is correct');
      assert.equal(event.purchased, false, 'purchase is correct');

      //FAILURE: Product have a name

      await marketplace.createProduct('', web3.utils.toWei('1', 'Ether'), {from: seller}).should.be.rejected;

      //FAILURE: Product have a price

      await marketplace.createProduct('', 0, {from: seller}).should.be.rejected;

    });

    // List the products

    it('list products', async ()=>{

      var product = await marketplace.products(productCount);

      assert.equal(product.id.toNumber(), productCount.toNumber(), 'id is correct');
      assert.equal(product.name, 'OnePlus', 'name is correct');
      assert.equal(product.price, '1000000000000000000', 'price is correct');
      assert.equal(product.owner, seller, 'owner is correct');
      assert.equal(product.purchased, false, 'purchase is correct');
    });

    // Sell the products

    it('sell products', async ()=>{

      //Check the seller balance

      let oldBalanceOfSeller;
      oldBalanceOfSeller =  await web3.eth.getBalance(seller);
      oldBalanceOfSeller = new web3.utils.BN(oldBalanceOfSeller);

      //SUCCESS: Buyer purchase the product
      result = await marketplace.purchaseProduct(productCount, {from: buyer, value: web3.utils.toWei('1', 'Ether')});

      //Checking the log
      const event = result.logs[0].args;
      assert.equal(event.id.toNumber(), productCount.toNumber(), 'id is correct');
      assert.equal(event.name, 'OnePlus', 'name is correct');
      assert.equal(event.price, '1000000000000000000', 'price is correct');
      assert.equal(event.owner, buyer, 'buyer is correct');
      assert.equal(event.purchased, true, 'purchase is correct');

      //Check the seller balance

      let newBalanceOfSeller;
      newBalanceOfSeller =  await web3.eth.getBalance(seller);
      newBalanceOfSeller = new web3.utils.BN(newBalanceOfSeller);

      let price;
      price = web3.utils.toWei('1','Ether');
      price = new web3.utils.BN(price);

      const exceptedBalance = oldBalanceOfSeller.add(price);

      assert.equal(newBalanceOfSeller.toString(), exceptedBalance.toString());

      //FAILURE: Buyer Tries product id does'nt exist
      await marketplace.purchaseProduct(99, {from: buyer, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;

      //FAILURE: Buyer does'nt have enough money
      await marketplace.purchaseProduct(99, {from: buyer, value: web3.utils.toWei('0.5', 'Ether')}).should.be.rejected;

      //FAILURE: If product owner try to buy own product means
      await marketplace.purchaseProduct(99, {from: deployer, value: web3.utils.toWei('0.5', 'Ether')}).should.be.rejected;

      //FAILURE: Deployer try to buy the product; i.e product can't buy twice
      await marketplace.purchaseProduct(99, {from: deployer, value: web3.utils.toWei('0.5', 'Ether')}).should.be.rejected;

    })
  })
});
