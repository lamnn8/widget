import "./styles.css";
import { useWallet } from "use-wallet";
import { Account } from "./components/Account";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateProvider, updateSigner } from "./redux";
import Container from "@mui/material/Container";
import "../src/styles/home.scss";
const App = () => {
  const { account, ethereum } = useWallet();
  const dispatch = useDispatch();

  useEffect(() => {
    if (ethereum) {
      dispatch(updateProvider(ethereum));
    }
    if (account) {
      dispatch(updateSigner(account));
    }
  }, [ethereum, account]);

  return (
    <Container>
      <Account />
    </Container>
  );
};

export default App;
