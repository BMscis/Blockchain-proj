export function ellipseAddress(address = ``, width = 6): string {
  return address ? `${address.slice(0, width)}...${address.slice(-width)}` : address;
}
export const algodConfig = {
  server: "https://testnet-api.algonode.cloud",
  port: "",
  token: "",
  network: "testnet",
};
