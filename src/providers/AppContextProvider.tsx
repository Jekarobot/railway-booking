import React from 'react'
import { SearchProvider } from './SearchProvider/SearchContext'
import { TrainDetailsProvider } from './TrainDetailsProvider/TrainDetailsProvider'

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SearchProvider>
      <TrainDetailsProvider>{children}</TrainDetailsProvider>
    </SearchProvider>
  )
}

export default AppContextProvider
