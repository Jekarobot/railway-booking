import React, { createContext, useContext, useState, useEffect } from 'react'
import { RouteItem } from '../../shared/types/RoutesResponse'
import useRoutesSeatsApi from '../../shared/API/routesSeatsAPI'

interface TrainDetailsContextProps {
  arrivalTrainId: string
  departureTrainId: string
  setArrivalTrainId: (id: string) => void
  setDepartureTrainId: (id: string) => void
  selectedArrivalTicket: RouteItem | null
  setSelectedArrivalTicket: (ticket: RouteItem | null) => void
  selectedDepartureTicket: RouteItem | null
  setSelectedDepartureTicket: (ticket: RouteItem | null) => void
  arrivalSeatsData: any[] | null
  departureSeatsData: any[] | null
  loading: boolean | undefined
  error: any
}

const TrainDetailsContext = createContext<TrainDetailsContextProps | undefined>(undefined)

export const TrainDetailsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [arrivalTrainId, setArrivalTrainId] = useState<string>('')
  const [departureTrainId, setDepartureTrainId] = useState<string>('')
  const [selectedArrivalTicket, setSelectedArrivalTicket] = useState<RouteItem | null>(null)
  const [selectedDepartureTicket, setSelectedDepartureTicket] = useState<RouteItem | null>(null)

  // Вызываем хук API для обоих поездов
  const arrivalFetch = useRoutesSeatsApi(arrivalTrainId)
  const departureFetch = useRoutesSeatsApi(departureTrainId)

  useEffect(() => {
    console.log('SelectedArrivalTicket:', selectedArrivalTicket)
  }, [selectedArrivalTicket])

  useEffect(() => {
    console.log('SelectedDepartureTicket:', selectedDepartureTicket)
  }, [selectedDepartureTicket])

  useEffect(() => {
    console.log('TrainDetailsProvider: arrivalSeatsData', arrivalFetch.data)
    console.log('TrainDetailsProvider: departureSeatsData', departureFetch.data)
  }, [arrivalFetch.data, departureFetch.data])

  return (
    <TrainDetailsContext.Provider
      value={{
        arrivalTrainId,
        departureTrainId,
        setArrivalTrainId,
        setDepartureTrainId,
        selectedArrivalTicket,
        setSelectedArrivalTicket,
        selectedDepartureTicket,
        setSelectedDepartureTicket,
        arrivalSeatsData: arrivalFetch?.data ?? null,
        departureSeatsData: departureFetch?.data ?? null,
        loading: arrivalFetch?.loading || departureFetch?.loading,
        error: arrivalFetch?.error || departureFetch?.error,
      }}
    >
      {children}
    </TrainDetailsContext.Provider>
  )
}

export const useTrainDetails = (): TrainDetailsContextProps => {
  const context = useContext(TrainDetailsContext)
  if (!context) {
    throw new Error('useTrainDetails must be used within a TrainDetailsProvider')
  }
  return context
}
