import { createSlice } from "@reduxjs/toolkit";
import { ethers } from "ethers";

// provider mặc định, khi người dùng không có ví hoặc chưa có ví thì vẫn hiển thị được data
const defaultProvider = () => {
  return new ethers.providers.JsonRpcProvider(
    "https://data-seed-prebsc-2-s2.binance.org:8545"
  );
};

const initialState = {
  signer: defaultProvider(),
  provider: defaultProvider(),
};

export const langSlice = createSlice({
  name: "ethState",
  initialState: initialState,
  reducers: {
    //update lại provider khi người dùng đã kết nối (vì mỗi lại ví có provider khác nhau, metamask 1 kiểu, trust 1 kiểu...)
    updateProvider: (state, action) => {
      state.provider = action.payload
        ? new ethers.providers.Web3Provider(action.payload)
        : defaultProvider();
    },
    //tương tự như updateProvider
    updateSigner: (state, action) => {
      //action.payload = account
      state.signer = state.provider.getSigner(action.payload);
    },
  },
});

export const ChainId = 97;
export const { updateProvider, updateSigner } = langSlice.actions;
export default langSlice.reducer;

// "https://data-seed-prebsc-2-s2.binance.org:8545"
