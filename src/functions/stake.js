import Web3 from 'web3'
import Staking from '../contracts/Staking.json'
import OTRCPartyToken from '../contracts/OTRCPartyToken.json'
import { contract1, contract2, contract3 } from '../lib/constants.js'

const web3 = new Web3();
const provider = new Web3.providers.HttpProvider(
					"http://127.0.0.1:7545"
				);
web3.setProvider(provider)
const StakeToken = new web3.eth.Contract(Staking.abi, contract3)
const PartyToken = new web3.eth.Contract(OTRCPartyToken.abi, contract2)

export async function Stake(accounts, value) {
  new Promise((resolve, reject) => {
    console.log('stake', value)
    const toWei = (amount) => {
      console.log(amount)
      return web3.utils.toWei(amount.toString(), 'finney')
    }
    const token = toWei(value)
    const price = Number(token)
    PartyToken.methods
      .approve(accounts, price)
      .send({ from: accounts })
      .on('receipt', (receipt) => {
        StakeToken.methods
          .deposit(price)
          .send({
            from: accounts,
            value: price,
            gas: 1000000,
            gasPrice: 1000000000,
            gasLimit: 1000000,
          })
          .on('error', reject)
          .on('receipt', resolve)
      })
  })
}

export async function UnStake(accounts, value) {
  new Promise((resolve, reject) => {
    console.log('unStake', value)
    const toWei = (amount) => {
      web3.utils.toWei(amount.toString(), 'finney')
    }
    const token = toWei(value)
    const price = Number(token)
    StakeToken.methods
      .withdraw(price)
      .send({
        to: accounts,
        value: price,
        gas: 1000000,
        gasPrice: 1000000000,
        gasLimit: 1000000,
      })
      .on('error', reject)
      .on('receipt', resolve)
  })
}

export async function isStaking(accounts) {
  const userStaking = await StakeToken.methods.isStaking(accounts[0]).call()
  return userStaking
}
