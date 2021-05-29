import Web3 from 'web3'
import CryptoPizza from '../contracts/CryptoPizza.json'
import { contract } from '../lib/constants.js'

export async function eatPizza(accounts, value) {
  new Promise((resolve, reject) => {
    const web3 = new Web3(Web3.givenProvider)
    const account = accounts.toString()
    const todo = new web3.eth.Contract(CryptoPizza.abi, contract)

    console.log('account = ', account)

    todo.methods
      .burn(value)
      .send({
        from: account,
        gas: 1000000,
        gasPrice: 1000000000,
        gasLimit: 1000000,
      })
      .on('error', reject)
      .on('receipt', resolve)
  })
}
