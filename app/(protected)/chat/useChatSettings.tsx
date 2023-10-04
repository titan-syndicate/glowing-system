import { createContext, useContext, useState } from 'react';

const SharedStateContext = createContext(null);

export { ChatSettingsProvider, useChatSettings };

interface ChatSettings {
  SDPAnswerRemote: string;
  SDPOfferLocal: string;
  SDPOfferRemote: string;
}

function useChatSettings() {
  const contextValue = useContext(SharedStateContext);
  if (!contextValue) {
    throw new Error('useSharedState must be used within a SharedStateProvider');
  }
  return contextValue;
}

function ChatSettingsProvider({ children }: { children: React.ReactNode }}) {
  const [state, setState] = useState(null); // Define your state and updater here

  return (
    <SharedStateContext.Provider value={{ state, setState }}>
      {children}
    </SharedStateContext.Provider>
  );
}
