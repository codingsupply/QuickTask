# QuickTasks

QuickTasks is a modern, feature-rich to-do list application built with React Native and Expo. It provides a clean, intuitive interface for managing daily tasks with features like task categorization, dark mode, and interactive feedback.

## Features

### Core Functionality
- ✅ Add, complete, and delete tasks
- 📊 Task statistics and progress tracking
- 🔍 Search and filter tasks
- 🎨 Task categories with color coding
- 🌓 Dark mode support
- 📱 Responsive design for all screen sizes
- 🎭 Mascot with different states based on task completion

### User Experience
- ✨ Smooth animations and transitions
- 📳 Haptic feedback for interactions
- ↕️ Pull-to-refresh functionality
- 👆 Swipe gestures for task actions
- ♿ Accessibility features

### Technical Features
- 💾 Persistent storage with AsyncStorage
- 🔄 Data migration strategy for updates
- 🛡️ TypeScript with strict type checking
- 🧩 Modular component architecture
- 🔍 ESLint and Prettier for code quality

## Project Structure

```
QuickTasks/
├── src/
│   ├── components/      # Reusable UI components
│   ├── screens/         # Application screens
│   ├── types/           # TypeScript interfaces and types
│   ├── utils/           # Utility functions
│   ├── hooks/           # Custom React hooks
│   └── constants/       # App constants and theme
├── assets/              # Images and other static assets
├── App.tsx              # Main application component
├── app.json             # Expo configuration
├── package.json         # Dependencies and scripts
└── README.md            # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/quicktasks.git
   cd quicktasks
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npx expo start
   ```

## Running the App

- **iOS Simulator**: Press `i` in the terminal or click "Run on iOS simulator" in the Expo Developer Tools
- **Android Emulator**: Press `a` in the terminal or click "Run on Android device/emulator" in the Expo Developer Tools
- **Physical Device**: Scan the QR code with the Expo Go app (Android) or the Camera app (iOS)

## Key Components

### Task Management
- `TaskItem`: Individual task component with swipe actions
- `TaskList`: Displays all tasks with pull-to-refresh
- `TaskInput`: Form for adding new tasks with category selection

### UI Components
- `Mascot`: Displays different states based on task completion
- `TaskStatistics`: Shows task completion statistics
- `SearchBar`: Allows filtering tasks by title
- `ThemeToggle`: Switch between light and dark modes

### Hooks
- `useTasks`: Manages task state and operations
- `useTheme`: Handles theme switching and persistence

## Future Enhancements

### Lottie Animation Integration
The current mascot component uses SVG placeholders that can be easily replaced with Lottie animations:

1. Install Lottie dependencies:
   ```
   npm install lottie-react-native
   ```

2. Replace the SVG implementation in `Mascot.tsx` with Lottie:
   ```typescript
   import LottieView from 'lottie-react-native';
   
   // Replace SvgXml with:
   <LottieView
     source={require(`../../assets/mascot-${state}.json`)}
     autoPlay
     loop
     style={{ width: size, height: size }}
   />
   ```

3. Add Lottie JSON files to the assets folder:
   - `assets/mascot-default.json`
   - `assets/mascot-celebration.json`

### Additional Planned Features
- Task due dates and reminders
- Recurring tasks
- Cloud synchronization
- Multiple task lists
- Sharing and collaboration
- Widgets for home screen

## Troubleshooting

### Common Issues

**App crashes on startup:**
- Ensure all dependencies are installed: `npm install`
- Clear cache: `npx expo start -c`

**Tasks not saving:**
- Check AsyncStorage permissions
- Verify storage quota isn't exceeded

**UI rendering issues:**
- Update to the latest Expo SDK
- Check for React Native version compatibility

### Debug Mode

To enable debug mode:
1. Add `__DEV__` conditional checks in the code
2. Use React DevTools for component inspection
3. Enable remote debugging in Expo Developer menu

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.