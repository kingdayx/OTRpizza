import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", async () => {
      // Modern dapp browsers...
      const provider = await detectEthereumProvider();

      if (provider) {
        startApp(provider); // Initialize your app
      } else {
        console.log("Please install MetaMask!");
      }

      function startApp(provider) {
        // If the provider returned by detectEthereumProvider is not the same as
        // window.ethereum, something is overwriting it, perhaps another wallet.
        if (provider !== window.ethereum) {
          console.error("Do you have multiple wallets installed?");
        }
        // Access the decentralized web!
      }

      /**********************************************************/
      /* Handle chain (network) and chainChanged (per EIP-1193) */
      /**********************************************************/

      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      handleChainChanged(chainId);

      window.ethereum.on("chainChanged", handleChainChanged);

      function handleChainChanged(_chainId) {
        // We recommend reloading the page, unless you must do otherwise
        window.location.reload();
      }

      /***********************************************************/
      /* Handle user accounts and accountsChanged (per EIP-1193) */
      /***********************************************************/

      let currentAccount = null;
      window.ethereum
        .request({ method: "eth_accounts" })
        .then(handleAccountsChanged)
        .catch((err) => {
          // Some unexpected error.
          // For backwards compatibility reasons, if no accounts are available,
          // eth_accounts will return an empty array.
          console.error(err);
        });

      // Note that this event is emitted on page load.
      // If the array of accounts is non-empty, you're already
      // connected.
      window.ethereum.on("accountsChanged", handleAccountsChanged);

      // For now, 'eth_accounts' will continue to always return an array
      function handleAccountsChanged(accounts) {
        if (accounts.length === 0) {
          // MetaMask is locked or the user has not connected any accounts
          console.log("Please connect to MetaMask.");
        } else if (accounts[0] !== currentAccount) {
          currentAccount = accounts[0];
          // Do any other work!
        }
      }

      /*********************************************/
      /* Access the user's accounts (per EIP-1102) */
      /*********************************************/

      // You should only attempt to request the user's accounts in response to user
      // interaction, such as a button click.
      // Otherwise, you popup-spam the user like it's 1999.
      // If you fail to retrieve the user's account(s), you should encourage the user
      // to initiate the attempt.
      document.getElementById("connectButton", connect);

      // While you are awaiting the call to eth_requestAccounts, you should disable
      // any buttons the user can click to initiate the request.
      // MetaMask will reject any additional requests while the first is still
      // pending.
      function connect() {
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then(handleAccountsChanged)
          .catch((err) => {
            if (err.code === 4001) {
              // EIP-1193 userRejectedRequest error
              // If this happens, the user rejected the connection request.
              console.log("Please connect to MetaMask.");
            } else {
              console.error(err);
            }
          });
      }

      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.eth_requestAccount();
          // Acccounts now exposed
          console.log(web3);
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
        console.log("Injected web3 detected.");
        resolve(web3);
      }
      // Fallback to localhost; use dev console port by default...
      else {
        const web3 = new Web3();
        const provider = new Web3.providers.HttpProvider(
          "https://ropsten.infura.io/v3/b33e244c7e2f486bb0252feb96b73b7d"
        );
        console.log(provider);
        web3.setProvider(provider);
        console.log("No web3 instance injected, using Local web3.");
        resolve(web3);
      }
    });
  });

export default getWeb3;
