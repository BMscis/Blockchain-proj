'use client';
import { NewGroupParams, NewgroupResponseParams } from '@/utils/client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context value
interface CreateContextValue {
  group: NewgroupResponseParams | undefined;
  setGroup: React.Dispatch<React.SetStateAction<NewgroupResponseParams | any>>;
}

// Create the context
const CreateContext = createContext<CreateContextValue | undefined>(undefined);

// Create a provider component
interface CreateProviderProps {
  children: ReactNode;
}

export const CreateProvider: React.FC<CreateProviderProps> = ({ children }) => {
  const [group, setGroup] = useState<NewgroupResponseParams | undefined>();

  // Define the context value
  const contextValue: CreateContextValue = {
    group,
    setGroup,
  };

  // Provide the context value to the components
  return (
    <CreateContext.Provider value={contextValue}>
      {children}
    </CreateContext.Provider>
  );
};

// Custom hook to consume the context
export const useCreate = (): CreateContextValue => {
  const context = useContext(CreateContext);
  if (!context) {
    throw new Error('useCreate must be used within a CreateProvider');
  }
  return context;
};
