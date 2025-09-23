// app/_layout.tsx (oder wo dein RootLayout liegt)
import 'react-native-reanimated'
import { Platform } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font'

import { TamaguiProvider, Theme } from 'tamagui'
import config from '@/tamagui.config'

import { AuthProvider } from '@/context/SessionContext'
import { TabBarNative } from '@/components/navigation/native/tabbar'
import { NavbarWeb } from '@/components/navigation/web/navbar'
import { useColorScheme } from '@/hooks/useColorScheme'

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  if (!loaded) return null

  return (
      <TamaguiProvider config={config}>
        <Theme name={colorScheme === 'dark' ? 'dark' : 'light'}>
          <AuthProvider>
            {Platform.OS === 'web' ? <NavbarWeb /> : <TabBarNative />}
            <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
          </AuthProvider>
        </Theme>
      </TamaguiProvider>
  )
}
