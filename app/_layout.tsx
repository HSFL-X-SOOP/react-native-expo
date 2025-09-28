import 'react-native-reanimated'
import '@/i18n'
import {
    useFonts,
    Oswald_400Regular,
    Oswald_500Medium,
    Oswald_600SemiBold,
    Oswald_700Bold
} from '@expo-google-fonts/oswald'
import {Platform, View} from 'react-native'
import {StatusBar} from 'expo-status-bar'
import {Slot} from 'expo-router'

import {TamaguiProvider, Theme} from 'tamagui'
import config from '@/tamagui.config'

import {AuthProvider} from '@/context/SessionContext'
import {NavbarWeb} from '@/components/navigation/web/navbar'
import {ThemeProvider, useThemeContext} from '@/context/ThemeSwitch.tsx'
import {TabBarNative} from "@/components/navigation/native/tabbar.tsx";

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
            <ThemeProvider>
                <RootContent/>
            </ThemeProvider>
        </TamaguiProvider>
    )
}
