import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of your global state
interface GlobalState {
  // Example state field
  exampleField: string;
  // Add additional fields as needed
}

// Define the type for the context value
interface GlobalContextType {
  globalState: GlobalState;
  setGlobalState: React.Dispatch<React.SetStateAction<GlobalState>>;
}

// Create a context with an undefined default value but specify the type
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Define the props for the GlobalProvider including children
interface GlobalProviderProps {
  children: ReactNode;
}

// Provider component
export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [globalState, setGlobalState] = useState<GlobalState>({ exampleField: '' });

  return (
    <GlobalContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Hook for easy access to the context
export const useGlobal = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }
  return context;
};