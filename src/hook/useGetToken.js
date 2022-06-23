import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useWallet } from "use-wallet";
import { ethers } from "ethers";
import ERC20ABI from "../abi/erc20abi.json";
import { useParamater } from "./useParamater";
export const useGetToken = () => {
  const [token, setToken] = useState({});
  const wallet = useWallet();
  const { contract } = useParamater();
  const signer = useSelector((state) => state.ether.signer);
  useEffect(() => {
    const getToken = async () => {
      try {
        const myaddresss = wallet.account;
        const token = new ethers.Contract(contract, ERC20ABI, signer);
        const tokenBalance = await token.balanceOf(myaddresss);
        const symbol = await token.symbol();
        const balance = +tokenBalance / 1e18;
        setToken({ symbol: symbol, balance: balance });
      } catch (err) {
        console.log(err);
      }
    };
    getToken();
  });
  return token;
};
