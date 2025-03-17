import React, { createContext, useContext, useState } from 'react'

// Интерфейс для параметров поиска
export interface SearchParams {
  fromCityInput: string
  toCityInput: string
  fromCityId: string
  toCityId: string
  dateStart?: string
  dateEnd?: string
  dateStartArrival?: string
  dateEndArrival?: string
  haveFirstClass?: boolean
  haveSecondClass?: boolean
  haveThirdClass?: boolean
  haveFourthClass?: boolean
  haveWifi?: boolean
  haveAirConditioning?: boolean
  haveExpress?: boolean
  priceFrom?: number
  priceTo?: number
  startDepartureHourFrom?: number
  startDepartureHourTo?: number
  startArrivalHourFrom?: number
  startArrivalHourTo?: number
  endDepartureHourFrom?: number
  endDepartureHourTo?: number
  endArrivalHourFrom?: number
  endArrivalHourTo?: number
  limit?: number
  offset?: number
  sort?: 'date' | 'price' | 'duration'
}

// Кастомный хук useSearch
export const useSearch = () => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    fromCityInput: '',
    toCityInput: '',
    fromCityId: '',
    toCityId: '',
    limit: 5,
    offset: 0,
    sort: 'date',
  })

  const updateSearchParams = (newParams: Partial<SearchParams>) => {
    setSearchParams((prev) => ({ ...prev, ...newParams }))
  }

  return { searchParams, updateSearchParams }
}

// Интерфейс для контекста
interface SearchContextProps {
  searchParams: SearchParams
  updateSearchParams: (newParams: Partial<SearchParams>) => void
}

// Создание контекста
const SearchContext = createContext<SearchContextProps | undefined>(undefined)

// Провайдер контекста
export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { searchParams, updateSearchParams } = useSearch()

  return (
    <SearchContext.Provider value={{ searchParams, updateSearchParams }}>
      {children}
    </SearchContext.Provider>
  )
}

// Пользовательский хук для использования контекста
export const useSearchContext = (): SearchContextProps => {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearchContext must be used within a SearchProvider')
  }
  return context
}
