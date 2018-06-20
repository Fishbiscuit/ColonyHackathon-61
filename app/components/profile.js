import React from 'react'

require("babel-core/register");
require("babel-polyfill");

class MyComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      token: null,
      colony_id: null,
      colony_add: null,
    }
  }

  componentDidMount() {
    this.fetchColony()
  }

  async fetchColony() {
    // Import the prerequisites
    const { providers, Wallet } = require('ethers');
    const { default: EthersAdapter } = require('@colony/colony-js-adapter-ethers');
    const { TrufflepigLoader } = require('@colony/colony-js-contract-loader-http');
    // Import the ColonyNetworkClient
    const { default: ColonyNetworkClient } = require('@colony/colony-js-client');
    // Create an instance of the Trufflepig contract loader
    const loader = new TrufflepigLoader();
    // Create a provider for local TestRPC (Ganache)
    const provider = new providers.JsonRpcProvider('http://localhost:8545/');
    // Get the private key from the first account from the ganache-accounts
    // through trufflepig
    const { privateKey } = await loader.getAccount(0);

    // Create a wallet with the private key (so we have a balance we can use)
    const wallet = new Wallet(privateKey, provider);

    // Create an adapter (powered by ethers)
    const adapter = new EthersAdapter({
      loader,
      provider,
      wallet,
    });

    // Connect to ColonyNetwork with the adapter!
    const networkClient = new ColonyNetworkClient({ adapter });
    await networkClient.init();

    const tokenAddress = await networkClient.createToken({
      name: 'Cool Colony Token',
      symbol: 'COLNY',
    });
    console.log('Token address: ' + tokenAddress);
  
    // Create a cool Colony!
    const {
      eventData: { colonyId, colonyAddress },
    } = await networkClient.createColony.send({ tokenAddress });
  
    // Congrats, you've created a Colony!
    console.log('Colony ID: ' + colonyId);
    console.log('Colony address: ' + colonyAddress);
  
    const setState = this.setState.bind(this);
    setState({ token: tokenAddress })
    setState({ colony_id: colonyId })
    setState({ colony_add: colonyAddress })
  }

  render() {
    return (
      <div className="container has-text-centered">
        <h1 className="title">Profile Information</h1>
        <section className="pt-60 pb-60">
          <div className="container">
            <div className="content">
              <p>Profile Page</p>
              <p>Personal Token Address: {this.state.token === null ?
            <code>Loading...</code> : <code>{this.state.token}</code>}</p>
            <p>Personal Colony ID: {this.state.colony_id === null ?
            <code>Loading...</code> : <code>{this.state.colony_id}</code>}</p>
            <p>Personal Colony Address: {this.state.colony_add === null ?
            <code>Loading...</code> : <code>{this.state.colony_add}</code>}</p>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default MyComponent