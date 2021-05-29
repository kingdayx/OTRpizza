import Web3 from "web3";
import Pizza from "./pizza";

class UI {
  constructor() {
    this.web3 = null;
    this.pizza = null;

    this.getElements();
    this.addListeners();
    this.init();
  }

  getElements = () => {
    this.buttons = {
      create: document.getElementById("create-button"),
      connect: document.getElementById("connect-button"),
    };

    this.tabs = {
      create: document.getElementById("create-tab"),
      inventory: document.getElementById("inventory-tab"),
    };

    this.containers = {
      loading: document.getElementById("loading-container"),
      welcome: document.getElementById("welcome-container"),
      main: document.getElementById("main-container"),
      pizzaIngredients: document.getElementById("pizza-ingredients-container"),
      inventory: document.getElementById("inventory-container"),
    };

    this.inputs = {
      create: document.getElementById("create-input"),
    };
  };

  addListeners = () => {
    this.buttons.connect.addEventListener("click", this.init);
    this.tabs.create.addEventListener("click", this.openTab);
    this.tabs.inventory.addEventListener("click", this.openTab);
    this.inputs.create.addEventListener("change", this.updateCreateInput);
    this.buttons.create.addEventListener("click", this.createRandomPizza);

    document.body.addEventListener("click", (event) => {
      if (event.target.classList.contains("button-gift")) {
        this.giftPizza(event);
      } else if (event.target.classList.contains("button-eat")) {
        this.eatPizza(event);
      }
    });
  };

  init = async () => {
    if (window.web3) {
      try {
        // Instantiate a new web3 with full capabilities
        this.web3 = new Web3(Web3.givenProvider, null, {});

        await this.web3.eth.requestAccounts();

        this.showStatus("DApp loaded correctly");
        this.showMain();
        this.loadInventory();

        this.pizza = new Pizza(this.web3);
      } catch (err) {
        this.showStatus("DApp not loaded");
        this.showWelcome();
      }
    } else {
      this.showStatus("Metamask is required");
      this.showWelcome();
    }
  };

  showMain = () => {
    this.containers.welcome.classList.add("hidden");
    this.containers.loading.classList.add("hidden");
    this.containers.main.classList.remove("hidden");
  };

  showWelcome = () => {
    this.containers.welcome.classList.remove("hidden");
    this.containers.loading.classList.add("hidden");
    this.containers.main.classList.add("hidden");
  };

  loadInventory = async () => {
    const [address] = await this.web3.eth.getAccounts();
    const pizzas = await this.pizza.getPizzasByOwner(address);

    this.containers.inventory.innerHTML = "";

    if (pizzas.length > 0) {
      pizzas.forEach(({ id, name, dna }) => {
        const pizzaImage = this.generatePizzaImage(dna);

        const actionButtons = `
          <div class="action-buttons">
            <button class="btn button-gift" name="${id}">Gift</button>
            <button class="btn button-eat" name="${id}">Eat</button>
          </div>
        `;

        this.containers.inventory.insertAdjacentHTML(
          "beforeend",
          `
          <div id="pizza-${id}">
            <div class="pizza-container">
              <p>
                <span style="float: left;">${name}</span>
                <span id="${dna}" class="pizzaDna" style="float: right;">#${dna}</span>
              </p>
              <div class="pizza-inner-container">
                <img class="pizza-frame" src="./images/container.jpg"/>
                <img src="./images/corpus.png"/>
                <div class="ingredients">
                  ${pizzaImage}
                </div>
              </div>
              ${actionButtons}
            </div>
          </div>
        `
        );
      });
    } else {
      this.containers.inventory.innerHTML = `
        <div></div>
          <p style="text-align: center; width: 100%">It seems you don't have any CryptoPizza yet</p>
        <div></div>
      `;
    }
  };

  openTab = ({ target }) => {
    const tabcontent = document.getElementsByClassName("tabcontent");

    for (let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    const tablinks = document.getElementsByClassName("tablinks");

    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove("active");
    }

    document.getElementById(`${target.id}-content`).style.display = "block";
    target.classList.add("active");
  };

  // Shows status on bottom of the page when some action happens
  showStatus = (text) => {
    const status = document.getElementById("status");
    status.innerHTML = text;
    status.className = "show";
    setTimeout(() => {
      status.className = status.className.replace("show", "");
    }, 3000);
  };

  // Updates container of Create new Pizza
  updateCreateInput = async ({ target: { value: pizzaName } }) => {
    if (pizzaName.length > 0) {
      const [address] = await this.web3.eth.getAccounts();

      try {
        const pizzaDna = await this.pizza.getRandomDna(pizzaName, address);
        const pizzaImage = this.generatePizzaImage(pizzaDna);

        this.containers.pizzaIngredients.innerHTML = pizzaImage;
      } catch (err) {
        this.showStatus(err.message);
      }
    } else {
      this.containers.pizzaIngredients.innerHTML = "";
    }
  };

  // Generates images from DNA - returns all of them in HTML
  generatePizzaImage = (dna) => {
    dna = dna.toString();
    const basis = (dna.substring(0, 2) % 2) + 1;
    const cheese = (dna.substring(2, 4) % 10) + 1;
    const meat = (dna.substring(4, 6) % 18) + 1;
    const spice = (dna.substring(6, 8) % 7) + 1;
    const veggie = (dna.substring(8, 10) % 22) + 1;

    let image = "";
    image += '<img src="./images/basis/basis-' + basis + '.png"/>';
    image += '<img src="./images/cheeses/cheese-' + cheese + '.png"/>';
    image += '<img src="./images/meats/meat-' + meat + '.png"/>';
    image += '<img src="./images/spices/spice-' + spice + '.png"/>';
    image += '<img src="./images/veggies/veggie-' + veggie + '.png"/>';

    return image;
  };

  createRandomPizza = async () => {
    // Validates name < 20 chars
    if (this.inputs.create.value.length > 20) {
      this.showStatus("Please name your Pizza with less than 20 characters");
      return;
    }

    // Validates name > 0 chars
    if (!this.inputs.create.value) {
      this.showStatus("Please enter valid name");
      return;
    }

    this.buttons.create.disabled = true;

    try {
      const [address] = await this.web3.eth.getAccounts();
      this.showStatus("Creating pizza");
      const { transactionHash } = await this.pizza.createRandomPizza(
        this.inputs.create.value,
        address
      );
      this.showStatus(`Token created: ${transactionHash}`);
      // If success, wait for confirmation of transaction,
      // then clear form values

      this.containers.pizzaIngredients.innerHTML = "";
      this.inputs.create.value = "";

      await this.loadInventory();

      this.tabs.inventory.click();
    } catch (err) {
      this.showStatus(err.message);
    }

    this.buttons.create.disabled = false;
  };

  eatPizza = async ({ target }) => {
    const confirmation = confirm("Are you sure?");

    if (!confirmation) {
      this.showStatus("Canceled");
      return;
    }

    target.disabled = true;
    document.getElementById(`pizza-${target.name}`).style = "opacity: 0.7";

    const [address] = await this.web3.eth.getAccounts();

    this.showStatus("Eating pizza");
    target.disabled = true;
    try {
      const { transactionHash } = await this.pizza.burn(target.name, address);
      this.showStatus(`Pizza is gone: ${transactionHash}`);
      this.loadInventory();
    } catch (err) {
      this.showStatus(err.message);
    }
    target.disabled = false;
  };

  giftPizza = async ({ target }) => {
    const sendTo = prompt("Enter address which should receive your Pizza");

    // To check if address is valid
    if (/^(0x)?[0-9a-f]{42}$/i.test(sendTo)) {
      this.showStatus("Please enter a valid address");
      return;
    }

    target.disabled = true;
    document.getElementById(`pizza-${target.name}`).style = "opacity: 0.7";

    const [address] = await this.web3.eth.getAccounts();

    this.showStatus("Sending pizza");
    target.disabled = true;
    try {
      const { transactionHash } = await this.pizza.giftPizza(
        sendTo,
        target.name,
        address
      );
      this.showStatus(`Pizza sent: ${transactionHash}`);
      this.loadInventory();
    } catch (err) {
      this.showStatus(err.message);
    }
    target.disabled = false;
  };
}

export default UI;
