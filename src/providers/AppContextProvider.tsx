import React from 'react'
import { SearchProvider } from './SearchProvider/SearchContext'

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <SearchProvider>{children}</SearchProvider>
}

export default AppContextProvider
