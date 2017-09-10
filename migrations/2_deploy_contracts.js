var Owned = artifacts.require("./Owned.sol");
var Stoppable = artifacts.require("./Stoppable.sol");
var Question = artifacts.require("./Question.sol");
var PredictionMarket = artifacts.require("./PredictionMarket.sol");
var SimpleStorage = artifacts.require("./SimpleStorage.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(Owned);
  deployer.link(Owned, Stoppable);
  deployer.deploy(Stoppable);
  deployer.link(Stoppable, Question);
  deployer.deploy(Question);
  deployer.link(Question, PredictionMarket);
  deployer.link(Stoppable, PredictionMarket);
  deployer.deploy(PredictionMarket);
};
