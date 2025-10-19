import {Link, useRouter, Href} from 'expo-router';
import {Button, Popover, Sheet, Text, XStack, YStack, useTheme, ScrollView, Tooltip} from 'tamagui';
import {useToast} from '@/components/useToast';

import {ThemeSwitch} from '@/context/ThemeSwitch.tsx';
import {LOGO, MapIcon, CloudIcon} from '@/components/ui/Icons';
import {User, Languages, Menu, LogOut, LayoutDashboard, BookOpen} from '@tamagui/lucide-icons';
import {useSession} from '@/context/SessionContext';
import {PrimaryButton, SecondaryButton} from "@/types/button.ts";
import {useTranslation} from '@/hooks/useTranslation';
import {LanguageSelector} from '@/components/common/LanguageSelector';
import {useState} from 'react';
import {useIsMobileWeb} from '@/hooks/useIsMobileWeb';


export function NavbarWeb() {
    const router = useRouter();
    const t = useTheme();
    const {session, logout} = useSession();
    const {t: translate} = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isMobileWeb = useIsMobileWeb();
    const toast = useToast();

    const handleLogout = () => {
        logout();
        toast.info(translate('auth.logoutSuccess'), {
            message: translate('auth.logoutMessage'),
            duration: 3000
        });
        router.push('/map');
    };

    return (
        <XStack jc={"space-between"} backgroundColor={"$background"} alignItems={"center"} px={"$14"} $md={{px: "$4"}}
                gap={"$4"}
                py={"$1"}>
            <Link href={"/map" as Href}>
                <XStack ac="center" jc="flex-start" gap="$2">
                    <LOGO size={isMobileWeb ? 50 : 55} color={t.accent8?.val}/>
                    <Text fontSize={isMobileWeb ? 28 : 32} fontFamily={"$oswald"} alignSelf={"center"} fontWeight="bold"
                          textAlign={"left"} color={"$accent8"}>Marlin</Text>
                </XStack>
            </Link>

            {!isMobileWeb && (
                <XStack alignItems={"center"} gap={"$8"}>
                    <Link href={"/map" as Href}>
                        <XStack alignItems="center" gap="$3">
                            <MapIcon color={t.accent8?.val} size={26}/>
                            <Text fontSize="$6" fontWeight={"500"} alignSelf={"center"} color={"$accent8"}>
                                {translate('navigation.map')}
                            </Text>
                        </XStack>
                    </Link>

                    <Link href={"/dashboard/5" as Href}>
                        <XStack alignItems="center" gap="$3">
                            <LayoutDashboard color={t.accent8?.val} size={26}/>
                            <Text fontSize="$6" fontWeight={"500"} alignSelf={"center"} color={"$accent8"}>
                                {translate('dashboard.dashboard')}
                            </Text>
                        </XStack>
                    </Link>

                    <Link href={"/sensors" as Href}>
                        <XStack alignItems="center" gap="$3">
                            <LOGO color={t.accent8?.val} size={26}/>
                            <Text fontSize="$6" fontWeight={"500"} alignSelf={"center"} color={"$accent8"}>
                                {translate('navigation.sensors')}
                            </Text>
                        </XStack>
                    </Link>

                    <Link href={"/api" as Href}>
                        <XStack alignItems="center" gap="$3">
                            <CloudIcon color={t.accent8?.val} size={26}/>
                            <Text fontSize="$6" fontWeight={"500"} alignSelf={"center"} color={"$accent8"}>
                                {translate('navigation.api')}
                            </Text>
                        </XStack>
                    </Link>
                </XStack>
            )}

            {!isMobileWeb && (
                <XStack gap="$6" alignItems="center">
                    <Tooltip placement="bottom" delay={200}>
                        <Tooltip.Trigger>
                            <Button
                                circular
                                size="$3"
                                chromeless
                                onPress={() => window.open('https://projekt.marlin-live.com', '_blank')}
                                cursor="pointer"
                            >
                                <BookOpen color={t.accent8?.val} size={24}/>
                            </Button>
                        </Tooltip.Trigger>
                        <Tooltip.Content
                            enterStyle={{x: 0, y: -5, opacity: 0, scale: 0.9}}
                            exitStyle={{x: 0, y: -5, opacity: 0, scale: 0.9}}
                            scale={1}
                            x={0}
                            y={0}
                            opacity={1}
                            animation={[
                                'quick',
                                {
                                    opacity: {
                                        overshootClamping: true,
                                    },
                                },
                            ]}
                        >
                            <Tooltip.Arrow/>
                            <Text fontSize="$3">{translate('navigation.projectWebsite')}</Text>
                        </Tooltip.Content>
                    </Tooltip>

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
                            <Link href={"/login" as Href}>
                                <PrimaryButton>
                                    <Text color="#ffffff">{translate('auth.login')}</Text>
                                </PrimaryButton>
                            </Link>

                            <Link href={"/register" as Href}>
                                <SecondaryButton>
                                    <Text>{translate('auth.register')}</Text>
                                </SecondaryButton>
                            </Link>
                        </XStack>
                    )}
                    {session && (
                        <XStack gap="$2">
                            <Link href={"/(profile)/profile" as Href}>
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

            {isMobileWeb && (
                <Button
                    onPress={() => setIsMenuOpen(true)}
                    circular
                    size="$4"
                    backgroundColor="$background"
                    borderWidth={2}
                    borderColor="$accent8"
                    hoverStyle={{
                        backgroundColor: "$backgroundHover",
                        borderColor: "$accent9"
                    }}
                    pressStyle={{
                        backgroundColor: "$backgroundPress",
                        borderColor: "$accent10",
                        scale: 0.95
                    }}
                >
                    <Menu size={24} color={t.accent8?.val} strokeWidth={2.5}/>
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

                    <ScrollView>
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
                                <Link href={"/map" as Href} onPress={() => setIsMenuOpen(false)}>
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

                                <Link href={"/dashboard/5" as Href} onPress={() => setIsMenuOpen(false)}>
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
                                        <LayoutDashboard color={t.accent8?.val} size={24}/>
                                        <Text fontSize="$5" fontWeight="500" color="$accent8">
                                            {translate('dashboard.dashboard')}
                                        </Text>
                                    </XStack>
                                </Link>

                                <Link href={"/sensors" as Href} onPress={() => setIsMenuOpen(false)}>
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

                                <Link href={"/api" as Href} onPress={() => setIsMenuOpen(false)}>
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
                                    onPress={() => {
                                        window.open('https://github.com/Bukutsu/marlin-application', '_blank');
                                        setIsMenuOpen(false);
                                    }}
                                >
                                    <BookOpen size={24} color={t.accent8?.val}/>
                                    <Text fontSize="$5" fontWeight="500" color="$accent8">
                                        {translate('navigation.projectWebsite')}
                                    </Text>
                                </XStack>
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
                                    <Link href={"/login" as Href} onPress={() => setIsMenuOpen(false)}>
                                        <PrimaryButton width="100%">
                                            <Text color="#ffffff" fontSize="$5">{translate('auth.login')}</Text>
                                        </PrimaryButton>
                                    </Link>
                                    <Link href={"/register" as Href} onPress={() => setIsMenuOpen(false)}>
                                        <SecondaryButton width="100%">
                                            <Text fontSize="$5">{translate('auth.register')}</Text>
                                        </SecondaryButton>
                                    </Link>
                                </YStack>
                            )}

                            {session && (
                                <YStack gap="$3" paddingTop="$4">
                                    <Link href={"/(profile)/profile" as Href} onPress={() => setIsMenuOpen(false)}>
                                        <Button variant="outlined" width="100%">
                                            <XStack alignItems="center" gap="$2">
                                                <User size={24} color={"$accent8"}/>
                                                <Text fontSize="$5">{translate('navigation.profile')}</Text>
                                            </XStack>
                                        </Button>
                                    </Link>
                                    <Button variant="outlined" width="100%" onPress={() => {
                                        handleLogout();
                                        setIsMenuOpen(false);
                                    }}>
                                        <XStack alignItems="center" gap="$2">
                                            <LogOut size={24} color={"$accent8"}/>
                                            <Text fontSize="$5">{translate('auth.logout')}</Text>
                                        </XStack>
                                    </Button>
                                </YStack>
                            )}
                        </YStack>
                    </ScrollView>
                </Sheet.Frame>
            </Sheet>
        </XStack>
    );
}


