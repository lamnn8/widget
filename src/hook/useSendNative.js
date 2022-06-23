export const useSendNative =()=>{
    try {
        const txHash = await signer.sendTransaction({
          to: ethers.utils.getAddress(address),
          value: Number(amount * 1e18).toString(),
        });
        console.log(txHash, "txHash");
      } catch (err) {
        console.log(err.message);
      }
}