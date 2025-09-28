import {Link, useRouter} from 'expo-router';
import {useState} from 'react';
import {Button, Text, XStack, YStack, Sheet, useTheme} from 'tamagui';

import {ThemeSwitch, useThemeContext} from '@/components/ui/ThemeSwitch';
import {LOGO, MapIcon, InfoIcon, CloudIcon} from '@/components/ui/Icons';
import {User} from '@tamagui/lucide-icons';
import {useSession} from '@/context/SessionContext';
import {PrimaryButton} from "@/types/button.ts";

export function NavbarWeb() {
    const router = useRouter();
    const {currentTheme} = useThemeContext()
    const t = useTheme();

    const [menuOpen, setMenuOpen] = useState(false);
    const openMenu = () => setMenuOpen(true);
    const closeMenu = () => setMenuOpen(false);


    const {session} = useSession();

    const navbarBg = currentTheme === 'dark' ? '#053246' : '#78d278';
    const textColor = '#ffffff';
    const iconColor = textColor;

    return (
        <XStack jc={"space-between"} backgroundColor={"$background"} alignItems={"center"} gap={"$9"} padding="$2">
            <Link href="/map">
                <XStack ac="center" jc="center" gap="$2">
                    <LOGO size={70} color={t.color?.val}/>
                    <Text fontSize={42} fontFamily={"$oswald"} alignSelf={"center"} fontWeight="bold"
                          textAlign={"center"} color={"$color"}>Marlin</Text>
                </XStack>
            </Link>

            <XStack alignItems={"center"} gap={"$8"}>
                <Link href="/map">
                    <XStack alignItems="center" gap="$3">
                        <MapIcon color={t.accentColor?.val} size={30}/>
                        <Text fontSize="$7" fontWeight={"500"} alignSelf={"center"} color={"$color"}>
                            Karte
                        </Text>
                    </XStack>
                </Link>

                <Link href={"/about"}>
                    <XStack onPress={openMenu} alignItems={"center"} gap={"$3"}>
                        <InfoIcon color={t.accentColor?.val} size={30}/>
                        <Text fontSize="$7" fontWeight={"500"} alignSelf={"center"} color={"$color"}>
                            Über uns
                        </Text>
                    </XStack>

                </Link>

                <Sheet modal open={menuOpen} onOpenChange={setMenuOpen} snapPoints={[25]} dismissOnSnapToBottom>
                    <Sheet.Overlay/>
                    <Sheet.Handle/>
                    <Sheet.Frame padding="$4">
                        <YStack space="$4">
                            <Button
                                onPress={() => {
                                    router.push('/about');
                                    closeMenu();
                                }}
                            >
                                <XStack alignItems="center" gap="$2">
                                    <InfoIcon size={16}/>
                                    <Text>Über uns</Text>
                                </XStack>
                            </Button>
                            <Button
                                onPress={() => {
                                    router.push('/sensors');
                                    closeMenu();
                                }}
                            >
                                <XStack alignItems="center" gap="$2">
                                    <LOGO size={16}/>
                                    <Text>Sensoren</Text>
                                </XStack>
                            </Button>
                            <Button
                                onPress={() => {
                                    router.push('/api');
                                    closeMenu();
                                }}
                            >
                                <XStack alignItems="center" gap="$2">
                                    <CloudIcon size={16}/>
                                    <Text>API</Text>
                                </XStack>
                            </Button>
                        </YStack>
                    </Sheet.Frame>
                </Sheet>
            </XStack>

            <XStack gap="$6" alignItems="center" style={{right: 30}}>
                <ThemeSwitch size={20} color={iconColor}/>
                {!session && (
                    <XStack gap="$2">
                        <Link href="/login">
                            <PrimaryButton theme={"secondary"}>
                                <Text>Anmelden</Text>
                            </PrimaryButton>
                        </Link>

                        <Link href="/register">
                            <Button variant="outlined">
                                <Text>Registrieren</Text>
                            </Button>
                        </Link>
                    </XStack>
                )}
                {session && (
                    <XStack gap="$2">
                        <Link href="/(profile)/profile">
                            <Button variant="outlined">
                                <XStack alignItems="center" gap="$2">
                                    <User size={28} color={iconColor}/>
                                    <Text>Profil</Text>
                                </XStack>
                            </Button>
                        </Link>
                    </XStack>
                )}
            </XStack>
        </XStack>
    );
}


