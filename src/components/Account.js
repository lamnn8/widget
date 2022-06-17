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
import ERC20ABI from "../abi/erc20abi.json";

export const Account = () => {
  const wallet = useWallet();
  const signer = useSelector((state) => state.ether.signer);
  const [listToken, setListToken] = useState([]);
  const onSubmit = async ({ amount, address }) => {
    try {
      const txHash = await signer.sendTransaction({
        to: ethers.utils.getAddress(address),
        value: Number(amount * 1e18).toString(),
      });
      console.log(txHash, "txHash");
    } catch (err) {
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

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const getAllToken = async () => {
    const tokenaddress = ["0xae18f6c514a500a30eaff19f1d1b7b320986eb72"];
    const myaddresss = wallet.account;
    for (let contract of tokenaddress) {
      const token = new ethers.Contract(contract, ERC20ABI, signer);

      const tokenBalance = await token.balanceOf(myaddresss);
      const symbol = await token.symbol();

      const balance = +tokenBalance / 1e18;
      setListToken((ktx) => [...ktx, { symbol: symbol, balanceOf: balance }]);
    }
  };
  return (
    <div>
      <div className="account-header">
        <div>
          <p>Account: {wallet && wallet.account}</p>
          <p>
            Balance:
            {wallet &&
              formatNumber(ethers.utils.formatUnits(wallet.balance, "ether"))}
          </p>
        </div>

        <div>
          {wallet.account ? (
            <>
              <Button
                variant="contained"
                color="success"
                onClick={() => wallet.reset()}
              >
                disconnect
              </Button>
            </>
          ) : (
            <div className="connect-button">
              <Button
                variant="contained"
                color="success"
                onClick={() => wallet.connect()}
              >
                Connect Metamask
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="account-content">
        {/* <button onClick={() => getAllToken()}>getalltoken</button> */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              {/* <FormControl sx={{ m: 1, minWidth: 220 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Network
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  label="Netword"
                  required
                  value={network}
                  {...register("network", { onChange: (e) => handleChange(e) })}
                >
                  <MenuItem value={56}>Binance smart chain</MenuItem>

                 
                  <MenuItem value={4}>Rinkebi</MenuItem>
                </Select>
              </FormControl> */}
              <FormControl sx={{ m: 1, minWidth: 320 }}>
                <TextField
                  id="outlined-basic"
                  label="Address"
                  variant="outlined"
                  {...register("address", {
                    required: true,
                    pattern: /^0x[a-fA-F0-9]{40}$/g,
                  })}
                />
              </FormControl>
            </CardContent>
          </Card>
          <Card style={{ marginTop: "2rem" }}>
            <CardContent>
              <FormControl sx={{ m: 1, minWidth: 220 }}>
                <TextField
                  id="outlined-basic"
                  label="Amount"
                  variant="outlined"
                  {...register("amount", {
                    required: true,
                    // pattern: /^[0-9]*$/,
                  })}
                />
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Token
                </InputLabel>
                <Select
                  value={fiat}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  {...register("fiat", {
                    required: true,
                    onChange: (e) => handleFiat(e),
                  })}
                >
                  <MenuItem value="USDT">
                    <em>USDT</em>
                  </MenuItem>
                  <MenuItem value={"BNB"}>BNB</MenuItem>
                  <MenuItem value={"BTC"}>BTC</MenuItem>
                  <MenuItem value={"ETH"}>ETH</MenuItem>
                </Select>
              </FormControl>
              <ul>
                {listToken.map((value) => {
                  return <li>{value.symbol}</li>;
                })}
              </ul>
            </CardContent>
          </Card>
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <Button variant="contained" color="success" type="submit">
              Payment
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
