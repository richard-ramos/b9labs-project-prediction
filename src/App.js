import React, { Component } from 'react'
import PredictionMarketContract from '../build/contracts/PredictionMarket.json'
import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

import AccountManager from "./AccountManager";
import QuestionForm from "./QuestionForm";


class App extends Component {

  constructor(props) {
    super(props)

    this.handleSelectAccount = this.handleSelectAccount.bind(this);

    this.state = {
      storageValue: 0,
      web3: null,
      accounts: null,
      selectedAccount: null,
      balance: 0
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract();
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const predictionMarket = contract(PredictionMarketContract)

    predictionMarket.setProvider(this.state.web3.currentProvider)

predictionMarket.deployed()
  .then((instance) => {
    return instance.owner()
  }).then((result) => {
    console.log(result);
  })


/*
  .owner(function(e){
  console.log(e);
})*/
    // Declaring this for later so we can chain functions on SimpleStorage.
    var simpleStorageInstance

    this.state.web3.eth.getAccounts((error, accts) => {
      this.setState({ accounts: accts});
    });


    // Get accounts.
    /*this.state.web3.eth.getAccounts((error, accounts) => {
      simpleStorage.deployed().then((instance) => {
        simpleStorageInstance = instance

        // Stores a given value, 5 by default.
        return simpleStorageInstance.set(5, {from: accounts[0]})
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        return simpleStorageInstance.get.call(accounts[0])
      }).then((result) => {
        // Update state with the result.
        return this.setState({ storageValue: result.c[0] })
      })
    })*/







  }



  handleSelectAccount(act){
    console.log(act);
    this.state.web3.eth.getBalance(act, (error, balance) => {
      this.setState({selectedAccount: act, accountBalance: balance.toString(10)});
    });
  }



  watchQuestions() {
    /*hub.LogNewCampaign( {}, {fromBlock: 0})
    .watch(function(err,newCampaign) {
      if(err) 
      {
        console.error("Campaign Error:",err);
      } else {
        // normalizing data for output purposes
        console.log("New Campaign", newCampaign);
        newCampaign.args.user   = newCampaign.args.sponsor;
        newCampaign.args.amount = newCampaign.args.goal.toString(10);     
        // only if non-repetitive (testRPC)
        if(typeof(txn[newCampaign.transactionHash])=='undefined')
        {
          $scope.campaignLog.push(newCampaign);         
          txn[newCampaign.transactionHash]=true;
          upsertCampaign(newCampaign.args.campaign);
        }
      }
    })*/
  }



  render() {
    return (
      <div className="App">
        <h1>PredictionMarket</h1>
        <form>
          <AccountManager list={this.state.accounts} selectAccountHandler={this.handleSelectAccount} balance={this.state.accountBalance} />
          <QuestionForm />
        </form>
      </div>
    );
  }
}

export default App
