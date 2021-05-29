import Web3 from 'web3'
import CryptoPizza from '../contracts/CryptoPizza.json'
import { contract } from '../lib/constants.js'

export async function getPizza(address) {
  const dataList = []
  const web3 = new Web3();
	const provider = new Web3.providers.HttpProvider(
					"http://127.0.0.1:7545"
				);
	web3.setProvider(provider)
  const todo = new web3.eth.Contract(CryptoPizza.abi, contract)

  const ids = await todo.methods.getPizzasByOwner(address).call()

  for (let i = 0; i < ids.length; i++) {
    const name = await todo.methods.pizzas(ids[i]).call()
    const owner = await todo.methods.ownerOf(ids[i]).call()
    const nda = await todo.methods.generateRandomDna(name, owner).call()
    const data = {
      id: ids[i],
      name: name,
      nda: nda,
    }
    dataList.push(data)
  }

  return dataList
}
