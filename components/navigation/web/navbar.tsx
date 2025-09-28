import {Link, useRouter} from 'expo-router';
import {Button, Text, XStack, YStack, useTheme, Popover, Adapt} from 'tamagui';

import {ThemeSwitch} from '@/context/ThemeSwitch.tsx';
import {LOGO, MapIcon, InfoIcon, CloudIcon} from '@/components/ui/Icons';
import {User, ChevronDown} from '@tamagui/lucide-icons';
import {useSession} from '@/context/SessionContext';
import {PrimaryButton, SecondaryButton} from "@/types/button.ts";


export function NavbarWeb() {
    const router = useRouter();
    const t = useTheme();
    const {session} = useSession();

    return (
        <XStack jc={"space-between"} backgroundColor={"$background"} alignItems={"center"} px={"$10"} gap={"$9"}
                py={"$1"}>
            <Link href="/map">
                <XStack ac="center" jc="center" gap="$2">
                    <LOGO size={75} color={t.accent8?.val}/>
                    <Text fontSize={40} fontFamily={"$oswald"} alignSelf={"center"} fontWeight="bold"
                          textAlign={"center"} color={"$accent8"}>Marlin</Text>
                </XStack>
            </Link>

            <XStack alignItems={"center"} gap={"$8"}>
                <Link href="/map">
                    <XStack alignItems="center" gap="$3">
                        <MapIcon color={t.accent8?.val} size={26}/>
                        <Text fontSize="$6" fontWeight={"500"} alignSelf={"center"} color={"$accent8"}>
                            Karte
                        </Text>
                    </XStack>
                </Link>

                <Popover placement="bottom" allowFlip>
                    <Popover.Trigger asChild>
                        <XStack alignItems={"center"} gap={"$2"} cursor="pointer">
                            <InfoIcon color={t.accent8?.val} size={26}/>
                            <Text fontSize="$6" fontWeight={"500"} alignSelf={"center"} color={"$accent8"}>
                                Über uns
                            </Text>
                            <ChevronDown size={16} color={t.accent8?.val} />
                        </XStack>
                    </Popover.Trigger>

                    <Adapt when="sm" platform="touch">
                        <Popover.Sheet modal dismissOnSnapToBottom>
                            <Popover.Sheet.Frame padding="$2">
                                <Adapt.Contents/>
                            </Popover.Sheet.Frame>
                            <Popover.Sheet.Overlay
                                animation="lazy"
                                enterStyle={{opacity: 0}}
                                exitStyle={{opacity: 0}}
                            />
                        </Popover.Sheet>
                    </Adapt>

                    <Popover.Content
                        borderWidth={1}
                        borderColor="$borderColor"
                        enterStyle={{y: -10, opacity: 0}}
                        exitStyle={{y: -10, opacity: 0}}
                        elevate
                        animation={[
                            'quick',
                            {
                                opacity: {
                                    overshootClamping: true,
                                },
                            },
                        ]}
                    >
                        <Popover.Arrow borderWidth={1} borderColor="$borderColor"/>

                        <YStack gap="$3" padding="$2" minWidth={200}>
                            <Button
                                variant="outlined"
                                justifyContent="flex-start"
                                onPress={() => router.push('/about')}
                            >
                                <XStack alignItems="center" gap="$3" width="100%">
                                    <InfoIcon size={26} color={t.accent6?.val}/>
                                    <Text color="$color" fontSize={"$5"} fontFamily={"$silkscreen"}>Über uns</Text>
                                </XStack>
                            </Button>

                            <Button
                                variant="outlined"
                                justifyContent="flex-start"
                                onPress={() => router.push('/sensors')}
                            >
                                <XStack alignItems="center" gap="$3" width="100%">
                                    <LOGO size={26}   color={t.accent6?.val}/>
                                    <Text color="$color">Sensoren</Text>
                                </XStack>
                            </Button>

                            <Button
                                variant="outlined"
                                justifyContent="flex-start"
                                onPress={() => router.push('/api')}
                            >
                                <XStack alignItems="center" gap="$3" width="100%">
                                    <CloudIcon size={26}  color={t.accent6?.val}/>
                                    <Text color="$color">API</Text>
                                </XStack>
                            </Button>
                        </YStack>
                    </Popover.Content>
                </Popover>
            </XStack>

            <XStack gap="$6" alignItems="center" style={{right: 30}}>
                <ThemeSwitch size={24} color={"$background"}/>
                {!session && (
                    <XStack gap="$2">
                        <Link href="/login">
                            <PrimaryButton>
                                <Text color="#ffffff">Anmelden</Text>
                            </PrimaryButton>
                        </Link>

                        <Link href="/register">
                            <SecondaryButton>
                                <Text>Registrieren</Text>
                            </SecondaryButton>
                        </Link>
                    </XStack>
                )}
                {session && (
                    <XStack gap="$2">
                        <Link href="/(profile)/profile">
                            <Button variant="outlined">
                                <XStack alignItems="center" gap="$2">
                                    <User size={28} color={"$accent8"}/>
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


