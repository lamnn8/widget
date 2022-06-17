import { useSelector } from "react-redux";
export const useSigner = () => {
  return useSelector((state) => state.ether.signer);
};
export const useProvider = () => {
  return useSelector((state) => state.ether.provider);
};
