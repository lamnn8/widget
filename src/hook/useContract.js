import { ethers } from "ethers";
import ERC20ABI from "../abi/erc20abi.json";
import { useProvider } from "../redux/hook";
export const useContract = (address, abi, signer) => {
  const provider = useProvider();
  const signerOrProvider = signer ?? provider;
  return new ethers.Contract(address, abi, signerOrProvider);
};
export const useERC20Contract = (address, signer) => {
  return useContract(address, ERC20ABI, signer);
};
