'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import getAppFromBlockChain, { MemberStates } from '../service/getAppFromBlockchain';

// Define the shape of the context value
interface GroupContextValue {
  members: MemberStates | undefined;
  memberState: MemberStates | undefined;
  setMembers: React.Dispatch<React.SetStateAction<MemberStates | any>>;
  appID: number;
  setAppID: React.Dispatch<React.SetStateAction<number>>;
  getAppFromChain: (id: string) => Promise<void>
}

// Group the context
const GroupContext = createContext<GroupContextValue | undefined>(undefined);

// Group a provider component
interface GroupProviderProps {
  children: ReactNode;
}

export const GroupProvider: React.FC<GroupProviderProps> = ({ children }) => {
  const [members, setMembers] = useState<MemberStates | undefined>();
  const [appID, setAppID] = useState<number>(0);
  const [memberState,setMemberState] = useState<MemberStates>()

  const getAppFromChain = async(id:string) => {
    const members: MemberStates = JSON.parse(
      await getAppFromBlockChain(parseInt(id))
    );
    setMemberState(members)
  }

  // Define the context value
  const contextValue: GroupContextValue = {
    members,
    setMembers,
    setAppID,
    appID,memberState,
    getAppFromChain
  };
  
  // Provide the context value to the components
  return (
    <GroupContext.Provider value={contextValue}>
      {children}
    </GroupContext.Provider>
  );
};

// Custom hook to consume the context
export const useGroup = (): GroupContextValue => {
  const context = useContext(GroupContext);
  if (!context) {
    throw new Error('useGroup must be used within a GroupProvider');
  }
  return context;
};
