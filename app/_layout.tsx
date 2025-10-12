import '@/i18n'
import {
    Oswald_400Regular,
    Oswald_500Medium,
    Oswald_600SemiBold,
    Oswald_700Bold,
    useFonts
} from '@expo-google-fonts/oswald'
import {Slot} from 'expo-router'
import {StatusBar} from 'expo-status-bar'
import {Platform, View} from 'react-native'
import {useEffect} from 'react'
import 'react-native-reanimated'

import config from '@/tamagui.config'
import {PortalProvider} from '@tamagui/portal'
import {TamaguiProvider, Theme} from 'tamagui'

import {TabBarNative} from "@/components/navigation/native/tabbar.tsx"
import {NavbarWeb} from '@/components/navigation/web/navbar'
import {Footer} from '@/components/navigation/web/Footer'
import {AuthProvider} from '@/context/SessionContext'
import {ThemeProvider, useThemeContext} from '@/context/ThemeSwitch.tsx'
import {usePathname} from 'expo-router'

function RootContent() {
    const {currentTheme} = useThemeContext()
    const pathname = usePathname()

    // Don't show footer on map page
    const shouldShowFooter = Platform.OS === 'web' && pathname !== '/map'

    useEffect(() => {
        if (Platform.OS === 'web' && typeof document !== 'undefined') {
            document.title = 'MARLIN - Maritime Live Information'
        }
    }, [])

    return (
        <Theme name={currentTheme}>
            <AuthProvider>
                <View style={{flex: 1}}>
                    {Platform.OS === 'web' ? <NavbarWeb/> : <TabBarNative/>}
                    <View style={{flex: 1}}>
                        <Slot/>
                    </View>
                    {shouldShowFooter && <Footer/>}
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
