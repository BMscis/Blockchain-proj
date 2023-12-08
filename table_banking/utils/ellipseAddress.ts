import { getAlgoIndexerClient } from '@algorandfoundation/algokit-utils';

export function ellipseAddress(address = ``, width = 6): string {
  return address
    ? `${address.slice(0, width)}...${address.slice(-width)}`
    : address;
}
export const algodConfig = {
  server: 'https://testnet-api.algonode.cloud',
  port: '',
  token: '',
  network: 'testnet',
};
export const indexerConfig = {
  server: 'https://testnet-idx.algonode.cloud',
  port: '',
  token: '',
  network: 'testnet',
};
export const microAlgoFee = 10000;

export const getIndexer = () => {
  return getAlgoIndexerClient(indexerConfig);
};
