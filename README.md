# Task Manager App

A React Native task management application with authentication, built using TypeScript and React Navigation.

## Features

- 🔐 User Authentication (Login, Forgot Password, Password Change)
- ✅ Task Management (Create, Read, Update, Delete tasks)
- 📱 Cross-platform support (Android, iOS & Web)
- 🎨 Modern UI with React Navigation
- 💾 Local storage using AsyncStorage
- 🔄 Real-time task updates
- 🌐 Web support with React Native Web

## Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Java Development Kit (JDK)** 11 or higher - [Download](https://www.oracle.com/java/technologies/downloads/) (for Android)
- **Android Studio** (for Android development) - [Download](https://developer.android.com/studio)
- **Xcode** (for iOS development, macOS only) - Available on Mac App Store
- **Modern web browser** (for web development) - Chrome, Firefox, Safari, or Edge

### Android Setup

1. Install Android Studio
2. Open Android Studio and install:
   - Android SDK
   - Android SDK Platform
   - Android Virtual Device (AVD)
3. Set up environment variables:
   ```bash
   # Add to your ~/.bashrc, ~/.zshrc, or Windows environment variables
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   export PATH=$PATH:$ANDROID_HOME/tools
   export PATH=$PATH:$ANDROID_HOME/tools/bin
   ```

### iOS Setup (macOS only)

1. Install Xcode from Mac App Store
2. Install Xcode Command Line Tools:
   ```bash
   xcode-select --install
   ```
3. Install CocoaPods:
   ```bash
   sudo gem install cocoapods
   ```

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jabaraj07/TaskManger_App.git
   cd TaskManger_App/MyApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install iOS dependencies** (macOS only)
   ```bash
   cd ios
   pod install
   cd ..
   ```

4. **Web dependencies are included** - No additional setup needed for web support

## Running the App Locally

### Start Metro Bundler

First, start the Metro bundler in a separate terminal:

```bash
npm start
# or
yarn start
```

### Run on Android

1. **Start an Android emulator** or connect a physical device with USB debugging enabled

2. **Run the app**
   ```bash
   npm run android
   # or
   yarn android
   ```

   **For Windows users**, you may need to run:
   ```bash
   cd android
   gradlew.bat clean
   cd ..
   npm run android
   ```

### Run on iOS (macOS only)

1. **Start iOS Simulator** or connect a physical iOS device

2. **Run the app**
   ```bash
   npm run ios
   # or
   yarn ios
   ```

   To run on a specific simulator:
   ```bash
   npm run ios -- --simulator="iPhone 14 Pro"
   ```

### Run on Web

1. **Start the web development server**
   ```bash
   npm run web
   # or
   yarn web
   ```

2. **The app will automatically open** in your default browser at `http://localhost:3000`

3. **Build for production** (creates optimized bundle in `web-build` folder)
   ```bash
   npm run web:build
   # or
   yarn web:build
   ```

**Note:** Some React Native components may need web-specific implementations. Check the browser console for any warnings.

## Troubleshooting

### Common Issues

1. **Metro bundler cache issues**
   ```bash
   npm start -- --reset-cache
   ```

2. **Android build errors**
   ```bash
   cd android
   ./gradlew clean
   cd ..
   npm run android
   ```

3. **iOS build errors**
   ```bash
   cd ios
   pod deintegrate
   pod install
   cd ..
   npm run ios
   ```

4. **Node modules issues**
   ```bash
   rm -rf node_modules
   npm install
   ```

5. **Watchman issues** (macOS/Linux)
   ```bash
   watchman watch-del-all
   ```

## Building for Production

### Android

1. **Generate a release keystore** (first time only)
   ```bash
   cd android/app
   keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
   ```

2. **Update `android/gradle.properties`** with your keystore credentials:
   ```properties
   MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
   MYAPP_RELEASE_KEY_ALIAS=my-key-alias
   MYAPP_RELEASE_STORE_PASSWORD=*****
   MYAPP_RELEASE_KEY_PASSWORD=*****
   ```

3. **Update `android/app/build.gradle`** signing config:
   ```gradle
   signingConfigs {
       release {
           storeFile file(MYAPP_RELEASE_STORE_FILE)
           storePassword MYAPP_RELEASE_STORE_PASSWORD
           keyAlias MYAPP_RELEASE_KEY_ALIAS
           keyPassword MYAPP_RELEASE_KEY_PASSWORD
       }
   }
   buildTypes {
       release {
           signingConfig signingConfigs.release
       }
   }
   ```

4. **Build the APK**
   ```bash
   cd android
   ./gradlew assembleRelease
   ```
   
   The APK will be located at: `android/app/build/outputs/apk/release/app-release.apk`

5. **Build an App Bundle** (for Google Play Store)
   ```bash
   cd android
   ./gradlew bundleRelease
   ```
   
   The AAB will be located at: `android/app/build/outputs/bundle/release/app-release.aab`

### iOS (macOS only)

1. **Open the project in Xcode**
   ```bash
   open ios/MyApp.xcworkspace
   ```

2. **Configure signing**
   - Select your development team in Xcode
   - Update Bundle Identifier if needed

3. **Build for release**
   - Select "Any iOS Device" or your connected device
   - Product → Archive
   - Follow the prompts to distribute

## Free Deployment Options

### Option 1: Expo Application Services (EAS Build) - Recommended

**Note:** This requires migrating to Expo, but it's the easiest free option.

1. **Install Expo CLI**
   ```bash
   npm install -g expo-cli
   ```

2. **Initialize Expo in your project**
   ```bash
   npx expo install expo
   ```

3. **Build with EAS** (Free tier available)
   ```bash
   npx eas-cli build --platform android
   npx eas-cli build --platform ios
   ```

4. **Download and distribute** the built apps

### Option 2: GitHub Actions (Free CI/CD)

Create `.github/workflows/build-android.yml`:

```yaml
name: Build Android APK

on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        cache-dependency-path: MyApp/package-lock.json
    
    - name: Setup Java
      uses: actions/setup-java@v3
      with:
        distribution: 'temurin'
        java-version: '11'
    
    - name: Setup Android SDK
      uses: android-actions/setup-android@v2
    
    - name: Install dependencies
      working-directory: ./MyApp
      run: npm ci
    
    - name: Build APK
      working-directory: ./MyApp/android
      run: ./gradlew assembleRelease
    
    - name: Upload APK
      uses: actions/upload-artifact@v3
      with:
        name: app-release
        path: MyApp/android/app/build/outputs/apk/release/app-release.apk
```

### Option 3: App Distribution Platforms (Free Tiers)

#### Android - Internal Testing

1. **Google Play Console** (One-time $25 fee, but free for internal testing)
   - Create a developer account
   - Upload APK/AAB to Internal Testing track
   - Share with testers via email

2. **Firebase App Distribution** (Free)
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase init apphosting
   firebase appdistribution:distribute android/app/build/outputs/apk/release/app-release.apk --app YOUR_APP_ID
   ```

3. **AppCenter** (Free tier available)
   - Sign up at [appcenter.ms](https://appcenter.ms)
   - Create a new app
   - Upload builds manually or via CLI

#### iOS - TestFlight (Free)

1. **Apple Developer Program** ($99/year required)
   - Enroll at [developer.apple.com](https://developer.apple.com)
   - Upload build via Xcode or Transporter
   - Distribute via TestFlight (free for up to 10,000 testers)

### Option 4: Direct APK Distribution (Android Only - Completely Free)

1. **Build the APK** (see Building for Production section)

2. **Host the APK** on:
   - GitHub Releases (free)
   - Google Drive (free)
   - Your own website
   - Firebase Hosting (free tier)

3. **Share the download link** with users

**Note:** Users will need to enable "Install from Unknown Sources" on Android devices.

### Option 5: Web Deployment (Free Hosting Options)

#### Build for Production

1. **Build the web app**
   ```bash
   npm run web:build
   # or
   yarn web:build
   ```

2. **Output folder**: The production build will be in `web-build/` directory

#### Free Web Hosting Options

1. **Vercel** (Recommended - Free)
   ```bash
   npm install -g vercel
   cd MyApp
   vercel
   ```
   - Automatic deployments from GitHub
   - Free SSL certificates
   - Global CDN
   - Visit [vercel.com](https://vercel.com)

2. **Netlify** (Free)
   ```bash
   npm install -g netlify-cli
   cd MyApp
   netlify deploy --prod --dir=web-build
   ```
   - Drag & drop deployment
   - Continuous deployment from Git
   - Free SSL
   - Visit [netlify.com](https://netlify.com)

3. **GitHub Pages** (Free)
   - Build the app: `npm run web:build`
   - Push `web-build` folder to `gh-pages` branch
   - Enable GitHub Pages in repository settings
   - Your app will be available at `https://username.github.io/repository-name`

4. **Firebase Hosting** (Free)
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase init hosting
   # Set public directory to: web-build
   firebase deploy
   ```
   - Free SSL
   - Global CDN
   - Custom domain support

5. **Surge.sh** (Free)
   ```bash
   npm install -g surge
   cd MyApp
   npm run web:build
   surge web-build
   ```
   - Simple command-line deployment
   - Free subdomain

6. **Render** (Free tier)
   - Connect your GitHub repository
   - Set build command: `npm run web:build`
   - Set publish directory: `web-build`
   - Automatic deployments
   - Visit [render.com](https://render.com)

## Project Structure

```
MyApp/
├── android/          # Android native code
├── ios/              # iOS native code
├── Navigation/       # Navigation stacks
├── Screen/           # Screen components
├── src/
│   ├── constants/    # App constants
│   ├── hooks/        # Custom React hooks
│   └── navigation/   # Navigation types
├── App.tsx           # Main app component
├── AuthContext.tsx   # Authentication context
├── TaskContext.tsx   # Task management context
└── package.json      # Dependencies
```

## Technologies Used

- **React Native** 0.71.4
- **React Native Web** - Web platform support
- **TypeScript**
- **React Navigation** 6.x
- **AsyncStorage** - Local data persistence
- **Axios** - HTTP client
- **React Native Vector Icons**
- **React Native Reanimated**
- **RecyclerListView** - Performance-optimized list
- **Webpack** - Web bundler

## Scripts

- `npm start` - Start Metro bundler
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run web` - Run on web (development server)
- `npm run web:build` - Build for web production
- `npm test` - Run tests
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is private and proprietary.

## Support

For issues and questions, please open an issue on GitHub.

## Author

**jabaraj07**

---

**Note:** Make sure to configure your API endpoints and authentication services before deploying to production.

