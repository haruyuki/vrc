import React, { createContext, useContext, useState } from 'react';

interface CommissionLoadingContextType {
  isLoadingCommissions: boolean;
  setIsLoadingCommissions: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommissionLoadingContext = createContext<CommissionLoadingContextType | undefined>(undefined);

export const CommissionLoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoadingCommissions, setIsLoadingCommissions] = useState(true);
  return (
    <CommissionLoadingContext.Provider value={{ isLoadingCommissions, setIsLoadingCommissions }}>
      {children}
    </CommissionLoadingContext.Provider>
  );
};

export const useCommissionLoading = () => {
  const context = useContext(CommissionLoadingContext);
  if (!context) {
    throw new Error('useCommissionLoading must be used within a CommissionLoadingProvider');
  }
  return context;
};

