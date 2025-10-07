import { Link, useRouter } from 'expo-router';
import { Button, Popover, Sheet, Text, XStack, YStack, useMedia, useTheme } from 'tamagui';

import { LanguageSelector } from '@/components/common/LanguageSelector';
import { CloudIcon, InfoIcon, LOGO, MapIcon } from '@/components/ui/Icons';
import { useSession } from '@/context/SessionContext';
import { ThemeSwitch } from '@/context/ThemeSwitch.tsx';
import { useTranslation } from '@/hooks/useTranslation';
import { PrimaryButton, SecondaryButton } from "@/types/button.ts";
import { ChevronDown, Languages, LogOut, Menu, User } from '@tamagui/lucide-icons';
import { useState } from 'react';


export function NavbarWeb() {
    const router = useRouter();
    const t = useTheme();
    const {session, logout} = useSession();
    const {t: translate} = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const media = useMedia();

    const handleLogout = () => {
        logout();
        router.push('/map');
    };

    return (
        <XStack jc={"space-between"} backgroundColor={"$background"} alignItems={"center"} px={"$14"} $md={{px: "$4"}}
                gap={"$4"}
                py={"$1"}>
            <Link href="/map">
                <XStack ac="center" jc="flex-start" gap="$2">
                    <LOGO size={media.gtMd ? 55 : 50} color={t.accent8?.val}/>
                    <Text fontSize={media.gtMd ? 32 : 28} fontFamily={"$oswald"} alignSelf={"center"} fontWeight="bold"
                          textAlign={"left"} color={"$accent8"}>Marlin</Text>
                </XStack>
            </Link>

            {media.gtMd && (
                <XStack alignItems={"center"} gap={"$8"}>
                    <Link href="/map">
                        <XStack alignItems="center" gap="$3">
                            <MapIcon color={t.accent8?.val} size={26}/>
                            <Text fontSize="$6" fontWeight={"500"} alignSelf={"center"} color={"$accent8"}>
                                {translate('navigation.map')}
                            </Text>
                        </XStack>
                    </Link>

                    <Link href="/dashboard/5">
                        <XStack alignItems="center" gap="$3">
                            {/* <MapIcon color={t.accent8?.val} size={26}/> */}
                            <Text fontSize="$6" fontWeight={"500"} alignSelf={"center"} color={"$accent8"}>
                                {translate('dashboard.dashboard')}
                            </Text>
                        </XStack>
                    </Link>

                    <Popover placement="bottom" allowFlip>
                        <Popover.Trigger asChild>
                            <XStack alignItems={"center"} gap={"$2"} cursor="pointer">
                                <InfoIcon color={t.accent8?.val} size={26}/>
                                <Text fontSize="$6" fontWeight={"500"} alignSelf={"center"} color={"$accent8"}>
                                    {translate('navigation.aboutUs')}
                                </Text>
                                <ChevronDown size={16} color={t.accent8?.val}/>
                            </XStack>
                        </Popover.Trigger>

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
                                        <Text color="$color" >{translate('navigation.aboutUs')}</Text>
                                    </XStack>
                                </Button>

                                <Button
                                    variant="outlined"
                                    justifyContent="flex-start"
                                    onPress={() => router.push('/sensors')}
                                >
                                    <XStack alignItems="center" gap="$3" width="100%">
                                        <LOGO size={26} color={t.accent6?.val}/>
                                        <Text color="$color">{translate('navigation.sensors')}</Text>
                                    </XStack>
                                </Button>

                                <Button
                                    variant="outlined"
                                    justifyContent="flex-start"
                                    onPress={() => router.push('/api')}
                                >
                                    <XStack alignItems="center" gap="$3" width="100%">
                                        <CloudIcon size={26} color={t.accent6?.val}/>
                                        <Text color="$color">{translate('navigation.api')}</Text>
                                    </XStack>
                                </Button>
                            </YStack>
                        </Popover.Content>
                    </Popover>
                </XStack>
            )}

            {media.gtMd && (
                <XStack gap="$6" alignItems="center">
                    <Popover placement="bottom" allowFlip>
                        <Popover.Trigger asChild>
                            <XStack alignItems={"center"} gap={"$2"} cursor="pointer">
                                <Languages color={t.accent8?.val} size={24}/>
                            </XStack>
                        </Popover.Trigger>

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
                            <LanguageSelector/>
                        </Popover.Content>
                    </Popover>
                    <ThemeSwitch size={24} color={"$background"}/>
                    {!session && (
                        <XStack gap="$2">
                            <Link href="/login">
                                <PrimaryButton>
                                    <Text color="#ffffff">{translate('auth.login')}</Text>
                                </PrimaryButton>
                            </Link>

                            <Link href="/register">
                                <SecondaryButton>
                                    <Text>{translate('auth.register')}</Text>
                                </SecondaryButton>
                            </Link>
                        </XStack>
                    )}
                    {session && (
                        <XStack gap="$2">
                            <Link href="/(profile)/profile">
                                <Button variant="outlined">
                                    <XStack alignItems="center" gap="$2">
                                        <User size={20} color={"$accent8"}/>
                                        <Text>{translate('navigation.profile')}</Text>
                                    </XStack>
                                </Button>
                            </Link>
                            <Button variant="outlined" onPress={handleLogout}>
                                <XStack alignItems="center" gap="$2">
                                    <LogOut size={20} color={"$accent8"}/>
                                    <Text>{translate('auth.logout')}</Text>
                                </XStack>
                            </Button>
                        </XStack>
                    )}
                </XStack>
            )}

            {!media.gtMd && (
                <Button
                    onPress={() => setIsMenuOpen(true)}
                    circular
                    size="$4"
                    backgroundColor="$background"
                    borderWidth={2}
                    borderColor="$borderColor"
                    hoverStyle={{
                        backgroundColor: "$backgroundHover",
                        borderColor: "$accent8"
                    }}
                    pressStyle={{
                        backgroundColor: "$backgroundPress",
                        scale: 0.95
                    }}
                >
                    <Menu size={24} color={t.accent8?.val}/>
                </Button>
            )}

            <Sheet
                modal
                open={isMenuOpen}
                onOpenChange={setIsMenuOpen}
                snapPoints={[85, 50]}
                dismissOnSnapToBottom
                animation="medium"
            >
                <Sheet.Overlay
                    animation="lazy"
                    enterStyle={{opacity: 0}}
                    exitStyle={{opacity: 0}}
                    opacity={0}
                />
                <Sheet.Frame
                    padding="$0"
                    backgroundColor="$background"
                    borderTopLeftRadius="$6"
                    borderTopRightRadius="$6"
                >
                    <Sheet.Handle backgroundColor="$borderColor"/>

                    <YStack padding="$4" gap="$2">
                        <XStack justifyContent="space-between" alignItems="center" paddingBottom="$4"
                                borderBottomWidth={1} borderBottomColor="$borderColor">
                            <Text fontSize="$7" fontWeight="bold" color="$accent8" fontFamily="$oswald">
                                Menu
                            </Text>
                            <Button
                                circular
                                size="$3"
                                chromeless
                                onPress={() => setIsMenuOpen(false)}
                            >
                                <Text fontSize="$6" color="$color">✕</Text>
                            </Button>
                        </XStack>

                        <YStack gap="$2" paddingTop="$3">
                            <Link href="/map" onPress={() => setIsMenuOpen(false)}>
                                <XStack
                                    alignItems="center"
                                    gap="$3"
                                    padding="$3"
                                    borderRadius="$3"
                                    hoverStyle={{
                                        backgroundColor: "$backgroundHover"
                                    }}
                                    pressStyle={{
                                        backgroundColor: "$backgroundPress"
                                    }}
                                >
                                    <MapIcon color={t.accent8?.val} size={24}/>
                                    <Text fontSize="$5" fontWeight="500" color="$accent8">
                                        {translate('navigation.map')}
                                    </Text>
                                </XStack>
                            </Link>

                            <Link href="/about" onPress={() => setIsMenuOpen(false)}>
                                <XStack
                                    alignItems="center"
                                    gap="$3"
                                    padding="$3"
                                    borderRadius="$3"
                                    hoverStyle={{
                                        backgroundColor: "$backgroundHover"
                                    }}
                                    pressStyle={{
                                        backgroundColor: "$backgroundPress"
                                    }}
                                >
                                    <InfoIcon size={24} color={t.accent8?.val}/>
                                    <Text fontSize="$5" fontWeight="500"
                                          color="$accent8">{translate('navigation.aboutUs')}</Text>
                                </XStack>
                            </Link>

                            <Link href="/sensors" onPress={() => setIsMenuOpen(false)}>
                                <XStack
                                    alignItems="center"
                                    gap="$3"
                                    padding="$3"
                                    borderRadius="$3"
                                    hoverStyle={{
                                        backgroundColor: "$backgroundHover"
                                    }}
                                    pressStyle={{
                                        backgroundColor: "$backgroundPress"
                                    }}
                                >
                                    <LOGO size={24} color={t.accent8?.val}/>
                                    <Text fontSize="$5" fontWeight="500"
                                          color="$accent8">{translate('navigation.sensors')}</Text>
                                </XStack>
                            </Link>

                            <Link href="/api" onPress={() => setIsMenuOpen(false)}>
                                <XStack
                                    alignItems="center"
                                    gap="$3"
                                    padding="$3"
                                    borderRadius="$3"
                                    hoverStyle={{
                                        backgroundColor: "$backgroundHover"
                                    }}
                                    pressStyle={{
                                        backgroundColor: "$backgroundPress"
                                    }}
                                >
                                    <CloudIcon size={24} color={t.accent8?.val}/>
                                    <Text fontSize="$5" fontWeight="500"
                                          color="$accent8">{translate('navigation.api')}</Text>
                                </XStack>
                            </Link>
                        </YStack>

                        <YStack gap="$3" paddingTop="$4" borderTopWidth={1} borderTopColor="$borderColor"
                                marginTop="$3">
                            <YStack gap="$2">
                                <XStack gap="$3" padding="$3" alignItems="center" justifyContent="space-between">
                                    <XStack gap="$2" alignItems="center">
                                        <Languages color={t.accent8?.val} size={22}/>
                                        <Text fontSize="$4" fontWeight="500"
                                              color="$color">{translate('settings.language')}</Text>
                                    </XStack>
                                    <Text fontSize="$3" color="$color">{translate('language.name')}</Text>
                                </XStack>
                                <YStack paddingHorizontal="$3">
                                    <LanguageSelector/>
                                </YStack>
                            </YStack>

                            <XStack gap="$3" padding="$3" alignItems="center" justifyContent="space-between">
                                <XStack gap="$2" alignItems="center">
                                    <Text fontSize="$4" fontWeight="500"
                                          color="$color">{translate('settings.theme')}</Text>
                                </XStack>
                                <ThemeSwitch size={24}/>
                            </XStack>
                        </YStack>

                        {!session && (
                            <YStack gap="$3" paddingTop="$4">
                                <Link href="/login" onPress={() => setIsMenuOpen(false)}>
                                    <PrimaryButton width="100%">
                                        <Text color="#ffffff" fontSize="$5">{translate('auth.login')}</Text>
                                    </PrimaryButton>
                                </Link>
                                <Link href="/register" onPress={() => setIsMenuOpen(false)}>
                                    <SecondaryButton width="100%">
                                        <Text fontSize="$5">{translate('auth.register')}</Text>
                                    </SecondaryButton>
                                </Link>
                            </YStack>
                        )}

                        {session && (
                            <YStack paddingTop="$4">
                                <Link href="/(profile)/profile" onPress={() => setIsMenuOpen(false)}>
                                    <Button variant="outlined" width="100%">
                                        <XStack alignItems="center" gap="$2">
                                            <User size={24} color={"$accent8"}/>
                                            <Text fontSize="$5">{translate('navigation.profile')}</Text>
                                        </XStack>
                                    </Button>
                                </Link>
                            </YStack>
                        )}
                    </YStack>
                </Sheet.Frame>
            </Sheet>
        </XStack>
    );
}


