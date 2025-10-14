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
import {TamaguiProvider, Theme, XStack, YStack} from 'tamagui'
import {Toast, ToastProvider, ToastViewport, useToastState} from '@tamagui/toast'
import {CheckCircle, XCircle, AlertTriangle, Info} from '@tamagui/lucide-icons'

import {TabBarNative} from "@/components/navigation/native/tabbar.tsx"
import {NavbarWeb} from '@/components/navigation/web/navbar'
import {Footer} from '@/components/navigation/web/Footer'
import {AuthProvider} from '@/context/SessionContext'
import {ThemeProvider, useThemeContext} from '@/context/ThemeSwitch.tsx'
import {usePathname} from 'expo-router'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import type {ToastType} from '@/components/useToast'

function CurrentToast() {
    const currentToast = useToastState()

    if (!currentToast || currentToast.isHandledNatively) return null

    const type = (currentToast.customData?.type as ToastType) || 'info'

    const getToastStyles = (type: ToastType) => {
        switch (type) {
            case 'success':
                return {
                    backgroundColor: '$green4',
                    borderColor: '$green7',
                    icon: CheckCircle,
                    iconColor: '$green10'
                }
            case 'error':
                return {
                    backgroundColor: '$red4',
                    borderColor: '$red7',
                    icon: XCircle,
                    iconColor: '$red10'
                }
            case 'warning':
                return {
                    backgroundColor: '$orange4',
                    borderColor: '$orange7',
                    icon: AlertTriangle,
                    iconColor: '$orange10'
                }
            case 'info':
            default:
                return {
                    backgroundColor: '$blue4',
                    borderColor: '$blue7',
                    icon: Info,
                    iconColor: '$blue10'
                }
        }
    }

    const styles = getToastStyles(type)
    const IconComponent = styles.icon

    return (
        <Toast
            key={currentToast.id}
            duration={currentToast.duration}
            animation="100ms"
            enterStyle={{opacity: 0, scale: 0.9, y: -10}}
            exitStyle={{opacity: 0, scale: 0.9, y: -10}}
            opacity={1}
            y={0}
            scale={1}
            backgroundColor={styles.backgroundColor}
            borderWidth={1}
            borderColor={styles.borderColor}
        >
            <XStack gap="$3" alignItems="center">
                <IconComponent size={20} color={styles.iconColor}/>
                <YStack flex={1}>
                    <Toast.Title color="$color">{currentToast.title}</Toast.Title>
                    {!!currentToast.message && (
                        <Toast.Description color="$color" opacity={0.8}>{currentToast.message}</Toast.Description>
                    )}
                </YStack>
            </XStack>
        </Toast>
    )
}

function SafeToastViewport() {
    const {top, right, left} = useSafeAreaInsets()
    return (
        <ToastViewport
            flexDirection="column-reverse"
            top={Platform.OS === 'web' ? '$4' : top + 8}
            left={left || '$4'}
            right={right || '$4'}
        />
    )
}

function RootContent() {
    const {currentTheme} = useThemeContext()
    const pathname = usePathname()

    const shouldShowFooter = Platform.OS === 'web' && pathname !== '/map'

    useEffect(() => {
        if (Platform.OS === 'web' && typeof document !== 'undefined') {
            document.title = 'MARLIN - Maritime Live Information'
        }
    }, [])

    return (
        <Theme name={currentTheme}>
            <ToastProvider>
                <AuthProvider>
                    <CurrentToast/>
                    <View style={{flex: 1}}>
                        {Platform.OS === 'web' ? <NavbarWeb/> : <TabBarNative/>}
                        <View style={{flex: 1}}>
                            <Slot/>
                        </View>
                        {shouldShowFooter && <Footer/>}
                        <StatusBar style={currentTheme === 'dark' ? 'light' : 'dark'}/>
                    </View>
                </AuthProvider>
                <SafeToastViewport/>
            </ToastProvider>
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
