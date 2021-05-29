import CryptoPizzaArtifact from "./contracts/CryptoPizza.json";
import config from "./config";

class Pizza {
	constructor(web3) {
		this.abi = CryptoPizzaArtifact.abi;
		this.address = CryptoPizzaArtifact.networks[config.networkId].address;
		this.instance = new web3.eth.Contract(this.abi, this.address);
	}

	// Loads all Pizzas owned by user
	getPizzasByOwner = async (address) => {
		const pizzaIds = await this.instance.methods
			.getPizzasByOwner(address)
			.call();

		const pizzasPromise = pizzaIds.map((pizzaId) =>
			this.instance.methods.pizzas(pizzaId).call()
		);

		const pizzas = await Promise.all(pizzasPromise);

		return pizzas.map((pizza, index) => ({
			id: pizzaIds[index],
			name: pizza[0],
			dna: pizza[1],
		}));
	};

	// Generates random DNA from string
	getRandomDna = (name, address) =>
		this.instance.methods.generateRandomDna(name, address).call();

	// Creates random Pizza from string (name)
	createRandomPizza = (name, address) =>
	new Promise((resolve, reject) => {
		// Calls the public `createRandomPizza` function from the smart contract
		this.instance.methods
			.createRandomPizza(name)
			.send({
				from: address,
				gas: 1000000,
				gasPrice: 1000000000,
				gasLimit: 1000000,
			})
			.on("error", reject)
			.on("receipt", resolve);
	});

	// Gifts Pizza
	giftPizza = (to, pizzaId, address) =>
	new Promise((resolve, reject) => {
	  // Calls the public `transferFrom` function from the smart contract
	  this.instance.methods
		.transferFrom(address, to, pizzaId)
		.send({
		  from: address,
		  gas: 1000000,
		  gasPrice: 1000000000,
		  gasLimit: 1000000,
		})
		.on("error", reject)
		.on("receipt", resolve);
	});

	// Check if address is valid
	isValidAddress = (address) => {
		return /^(0x)?[0-9a-f]{40}$/i.test(address);
	};

	burn = (pizzaId, address) =>
	new Promise((resolve, reject) => {
		// Calls the public `burn` function from the smart contract
		this.instance.methods
			.burn(pizzaId)
			.send({
				from: address,
				gas: 1000000,
				gasPrice: 1000000000,
				gasLimit: 1000000,
			})
			.on("error", reject)
			.on("receipt", resolve);
	});
}

export default Pizza;
