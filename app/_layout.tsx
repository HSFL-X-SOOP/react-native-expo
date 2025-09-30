import '@/i18n'
import {
    Oswald_400Regular,
    Oswald_500Medium,
    Oswald_600SemiBold,
    Oswald_700Bold,
    useFonts
} from '@expo-google-fonts/oswald'
import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Platform, View } from 'react-native'
import 'react-native-reanimated'

import config from '@/tamagui.config'
import { PortalProvider } from '@tamagui/portal'
import { TamaguiProvider, Theme } from 'tamagui'

import { TabBarNative } from "@/components/navigation/native/tabbar.tsx"
import { NavbarWeb } from '@/components/navigation/web/navbar'
import { AuthProvider } from '@/context/SessionContext'
import { ThemeProvider, useThemeContext } from '@/context/ThemeSwitch.tsx'

function RootContent() {
    const {currentTheme} = useThemeContext()

    return (
        <Theme name={currentTheme}>
            <AuthProvider>
                <View style={{flex: 1}}>
                    {Platform.OS === 'web' ? <NavbarWeb /> : <TabBarNative />}
                    <Slot/>
                    <StatusBar style={currentTheme === 'dark' ? 'light' : 'dark'}/>
                </View>
            </AuthProvider>
        </Theme>
    )
}

export default function RootLayout() {
    const [loaded] = useFonts({
        Oswald_400Regular,
        Oswald_500Medium,
        Oswald_600SemiBold,
        Oswald_700Bold,
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    })

    if (!loaded) return null

    return (
        <TamaguiProvider config={config}>
            <PortalProvider shouldAddRootHost>
                <ThemeProvider>
                    <RootContent/>
                </ThemeProvider>
            </PortalProvider>
        </TamaguiProvider>
    )
}
