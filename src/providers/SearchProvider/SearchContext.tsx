import React, { createContext, useContext, useState, useEffect } from 'react'
import { Routes } from '../../shared/types/Routes'
import { RoutesResponse } from '../../shared/types/RoutesResponse'

interface SearchContextProps {
  searchParams: Routes
  updateSearchParams: (newParams: Partial<Routes>) => void
  routesResponse: RoutesResponse | null
  setRoutesResponse: React.Dispatch<React.SetStateAction<RoutesResponse | null>>
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  resetSearchParameters: () => void
}

const defaultSearchParams: Routes = {
  from_city_input: '',
  to_city_input: '',
  from_city_id: '',
  to_city_id: '',
  date_start: undefined,
  date_end: undefined,
  date_start_arrival: undefined,
  date_end_arrival: undefined,
  have_first_class: false,
  have_second_class: false,
  have_third_class: false,
  have_fourth_class: false,
  have_wifi: false,
  have_air_conditioning: false,
  have_express: false,
  price_from: undefined,
  price_to: undefined,
  initial_price_from: undefined,
  initial_price_to: undefined,
  start_departure_hour_from: undefined,
  start_departure_hour_to: undefined,
  start_arrival_hour_from: undefined,
  start_arrival_hour_to: undefined,
  end_departure_hour_from: undefined,
  end_departure_hour_to: undefined,
  end_arrival_hour_from: undefined,
  end_arrival_hour_to: undefined,
  limit: 5,
  offset: 0,
  sort: 'date',
}

const getCurrentDateFormatted = (): string => {
  const date = new Date()
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear().toString()
  return `${day}.${month}.${year}`
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined)

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchParams, setSearchParams] = useState<Routes>({
    from_city_input: '',
    to_city_input: '',
    from_city_id: '',
    to_city_id: '',
    // date_start: getCurrentDateFormatted(), // Коммент, иначе маршруты перестали приходить
    limit: 5,
    sort: 'date',
  })

  const [routesResponse, setRoutesResponse] = useState<RoutesResponse | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const updateSearchParams = (newParams: Partial<Routes>) => {
    setSearchParams((prev) => {
      // Сравнение новых значений с текущими
      const updatedParams = { ...prev, ...newParams }

      // Проверка, изменились ли параметры, чтобы избежать лишнего рендера
      const isChanged = Object.keys(newParams).some((key) => {
        const k = key as keyof Routes
        return prev[k] !== updatedParams[k]
      })

      if (isChanged) {
        return updatedParams
      }

      return prev // Возвращаем старое состояние, если ничего не изменилось
    })
  }

  useEffect(() => {
    console.log('Current searchParams:', searchParams)
  }, [searchParams])

  useEffect(() => {
    console.log('RoutesResponse updated:', routesResponse)
  }, [routesResponse])

  useEffect(() => {
    console.log('Loading state changed:', loading)
  }, [loading])

  const resetSearchParameters = () => {
    setSearchParams(defaultSearchParams)
  }

  return (
    <SearchContext.Provider
      value={{
        searchParams,
        updateSearchParams,
        routesResponse,
        setRoutesResponse,
        loading,
        setLoading,
        resetSearchParameters,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export const useSearchContext = (): SearchContextProps => {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearchContext must be used within a SearchProvider')
  }
  return context
}
