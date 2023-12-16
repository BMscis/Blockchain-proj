import { MethodArgs, TableBankingClient } from '@/contracts/table_banking';
import { algodConfig, microAlgoFee, getIndexer } from '@/utils/ellipseAddress';
import { getAlgoClient } from '@algorandfoundation/algokit-utils';
import {
  AppDetails,
  AppSpecAppDetails,
} from '@algorandfoundation/algokit-utils/types/app-client';
import {
  TransactionSigner,
  encodeAddress,
  makePaymentTxnWithSuggestedParamsFromObject,
} from 'algosdk';
import { EnqueueSnackbar } from 'notistack';
import * as appSpec from '@/contracts/application.json';
export interface TxnSigner {
  addr: string;
  signer: TransactionSigner;
}
export interface NewGroupParams {
  transactionSigner: TxnSigner;
  snack: EnqueueSnackbar;
}

export interface NewgroupResponseParams {
  appId: string;
  address: string;
  appAddress: string;
}
interface AddMembersParams {
  members: string[];
  appID: number;
  transactionSigner: TxnSigner;
  snack: EnqueueSnackbar;
}
interface AddFundsParams {
  amount: number;
  appID: number;
  transactionSigner: TxnSigner;
  snack: EnqueueSnackbar;
}
export const createNewGroup = async (
  params: NewGroupParams
): Promise<NewgroupResponseParams> => {
  const snack = params.snack;
  const createGroup = async () => {
    const appName = `TBG-${Math.random() * 100}`;
    const indexer = getIndexer();
    const algodClient = getAlgoClient(algodConfig);
    const appDetails: AppDetails = {
      resolveBy: 'creatorAndName',
      sender: params.transactionSigner,
      creatorAddress: params.transactionSigner.addr,
      findExistingUsing: indexer,
      name: appName,
    };
    const deployParams = {
      allowDelete: false,
      allowUpdate: true,
      onSchemaBreak: 'replace',
      onUpdate: 'update',
    };

    const client = new TableBankingClient(appDetails, algodClient);
    const suggestedParams = await algodClient.getTransactionParams().do();
    suggestedParams.fee = microAlgoFee;
    suggestedParams.flatFee = true;

    return client;
  };

  const createBare = async (client: TableBankingClient) => {
    snack(`Please Sign transaction: `, { variant: 'info' });
    return await client.create
      .bare({
        onCompleteAction: 'no_op',
        deployTimeParams: {
          UPDATABLE: 1,
          DELETABLE: 1,
        },
      })
      .catch((e: Error) => {
        throw e;
      });
  };

  const banking_Client = await createGroup();

  if (!banking_Client) {
    snack(`Something went wrong: `, { variant: 'error' });
    throw new Error('Missing banking client');
  }

  const resp = await createBare(banking_Client);

  if (!resp) {
    snack(`Something went wrong: `, { variant: 'error' });
    throw new Error('Missing createBare response');
  }
  const appInfo = decodeAppResponse(resp);
  params.snack(`Successfully created APP: ${appInfo.appId}`, {
    variant: 'success',
  });
  return appInfo;
};

export const addMembers = async (
  params: AddMembersParams
): Promise<boolean> => {
  const indexer = getIndexer();
  const algodClient = getAlgoClient(algodConfig);
  const appDetails: AppSpecAppDetails = {
    resolveBy: 'id',
    app: JSON.stringify(appSpec),
    sender: params.transactionSigner,
    id: params.appID,
  };
  try {
    const client = new TableBankingClient(appDetails, algodClient);

    const txnParams = {
      accounts: [params.members[0]],
    };
    const setMemberParams: MethodArgs<'set_members(address,address,address,address)uint64'> =
      [
        ...params.members,
      ] as MethodArgs<'set_members(address,address,address,address)uint64'>;
    params.snack('Please Sign transaction: ', { variant: 'info' });
    const setMembers = await client.setMembers(setMemberParams, txnParams);

    params.snack('Successfully added members: ', { variant: 'success' });
    return true;
  } catch (error) {
    return false;
  }
};
const decodeAppResponse = (response: any): NewgroupResponseParams => {
  const { appAddress, appId, transaction } = response;

  const { publicKey } = transaction.from;
  const pubKey = encodeAddress(publicKey);

  return { appId, address: pubKey, appAddress };
};

export const addFunds = async (params: AddFundsParams): Promise<boolean> => {
  const algodClient = getAlgoClient(algodConfig);
  const appDetails: AppSpecAppDetails = {
    resolveBy: 'id',
    app: JSON.stringify(appSpec),
    sender: params.transactionSigner,
    id: params.appID,
  };
  const suggestedParams = await algodClient.getTransactionParams().do();
  suggestedParams.fee = microAlgoFee;
  suggestedParams.flatFee = true;
  try {
    const client = new TableBankingClient(appDetails, algodClient);
    const appAddress = (await client.appClient.getAppReference()).appAddress;
    const txnParams = {
      accounts: [params.transactionSigner.addr],
    };
    const pay = makePaymentTxnWithSuggestedParamsFromObject({
      from: params.transactionSigner.addr,
      to: appAddress,
      amount: params.amount * 1000000,
      suggestedParams: suggestedParams,
      rekeyTo: undefined,
      closeRemainderTo: undefined,
    });
    const contributeParams: MethodArgs<'contribute(pay,uint64)uint64'> = [
      pay,
      1,
    ];
    params.snack('Please Sign transaction: ', { variant: 'info' });
    const contribute = await client.contribute(contributeParams, txnParams);
    params.snack(`Successfully contributed ${params.amount} ALGO`, {
      variant: 'success',
    });
    return true;
  } catch (error) {
    return false;
  }
};
