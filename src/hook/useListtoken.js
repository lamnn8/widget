import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useWallet } from "use-wallet";
import { ethers } from "ethers";
import ERC20ABI from "../abi/erc20abi.json";
export const useListToken = () => {
  const [listToken, setListToken] = useState([]);
  const wallet = useWallet();
  const signer = useSelector((state) => state.ether.signer);
  useEffect(() => {
    const getListToken = async () => {
      const tokenaddress = [
        "0xae13d989dac2f0debff460ac112a837c89baa7cd",
        "0xae18f6c514a500a30eaff19f1d1b7b320986eb72",
        "0x93fa5396F0007BB8302Fdd7e0dcFf751Ae8A5137",
      ];
      const myaddresss = wallet.account;
      try {
        for (let contract of tokenaddress) {
          const token = new ethers.Contract(contract, ERC20ABI, signer);
          const tokenBalance = await token.balanceOf(myaddresss);
          const symbol = await token.symbol();
          const balance = +tokenBalance / 1e18;
          setListToken((ktx) => [
            ...ktx,
            { symbol: symbol, balanceOf: balance },
          ]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getListToken();
  }, []);

  return listToken;
};
