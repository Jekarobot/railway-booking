import { createContext, useContext, useState } from 'react'
import { TicketDetails } from '../../shared/types/Order'

interface OrderContextType {
  order: TicketDetails
  updateOrder: (newOrder: Partial<TicketDetails> | ((prev: TicketDetails) => TicketDetails)) => void
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

  return <OrderContext.Provider value={{ order, updateOrder }}>{children}</OrderContext.Provider>
}

export const useOrder = () => {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider')
  }
  return context
}
