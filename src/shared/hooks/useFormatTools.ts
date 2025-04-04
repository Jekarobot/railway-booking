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

// Функция для форматирования больших секунд (например, более суток) в формат HH:MM
export function formatLargeSecondsToHHMM(seconds: number | undefined): string {
  if (seconds === undefined) return '00:00'
  const totalMinutes = Math.floor(seconds / 60)
  const hours = Math.floor(totalMinutes / 60) % 24
  const minutes = totalMinutes % 60
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
}
