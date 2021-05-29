import React, { useContext } from 'react'

import getWeb3 from './getWeb3'
import CryptoPizza from './contracts/CryptoPizza.json'
import MetaMaskContext from './metamask'
import './App.css'

import Toggle from './components/toggle'
import Loading from './components/loading'
//import updatePizza from "./functions";
//import inventory from "./functions";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      value1: '',
      web3: null,
      accounts: null,
      contract: null,
      active: 'FIRST',
      error: true,
    }
  }
  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3()

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts()

      // Get the contract instance.
      const networkId = await web3.eth.net.getId()
      const deployedNetwork = CryptoPizza.networks[networkId]
      const instance = new web3.eth.Contract(
        CryptoPizza.abi,
        deployedNetwork && deployedNetwork.address,
      )

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance, error: false })
    } catch (error) {
      // Catch any errors for any of the above operations.
      //   this.setState({ error: true })
      //   window.ethereum.on('accountsChanged', async () => {
      //     await update(dispatch)
      //   });
      //   /* Case 3 - User switch network */
      //   window.ethereum.on('chainChanged', async () => {
      //     await update(dispatch)
      //   });
    }
  }
  handleChange = (event) => {
    this.setState({ value: event.target.value })
  }
  handleChange1 = (event) => {
    this.setState({ value1: event.target.value })
  }
  render() {
    const { error } = this.state
    const { accounts } = this.state

    let button
    if (error === true) {
      button = <Loading />
    } else {
      button = (
        <Toggle
          accounts={accounts}
          input={this.state.value}
          handleChange={this.handleChange}
          handleChange1={this.handleChange1}
          value={this.state.value1}
        />
      )
    }
    return (
      <div>
        <div id="main-container">{button}</div>
      </div>
    )
  }
}
export default App
