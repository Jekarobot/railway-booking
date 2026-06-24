# 🚂 Railway Booking

**Railway Booking** — это веб-приложение для поиска и бронирования железнодорожных билетов. Проект предоставляет удобный интерфейс для выбора маршрута, просмотра доступных поездов, выбора мест и оформления заказа.

---

## 🧰 Технологический стек

- **Язык**: TypeScript
- **Фреймворк**: React 18
- **Сборщик**: Vite
- **Стилизация**: CSS / CSS Modules
- **Линтер**: ESLint (с конфигурацией для TypeScript и React)
- **Дополнительно**: React Context API, кастомные хуки, моковые данные

---

## 🚀 Установка и запуск

1. **Клонируйте репозиторий:**
   ```bash
   git clone https://github.com/your-username/railway-booking.git
   cd railway-booking
   ```

2. **Установите зависимости:**
   ```bash
   npm install
   ```

3. **Запустите проект в режиме разработки:**
   ```bash
   npm run dev
   ```

4. **Откройте в браузере:**
   ```
   http://localhost:5173
   ```

---

## 📦 Примеры использования

### Поиск билетов
```tsx
// Пример использования компонента поиска
import { TicketSearch } from './features/TicketSearch';

function App() {
  return <TicketSearch />;
}
```

### Получение списка поездов (моковые данные)
```tsx
import { useTrains } from './shared/hooks/useTrains';

function TrainList() {
  const { trains, loading } = useTrains();
  if (loading) return <Loader />;
  return trains.map(train => <TrainCard key={train.id} train={train} />);
}
```

---

## 📁 Структура проекта

```
railway-booking/
├── public/                     # Статические файлы
├── src/
│   ├── app/                    # Корневые компоненты приложения
│   ├── entities/               # Бизнес-сущности (TrainCard, filters, inputs)
│   ├── features/               # Функциональные блоки (Calendar, Loader, Popup, Slider, TicketSearch)
│   ├── pages/                  # Страницы (Home, Results, Success)
│   ├── providers/              # Провайдеры контекста (AppContext, OrderBuild, Popup, Search, TrainDetails)
│   ├── shared/                 # Переиспользуемые модули (API, хуки, стили, типы, UI-компоненты)
│   ├── widgets/                # Составные виджеты (AboutSection, Billing, Checkout, DetailsAside, FilterAside, LastTickets, Passengers, TicketsList)
│   ├── main.tsx                # Точка входа
│   └── vite-env.d.ts           # Типы Vite
├── index.html                  # HTML-шаблон
├── package.json                # Зависимости и скрипты
├── vite.config.ts              # Конфигурация Vite
├── tsconfig.json               # Конфигурация TypeScript
└── eslint.config.js            # Конфигурация ESLint
```

---

## 📄 Лицензия

Этот проект распространяется под лицензией **MIT**. Подробнее см. в файле `LICENSE`.