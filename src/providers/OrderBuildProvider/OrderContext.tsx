import { createContext, useContext, useState, useEffect } from 'react'
import { TicketDetails, Seat } from '../../shared/types/Order'
import { usePopup } from '../PopupProvider/PopupContext'
import useOrderApi from '../../shared/API/orderAPI'
import { getRequestBody } from '../../shared/hooks/getRequestBody'

interface OrderContextType {
  order: TicketDetails
  updateOrder: (newOrder: Partial<TicketDetails> | ((prev: TicketDetails) => TicketDetails)) => void
  price: number
  updatePrice: (addedPrice: number) => void
  removePrice: (removedPrice: number) => void
  clearPrice: () => void
  toggleSeat: (
    seatData: Omit<Seat, 'person_info' | 'is_child' | 'include_children_seat' | 'seat_id'>,
    isDeparture: boolean,
    seatPrice: number
  ) => void
  isSeatSelected: (seat_number: number, coach_id: string, isDeparture: boolean) => boolean
  setPassengerAge: (isDeparture: boolean, id: string, isChild: boolean) => void
  removePassenger: (isDeparture: boolean, seat_id: string) => void
  handleOrderSubmission: () => Promise<OrderApiResponse | null>
  requestData: {
    status: boolean
  }
  loading: boolean
}

interface OrderApiResponse {
  status: boolean
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [order, setOrder] = useState<TicketDetails>({
    user: {
      first_name: '',
      last_name: '',
      patronymic: '',
      phone: '',
      email: '',
      payment_method: 'online',
    },
    departure: {
      route_direction_id: '',
      seats: [],
    },
    arrival: {
      route_direction_id: '',
      seats: [],
    },
  })

  const { setShowPopup, setContent, setHeader, setPopupType } = usePopup()

  const [price, setPrice] = useState(0)
  const [requestData, setRequestData] = useState({ status: false })

  const { loading, triggerRequest } = useOrderApi()

  const updateOrder = (
    newOrder: Partial<TicketDetails> | ((prev: TicketDetails) => TicketDetails)
  ) => {
    setOrder((prev) => {
      const updatedOrder =
        typeof newOrder === 'function' ? newOrder(prev) : { ...prev, ...newOrder }

      const newState = {
        ...prev,
        user: { ...prev.user, ...updatedOrder.user },
        departure: { ...prev.departure, ...updatedOrder.departure },
        arrival: { ...prev.arrival, ...updatedOrder.arrival },
      }

      console.log('Инфо о заказе:', newState)

      return newState
    })
  }

  const updatePrice = (addedPrice: number) => {
    setPrice((prev) => {
      const newPrice = addedPrice + prev
      return newPrice
    })
  }

  const removePrice = (removedPrice: number) => {
    setPrice((prev) => {
      const newPrice = prev - removedPrice
      return newPrice
    })
  }

  const clearPrice = () => {
    setPrice(0)
  }

  const toggleSeat = (
    seatData: Omit<Seat, 'person_info' | 'is_child' | 'include_children_seat' | 'seat_id'>,
    isDeparture: boolean,
    seatPrice: number
  ) => {
    setOrder((prev) => {
      const target = isDeparture ? 'departure' : 'arrival'
      const currentSeats = prev[target].seats

      // Проверка, выбрано ли уже это место
      const existingIndex = currentSeats.findIndex(
        (seat) => seat.seat_number === seatData.seat_number && seat.coach_id === seatData.coach_id
      )

      let updatedSeats

      if (existingIndex !== -1) {
        const seatToRemove = currentSeats[existingIndex]
        const priceToRemove = seatToRemove.total_price || seatPrice

        updatedSeats = currentSeats.map((seat, index) =>
          index === existingIndex
            ? { ...seat, seat_number: undefined, coach_id: '', total_price: undefined }
            : seat
        )
        removePrice(priceToRemove)

        // console.log(`Место ${seatData.seat_number} снято`)
      } else {
        // Найдём первого пассажира без места
        const freeIndex = currentSeats.findIndex((seat) => !seat.seat_number)

        if (freeIndex === -1) {
          setPopupType('error')
          setHeader('Выберите больше пассажиров')
          setContent('Вы не указали количество пассажиров')
          setShowPopup(true)
          return prev
        }

        // Присваиваем место
        updatedSeats = [...currentSeats]
        updatedSeats[freeIndex] = {
          ...updatedSeats[freeIndex],
          seat_number: seatData.seat_number,
          coach_id: seatData.coach_id,
          total_price: seatPrice,
        }
        updatePrice(seatPrice)

        // console.log(`Место ${seatData.seat_number} выбрано`)
      }

      return {
        ...prev,
        [target]: {
          ...prev[target],
          seats: updatedSeats,
        },
      }
    })
  }

  const isSeatSelected = (seat_number: number, coach_id: string, isDeparture: boolean): boolean => {
    const target = isDeparture ? order.departure.seats : order.arrival.seats

    return target.some((seat) => seat.seat_number === seat_number && seat.coach_id === coach_id)
  }

  const setPassengerAge = (isDeparture: boolean, seat_id: string, isAdult: boolean) => {
    updateOrder((prev) => {
      const target = isDeparture ? 'departure' : 'arrival'
      const seats = [...prev[target].seats]

      const adultCount = seats.filter((s) => !s.is_child).length
      const childCount = seats.filter((s) => s.is_child).length

      const currentIndex = seats.findIndex((s) => s.seat_id === seat_id)
      if (currentIndex === -1) return prev

      const current = seats[currentIndex]
      const isChild = !isAdult // для совместимости с is_child

      if (isChild && childCount >= 3 && !current.is_child) {
        setPopupType('error')
        setHeader('Может быть только 3 детских билета')
        setContent('К сожалению можно указать только 3 детских билета')
        setShowPopup(true)
        return prev
      }

      if (!isChild && adultCount >= 3 && current.is_child) {
        setPopupType('error')
        setHeader('Может быть только 3 взрослых билета')
        setContent('К сожалению можно указать только 3 взрослых билета')
        setShowPopup(true)
        return prev
      }

      seats[currentIndex] = {
        ...current,
        is_child: isChild,
        person_info: {
          ...current.person_info,
          is_adult: isAdult,
        },
      }

      return {
        ...prev,
        [target]: {
          ...prev[target],
          seats,
        },
      }
    })
  }

  const removePassenger = (isDeparture: boolean, seat_id: string) => {
    updateOrder((prev) => {
      const target = isDeparture ? 'departure' : 'arrival'
      const seats = prev[target].seats

      const updatedSeats = seats.filter((seat) => seat.seat_id !== seat_id)

      return {
        ...prev,
        [target]: {
          ...prev[target],
          seats: updatedSeats,
        },
      }
    })
  }

  useEffect(() => {
    console.log('Текущее состояние заказа:', order)
    console.log('Текущая цена:', price)
  }, [order, price])

  const handleOrderSubmission = async (): Promise<OrderApiResponse | null> => {
    const result = await triggerRequest(getRequestBody(order))

    if (result?.status) {
      setRequestData(result)
    } else {
      setPopupType('error')
      setHeader('Ошибка при отправке данных')
      setContent('Не получили ответ от сервера, попробуйте ещё раз')
      setShowPopup(true)
    }
    return result
  }

  return (
    <OrderContext.Provider
      value={{
        order,
        updateOrder,
        price,
        updatePrice,
        removePrice,
        clearPrice,
        toggleSeat,
        isSeatSelected,
        setPassengerAge,
        removePassenger,
        handleOrderSubmission,
        requestData,
        loading,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export const useOrder = () => {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider')
  }
  return context
}
