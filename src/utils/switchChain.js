import { BigNumber, ethers } from "ethers";
import { ChainId } from "../redux";
export const switchChainMetaMask = async (chainId) => {
  addChainMettaMask(+BigNumber.from(ChainId));
  try {
    await window.web3.currentProvider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: chainId }],
    });
  } catch (err) {
    console.log(err.message);
  }
};
export const addChainMettaMask = async (chain) => {
  if (chain == 97) {
    return await window.web3.currentProvider.request({
      id: 1,
      jsonrpc: "2.0",
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: "0x61",
          chainName: "BSC Testnet",
          rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
          nativeCurrency: {
            name: "BSC",
            symbol: "BNB",
            decimals: 18,
          },
          blockExplorerUrls: ["https://testnet.bscscan.com"],
        },
      ],
    });
  }
  if (chain == 56) {
    await window.web3.currentProvider.request({
      id: 2,
      jsonrpc: "2.0",
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: "0x38",
          chainName: "BSC",
          rpcUrls: ["https://bsc-dataseed.binance.org"],
          nativeCurrency: {
            name: "BSC",
            symbol: "BNB",
            decimals: 18,
          },
          blockExplorerUrls: ["https://bscscan.com"],
        },
      ],
    });
  }

  if (chain == 4) {
    await window.web3.currentProvider.request({
      id: 2,
      jsonrpc: "2.0",
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: "0x4",
          chainName: "Rinkebi",
          rpcUrls: [
            "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
          ],
          nativeCurrency: {
            name: "ETH",
            symbol: "ETH",
            decimals: 18,
          },
          blockExplorerUrls: ["https://rinkeby.etherscan.io"],
        },
      ],
    });
  }
};
export const handleChainId = (chain) => {
  if (chain !== ChainId) {
    switchChainMetaMask(ethers.utils.hexlify(ChainId));
  }
};
