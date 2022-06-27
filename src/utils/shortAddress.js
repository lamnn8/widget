export function showShortAddress(address, start, end) {
  let first = address.substring(0, start || 6);
  let last = address.substring(address.length, address.length - (end || 4));
  return `${first}...${last}`;
}
