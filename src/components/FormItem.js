export const ItemToken = () => {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-helper-label">Token</InputLabel>
      <Select
        value={fiat}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        {...register("fiat", {
          required: true,
          onChange: (e) => handleFiat(e),
        })}
      >
        {listToken.map((value, index) => {
          const { symbol, balanceOf } = value;

          return <MenuItem value={symbol}> {symbol}</MenuItem>;
        })}
      </Select>
    </FormControl>
  );
};
