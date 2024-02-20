import React, {createContext, useState} from 'react';

export interface ILoaderContext {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoaderContext = createContext<ILoaderContext>({
  isLoading: false,
  setIsLoading: () => null,
});

export const LoaderProvider = ({children}: any) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{isLoading, setIsLoading}}>
      {children}
    </LoaderContext.Provider>
  );
};
