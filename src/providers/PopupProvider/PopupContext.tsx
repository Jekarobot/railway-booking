import React, { createContext, useContext, useState, ReactNode } from 'react'

interface PopupContextType {
  showPopup: boolean
  setShowPopup: (show: boolean) => void
  popupType: 'info' | 'error'
  setPopupType: (popupType: 'info' | 'error') => void
  header: string
  setHeader: (header: string) => void
  content: string
  setContent: (content: string) => void
}

const PopupContext = createContext<PopupContextType | undefined>(undefined)

export const usePopup = () => {
  const context = useContext(PopupContext)
  if (!context) {
    throw new Error('usePopup must be used within an AlertProvider')
  }
  return context
}

export const PopupProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showPopup, setShowPopup] = useState(false)
  const [popupType, setPopupType] = useState<'info' | 'error'>('info')
  const [header, setHeader] = useState('')
  const [content, setContent] = useState('')

  return (
    <PopupContext.Provider
      value={{
        showPopup,
        setShowPopup,
        popupType,
        setPopupType,
        header,
        setHeader,
        content,
        setContent,
      }}
    >
      {children}
    </PopupContext.Provider>
  )
}
