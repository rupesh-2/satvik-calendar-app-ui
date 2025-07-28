# Panchang Calendar App

A modern, clean React Native (Expo) mobile app for Panchang Calendar with support for English and Nepali languages. The app provides comprehensive Hindu calendar information including tithis, nakshatras, and spiritual practices.

## Features

### 🌟 Core Features

- **Bilingual Support**: English and Nepali (नेपाली) languages
- **Today's Panchang**: Shows current date in both AD and BS formats
- **Monthly Calendar View**: Interactive calendar with tithi information
- **Detailed Tithi Information**: Complete details for each date
- **Notifications & Reminders**: Set alerts for important tithis
- **Settings Management**: Language, timezone, and notification preferences

### 📱 Screens

1. **Home Screen**: Today's date, tithi, nakshatra, sunrise/sunset, fasting alerts
2. **Calendar Screen**: Monthly view with tithi information for each date
3. **Tithi Details**: Detailed information for selected dates
4. **Settings**: Language, timezone, and notification preferences
5. **Alerts**: Manage reminders and upcoming tithis

### 🎨 Design Features

- **Modern UI**: Clean, intuitive design with Material Design principles
- **Dark/Light Mode**: Automatic theme switching based on system preferences
- **Responsive Layout**: Optimized for both small and large devices
- **Accessibility**: Proper contrast ratios and touch targets

## Tech Stack

- **React Native** with **Expo SDK 53**
- **TypeScript** for type safety
- **Expo Router** for navigation
- **Zustand** for state management
- **i18next** for internationalization
- **React Native Calendars** for calendar functionality
- **Expo Notifications** for push notifications

## Project Structure

```
panchang-app/
│
├── app/                         # App directory-based routing
│   ├── _layout.tsx             # Root layout (with navigation and providers)
│   ├── (tabs)/                 # Tab-based navigation
│   │   ├── _layout.tsx         # Tab layout
│   │   ├── index.tsx           # Home screen
│   │   ├── calendar.tsx        # Calendar screen
│   │   ├── settings.tsx        # Settings screen
│   │   └── alerts.tsx          # Alerts/reminders screen
│   └── tithi/[date].tsx        # Tithi details page (dynamic route)
│
├── components/                  # Reusable UI components
│   ├── CalendarCard.tsx        # Calendar date component
│   ├── TithiCard.tsx          # Tithi information card
│   └── LanguageSwitcher.tsx   # Language toggle component
│
├── constants/                   # Static values
│   ├── tithis.ts              # List of tithis, nakshatras, pakshas
│   └── theme.ts               # Colors, spacing, typography
│
├── i18n/                       # Internationalization
│   ├── index.ts               # i18n configuration
│   ├── en.json                # English translations
│   └── ne.json                # Nepali translations
│
├── lib/                        # Utilities and services
│   ├── date.ts                # AD↔BS conversion and Panchang calculations
│   └── notifications.ts       # Notification scheduling
│
├── store/                      # Zustand state management
│   ├── useLanguageStore.ts    # Language preferences
│   ├── usePanchangStore.ts    # Panchang data
│   └── useUserPrefsStore.ts   # User settings and reminders
│
└── package.json               # Dependencies and scripts
```

## Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd panchang-ui
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Run on device/simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app for physical device

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
EXPO_PUBLIC_API_URL=your_api_url_here
```

### App Configuration

Update `app.json` for your specific needs:

- Change app name and slug
- Update notification settings
- Configure permissions

## Features in Detail

### 🗓️ Calendar Functionality

- **Monthly View**: Navigate through months with tithi information
- **Date Selection**: Tap any date to view detailed information
- **Special Day Highlighting**: Ekadashi, Purnima, Amavasya are highlighted
- **Fasting Indicators**: Visual indicators for fasting days

### 🌍 Internationalization

- **Language Switching**: Toggle between English and Nepali
- **Dynamic Content**: All text updates based on selected language
- **Cultural Context**: Proper translations for Hindu concepts

### 🔔 Notifications

- **Reminder System**: Set reminders for important tithis
- **Custom Alerts**: Choose which tithis to get notified about
- **Local Notifications**: Works offline without internet

### ⚙️ Settings & Preferences

- **Language Settings**: English/Nepali toggle
- **Timezone Configuration**: Support for multiple timezones
- **Notification Preferences**: Granular control over alerts
- **Theme Support**: Automatic dark/light mode

## Development

### Adding New Features

1. Create components in `components/` directory
2. Add translations to `i18n/en.json` and `i18n/ne.json`
3. Update types in `constants/tithis.ts` if needed
4. Add state management in `store/` if required

### Styling Guidelines

- Use the theme constants from `constants/theme.ts`
- Follow Material Design principles
- Ensure accessibility compliance
- Test on both light and dark modes

### Testing

```bash
# Run tests
npm test

# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

## Deployment

### Building for Production

```bash
# Build for Android
expo build:android

# Build for iOS
expo build:ios

# Build for web
expo build:web
```

### Publishing Updates

```bash
# Publish to Expo
expo publish

# Update OTA
expo publish --release-channel production
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Hindu Panchang calculations and data
- Nepali language support and translations
- React Native and Expo community
- Material Design guidelines

## Support

For support and questions:

- Create an issue in the repository
- Check the documentation
- Contact the development team

---

**Note**: This app uses simplified Panchang calculations. For accurate astronomical calculations, consider integrating with a proper Panchang API or astronomical library.
