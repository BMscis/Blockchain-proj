import { getIndexer } from '@/utils/ellipseAddress';
import { ABIAddressType, ABITupleType, encodeAddress, modelsv2 } from 'algosdk';
import { Application } from 'algosdk/dist/types/client/v2/indexer/models/types';

export interface MemberBalance {
  address: string;
  savings: number;
  loans: number;
}
export interface MemberStates {
  governor: string;
  memberA: MemberBalance;
  memberB: MemberBalance;
  memberC: MemberBalance;
  memberD: MemberBalance;
}
interface ApplicationResponse {
  application: Application;
}
interface GlobalState {
  key: string;
  value: modelsv2.TealValue;
}

interface AppInfo {
  app: any;
}

enum GlobalStateSchema {
  member1 = 'ad',
  member1_savings = 'as',
  member1_loans = 'ab',
  member2 = 'ad2',
  member2_savings = 'as2',
  member2_loans = 'ab2',
  member3 = 'ad3',
  member3_savings = 'as3',
  member3_loans = 'ab3',
  member4 = 'ad4',
  member4_savings = 'as4',
  member4_loans = 'ab4',
  governor = 'g',
}

const getAppFromBlockChain = async (appID: number): Promise<string> => {
  const indexer = getIndexer();
  const res = (await indexer
    .lookupApplications(appID)
    .includeAll(true)
    .do()) as ApplicationResponse;
  if (!res) {
    throw new Error(`missing application: ${appID}`);
  }

  const params = res.application.params as any;

  const globalState = params['global-state'] as GlobalState[];


  if (!globalState) {
    throw new Error(`missing global state: ${appID}`);
  }
  const decodedState = decodeGlobalState(globalState);
  return JSON.stringify(decodedState);
};

const decodeGlobalState = (globalState: GlobalState[]): MemberStates => {
  const decodedState: MemberStates = {
    governor: '',
    memberA: {
      address: '',
      savings: 0,
      loans: 0,
    },
    memberB: {
      address: '',
      savings: 0,
      loans: 0,
    },
    memberC: {
      address: '',
      savings: 0,
      loans: 0,
    },
    memberD: {
      address: '',
      savings: 0,
      loans: 0,
    },
  };
  try {
    globalState.map((state) => {
      const stateKey = decodeBytes(state.key);
      switch (stateKey) {
        case GlobalStateSchema.governor:
          const publicKey = decodeBytes(state.value.bytes);
          decodedState.governor = decodeAddress(state.value.bytes);
          break;

        case GlobalStateSchema.member1:
          const publicKeyA = decodeBytes(state.value.bytes);
          decodedState.memberA.address = decodeAddress(state.value.bytes);
          break;
        case GlobalStateSchema.member1_savings:
          decodedState.memberA.savings = Number(state.value.uint);
          break;
        case GlobalStateSchema.member1_loans:
          decodedState.memberA.loans = Number(state.value.uint);
          break;

        case GlobalStateSchema.member2:
          const publicKeyB = decodeBytes(state.value.bytes);
          decodedState.memberB.address = decodeAddress(state.value.bytes);
          break;
        case GlobalStateSchema.member2_savings:
          decodedState.memberB.savings = Number(state.value.uint);
          break;
        case GlobalStateSchema.member2_loans:
          decodedState.memberB.loans = Number(state.value.uint);
          break;

        case GlobalStateSchema.member3:
          const publicKeyC = decodeBytes(state.value.bytes);
          decodedState.memberC.address = decodeAddress(state.value.bytes);
          break;
        case GlobalStateSchema.member3_savings:
          decodedState.memberC.savings = Number(state.value.uint);
          break;
        case GlobalStateSchema.member3_loans:
          decodedState.memberC.loans = Number(state.value.uint);
          break;

        case GlobalStateSchema.member4:
          const publicKeyD = decodeBytes(state.value.bytes);
          decodedState.memberD.address = decodeAddress(state.value.bytes);
          break;
        case GlobalStateSchema.member4_savings:
          decodedState.memberD.savings = Number(state.value.uint);
          break;
        case GlobalStateSchema.member4_loans:
          decodedState.memberD.loans = Number(state.value.uint);
          break;

        default:
          break;
      }
    });
    return decodedState;
  } catch (error) {
    throw error;
  }
};

//convert bytes to string
export const decodeBytes = (s: string): string =>
  Buffer.from(s, 'base64').toString();

export const decodeAddress = (s: string): string => {
  const t = ABIAddressType.from('address');
  const bufferString = Buffer.from(s, 'base64');
  const decoder = t.decode(bufferString).valueOf() as string;
  return decoder;
};
export const decodeMember = (s: string) => {
  const memberTupleType = ABITupleType.from(
    '(address,string,string,string,string,string)'
  );
  return {
    address: 'ZZRBBNIEN6IHZNYN2455O36X2ZSQEJF6P5UCJAEZ53UCP5R4NW57DRTZT4',
    savings: 0,
    loans: 0,
    loanLimit: 0,
    interest: 0,
    loanDuration: 0,
  };
};
export default getAppFromBlockChain;
