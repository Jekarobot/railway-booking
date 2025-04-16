// shared/hooks/useFormatTools.ts

// Функция для капитализации названия города (например, 'moscow' -> 'Moscow')
export function capitalizeCityName(cityName: string | undefined): string {
  if (!cityName) return ''
  return cityName
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('-')
}

// Функция для форматирования секунд в формат HH:MM
export function formatSecondsToHHMM(seconds: number | undefined): string {
  if (seconds === undefined) return '00:00'
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
}

// Функция для форматирования даты из Unix timestamp в формат HH:MM
export function formatUnixTimestampToTime(seconds: number | undefined): string {
  if (seconds === undefined) return '00:00'
  const date = new Date(seconds * 1000) // Умножаем на 1000, чтобы преобразовать секунды в миллисекунды
  const hours = date.getUTCHours().toString().padStart(2, '0')
  const minutes = date.getUTCMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
}

// Функция для форматирования даты из Unix timestamp в формат DD.MM.YYYY
export function formatUnixTimestampToDate(timestamp: number | undefined): string {
  if (timestamp === undefined) return '00:00'
  const date = new Date(timestamp * 1000) // Умножаем на 1000, чтобы преобразовать секунды в миллисекунды
  const day = date.getUTCDate().toString().padStart(2, '0')
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0') // Месяцы начинаются с 0
  const year = date.getUTCFullYear()
  return `${day}.${month}.${year}`
}
