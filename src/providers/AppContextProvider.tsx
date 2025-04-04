import React from 'react'
import { SearchProvider } from './SearchProvider/SearchContext'
import { TrainDetailsProvider } from './TrainDetailsProvider/TrainDetailsProvider'
import { OrderProvider } from './OrderBuildProvider/OrderContext'

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <OrderProvider>
      <SearchProvider>
        <TrainDetailsProvider>{children}</TrainDetailsProvider>
      </SearchProvider>
    </OrderProvider>
  )
}

export default AppContextProvider
