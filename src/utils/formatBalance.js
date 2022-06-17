import { BigNumber, ethers } from "ethers";
import { formatUnits } from "ethers/lib/utils";

export const BIG_ZERO = BigNumber.from(0);
export const BIG_ONE = BigNumber.from(1);
export const BIG_NINE = BigNumber.from(9);
export const BIG_TEN = BigNumber.from(10);

/**
 * Take a formatted amount, e.g. 15 BNB and convert it to full decimal value, e.g. 15000000000000000
 */
export const getDecimalAmount = (amount, decimals = 18) => {
  return BigNumber.from(amount).mul(BIG_TEN.pow(decimals));
};

export const getBalanceAmount = (amount, decimals = 18) => {
  return BigNumber.from(amount).div(BIG_TEN.pow(decimals));
};

/**
 * This function is not really necessary but is used throughout the site.
 */
export const getBalanceNumber = (balance, decimals = 18) => {
  return getBalanceAmount(balance, decimals).toNumber();
};

export const formatNumber = (number, minPrecision = 2, maxPrecision = 2) => {
  const options = {
    minimumFractionDigits: minPrecision,
    maximumFractionDigits: maxPrecision,
  };
  return number.toLocaleString(undefined, options);
};

/**
 * Method to format the display of wei given an ethers.BigNumber object
 * Note: does NOT round
 */
export const formatBigNumber = (
  number,
  displayDecimals = 18,
  decimals = 18
) => {
  const remainder = number.mod(
    ethers.BigNumber.from(10).pow(decimals - displayDecimals)
  );
  return formatUnits(number.sub(remainder), decimals);
};

/**
 * Method to format the display of wei given an ethers.BigNumber object with toFixed
 * Note: rounds
 */
export const formatBigNumberToFixed = (
  number,
  displayDecimals = 18,
  decimals = 18
) => {
  const formattedString = formatUnits(number, decimals);
  return (+formattedString).toFixed(displayDecimals);
};

/**
 * Formats a FixedNumber like BigNumber
 * i.e. Formats 9763410526137450427.1196 into 9.763 (3 display decimals)
 */
export const formatFixedNumber = (
  number,
  displayDecimals = 18,
  decimals = 18
) => {
  // Remove decimal
  const [leftSide] = number.toString().split(".");
  return formatBigNumber(
    ethers.BigNumber.from(leftSide),
    displayDecimals,
    decimals
  );
};
