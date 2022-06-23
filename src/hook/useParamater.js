import { useLocation } from "react-router-dom";
export const useParamater = () => {
  const search = useLocation().search;
  const contract = new URLSearchParams(search).get("contract");
  const amount = new URLSearchParams(search).get("amount");
  const recipient = new URLSearchParams(search).get("recipient");
  return { contract, amount, recipient };
};
