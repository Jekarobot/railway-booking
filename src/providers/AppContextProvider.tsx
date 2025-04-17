import React from 'react'
import { SearchProvider } from './SearchProvider/SearchContext'
import { TrainDetailsProvider } from './TrainDetailsProvider/TrainDetailsProvider'
import { OrderProvider } from './OrderBuildProvider/OrderContext'
import { PopupProvider } from './PopupProvider/PopupContext'
import { CustomAlert } from '../features/popups/CustomPopup'

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <PopupProvider>
      <OrderProvider>
        <SearchProvider>
          <TrainDetailsProvider>
            {children}
            <CustomAlert />
          </TrainDetailsProvider>
        </SearchProvider>
      </OrderProvider>
    </PopupProvider>
  )
}

export default AppContextProvider
