import { React, useState, useEffect } from "react";
import { ethers } from "ethers";
import { useWallet } from "use-wallet";
import Button from "@mui/material/Button";
import { formatNumber } from "../utils/formatBalance";
import "./account.scss";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { switchChainMetaMask } from "../utils/switchChain";
import { useParamater } from "../hook/useParamater";
import { useGetToken } from "../hook/useGetToken";
import { useERC20Contract } from "../hook/useContract";
//spinner
import { SpinnerCircular } from "spinners-react";
//component
import { AppButton } from "./AppButton";
import { CardTitle } from "reactstrap";
export const Account = () => {
  const wallet = useWallet();
  const { signer } = useSelector((state) => state.ether);
  const { amount, recipient, contract } = useParamater();
  const { symbol, balance } = useGetToken();
  const useToken = useERC20Contract(contract, signer);
  const onSubmit = async ({ amount, address }) => {
    try {
      const txHash = await useToken.transfer(
        address,
        Number(amount * 1e18).toString()
      );
      console.log(txHash, "txHash");
      alert(txHash);
    } catch (err) {
      alert(err.message);
      console.log(err.message);
    }
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [network, setNetwork] = useState("");
  const [fiat, setFiat] = useState("");
  const handleChange = (event) => {
    setNetwork(event.target.value);
    switchChainMetaMask(network);
  };
  const handleFiat = (event) => {
    setFiat(event.target.value);
  };
  useEffect(() => {
    switchChainMetaMask(56);
    wallet.connect();
  }, []);
  return (
    <div>
      <div className="account-header">
        <div>
          {/* <p>Account: {wallet && wallet.account}</p>
          <p>
            Balance:
            {wallet &&
              formatNumber(
                ethers.utils.formatUnits(wallet.balance, "ether")
              )}{" "}
            BNB
          </p> */}
        </div>
        <div>
          {wallet.account ? (
            <AppButton onClick={() => wallet.reset()}>disconnect</AppButton>
          ) : (
            <div className="connect-button">
              <AppButton onClick={() => wallet.connect()}>connect</AppButton>
            </div>
          )}
        </div>
      </div>
      <div className="account-content">
        <form onSubmit={handleSubmit(onSubmit)}>
          {symbol ? (
            <Card sx={{ minWidth: 420 }}>
              <CardContent>
                <div className="account-title"> Payment getway</div>
                <br />
                <FormControl sx={{ m: 1, minWidth: 420 }}>
                  <TextField
                    id="outlined-basic"
                    label="Recipient"
                    variant="outlined"
                    {...register("address", {
                      required: true,
                      pattern: /^0x[a-fA-F0-9]{40}$/g,
                      value: recipient,
                    })}
                    disabled={true}
                  />
                </FormControl>
                <br />
                <FormControl sx={{ m: 1, minWidth: 420 }}>
                  <TextField
                    id="outlined-basic"
                    label="Amount"
                    variant="outlined"
                    {...register("amount", {
                      required: true,
                      pattern: /^[0-9]*$/,
                      value: amount,
                    })}
                    disabled={true}
                  />
                </FormControl>
                <br />
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  Balance: {balance} {symbol}
                </FormControl>
                <div style={{ textAlign: "center", marginTop: "2rem" }}>
                  {wallet.account ? (
                    <Button
                      variant="contained"
                      type="submit"
                      className="button-custom primary  "
                    >
                      Transfers
                    </Button>
                  ) : (
                    <AppButton onClick={() => wallet.connect()}>
                      Connect Metamask
                    </AppButton>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <div style={{ textAlign: "center" }}>
              <SpinnerCircular thickness={200} size={100} color="#00a4fa" />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
