require("babel-core/register");
require("babel-polyfill");

import React from 'react'

class MyComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      meta: null,
      colony_1: null,
      colony_2: null
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

    // Or alternatively, just its address:
    // const colonyClient = await networkClient.getColonyClientByAddress(colonyAddress);

    // You can also get the Meta Colony:
    const metaColonyClient = await networkClient.getMetaColonyClient();
    const metaColonyAddress = metaColonyClient.contract.address
    console.log('Meta Colony address: ' + metaColonyClient.contract.address);
    const setState = this.setState.bind(this);
    setState({ meta: metaColonyAddress })

    const colonyClient = await networkClient.getColonyClient(2);
    const colonyAddress = colonyClient.contract.address
    setState({ colony_1: colonyAddress })

    const colonyClient_2 = await networkClient.getColonyClient(3);
    const colonyAddress_2 = colonyClient_2.contract.address
    setState({ colony_2: colonyAddress_2 })
  }

  render() {
    return (
      <div className="container has-text-centered">
        <h1 className="title">Colony Information</h1>
        <div className="content has-text-centered">
          <h2 className="subtitle">Meta Colony</h2>
          <p>Meta Colony Address: {this.state.data === null ?
            <code>Loading...</code> : <code>{this.state.meta}</code>}</p>
          <h2 className="subtitle">Colonies</h2>
          <p>Colony 1 Address: {this.state.colony === null ?
            <code>Loading...</code> : <code>{this.state.colony_1}</code>}</p>
          <p>Colony 2 Address: {this.state.colony === null ?
            <code>Loading...</code> : <code>{this.state.colony_2}</code>}</p>
        </div>
      </div>
    )
  }
}

export default MyComponent