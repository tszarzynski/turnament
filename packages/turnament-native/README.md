# Turnament Native

Native iOS and Android wrapper for the Turnament web application using [Capacitor](https://capacitorjs.com/).

## Architecture

This package wraps `turnament-web` with Capacitor to produce native mobile apps:

```
turnament-native/
├── capacitor.config.ts   # Capacitor configuration
├── ios/                  # Xcode project (iOS)
└── android/              # Android Studio project (Android)
```

The web app is built from `turnament-web` and copied into the native projects during sync.

## Prerequisites

### iOS Development (Mac only)

1. **Install Xcode** from the Mac App Store

2. **Set Xcode as active developer directory:**
   ```bash
   sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
   ```

3. **Install CocoaPods:**
   ```bash
   sudo gem install cocoapods
   ```

4. **Accept Xcode license:**
   ```bash
   sudo xcodebuild -license accept
   ```

### Android Development

1. **Install Java JDK:**
   ```bash
   brew install openjdk
   ```

2. **Install Android Studio** from https://developer.android.com/studio

3. **Configure Android SDK** via Android Studio > Settings > SDK Manager:
   - Install Android SDK (API level 33 or higher recommended)
   - Install Android SDK Build-Tools
   - Install Android SDK Platform-Tools

4. **Set environment variables** (add to `~/.zshrc` or `~/.bashrc`):
   ```bash
   export JAVA_HOME=$(/usr/libexec/java_home)
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```

## Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm build` | Build the web app for native (base path `/`) |
| `pnpm sync` | Copy web assets and sync native project configs |
| `pnpm open:ios` | Open the iOS project in Xcode |
| `pnpm open:android` | Open the Android project in Android Studio |
| `pnpm run:ios` | Build and run on iOS simulator/device |
| `pnpm run:android` | Build and run on Android emulator/device |

## Development Workflow

### Initial Setup

After cloning the repository, run from the monorepo root:

```bash
pnpm install
```

### Building and Running

1. **Build the web app:**
   ```bash
   cd packages/turnament-native
   pnpm build
   ```

2. **Sync to native projects:**
   ```bash
   pnpm sync
   ```

3. **Run on iOS:**
   ```bash
   pnpm open:ios
   ```
   Then in Xcode: select a simulator and press Run (Cmd+R)

4. **Run on Android:**
   ```bash
   pnpm open:android
   ```
   Then in Android Studio: select a device/emulator and press Run

### Making Changes

After modifying the web app:

```bash
pnpm build && pnpm sync
```

Then rebuild in Xcode or Android Studio.

## Live Reload (Development)

For faster development with live reload, update `capacitor.config.ts`:

```typescript
const config: CapacitorConfig = {
  // ... existing config
  server: {
    url: "http://YOUR_LOCAL_IP:3000",
    cleartext: true,
  },
};
```

Then run the web dev server (`pnpm dev` in `turnament-web`) and rebuild the native app.

**Important:** Remove the `server.url` config before building for production.

## App Configuration

Edit `capacitor.config.ts` to modify:

- `appId` - Bundle identifier (e.g., `com.tszarzynski.turnament`)
- `appName` - Display name shown on device
- `webDir` - Path to web build output

### iOS-specific Config

Edit `ios/App/App/Info.plist` for:
- App permissions
- URL schemes
- Device orientation

### Android-specific Config

Edit `android/app/src/main/AndroidManifest.xml` for:
- App permissions
- Intent filters

## Building for Release

### iOS

1. Open Xcode: `pnpm open:ios`
2. Select "Any iOS Device" as the target
3. Product > Archive
4. Distribute via App Store Connect or Ad Hoc

### Android

1. Open Android Studio: `pnpm open:android`
2. Build > Generate Signed Bundle/APK
3. Follow the signing wizard

## Troubleshooting

### iOS: "xcodebuild requires Xcode"

```bash
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
```

### iOS: CocoaPods errors

```bash
cd ios/App
pod install --repo-update
```

### Android: Java not found

Ensure `JAVA_HOME` is set and Java is installed:
```bash
java -version
echo $JAVA_HOME
```

### Android: SDK not found

Set `ANDROID_HOME` environment variable to your SDK location.

### Web assets not updating

Make sure to run both commands:
```bash
pnpm build && pnpm sync
```
