import { LanguageSelector } from '@/components/common/LanguageSelector';
import { CloudIcon, InfoIcon, LOGO, MapIcon, MoonFilledIcon, SunFilledIcon } from '@/components/ui/Icons';
import { useSession } from '@/context/SessionContext';
import { useThemeContext } from '@/context/ThemeSwitch.tsx';
import { useTranslation } from '@/hooks/useTranslation';
import { Languages, LayoutDashboard, Menu, User, X } from '@tamagui/lucide-icons';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text as RNText, ScrollView, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Sheet, Text, useTheme, XStack } from 'tamagui';

export function TabBarNative() {
    const router = useRouter();
    const t = useTheme();
    const {session} = useSession();
    const {t: translate} = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const insets = useSafeAreaInsets();

    // Get theme context safely
    const {isDark, toggleTheme} = useThemeContext();

    const closeMenu = () => setIsMenuOpen(false);

    const navigateAndClose = (path: string) => {
        console.log('Navigating to:', path);
        setIsMenuOpen(false);
        requestAnimationFrame(() => router.push(path as any));
    };

    return (
        <>
            {/* Top Header */}
            <XStack
                backgroundColor={"$background"}
                alignItems={"center"}
                justifyContent="space-between"
                px={"$4"}
                py={"$3"}
                pt={insets.top + 12}
                borderBottomWidth={1}
                borderBottomColor="$borderColor"
            >
                {/* Logo */}
                <Link href="/map">
                    <XStack alignItems="center" gap="$2">
                        <LOGO size={40} color={t.accent8?.val}/>
                        <Text
                            fontSize={24}
                            fontFamily={"$oswald"}
                            fontWeight="bold"
                            color={"$accent8"}
                        >
                            Marlin
                        </Text>
                    </XStack>
                </Link>

                {/* Right side controls */}
                <TouchableOpacity
                    onPress={() => {
                        console.log('Hamburger menu pressed');
                        setIsMenuOpen(true);
                    }}
                    style={{
                        padding: 12,
                        minWidth: 44,
                        minHeight: 44,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 8,
                        backgroundColor: 'rgba(0,0,0,0.05)',
                        zIndex: 999,
                    }}
                    activeOpacity={0.7}
                    hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
                >
                    <Menu size={28} color={t.accent8?.val}/>
                </TouchableOpacity>
            </XStack>

            {/* Mobile Menu Sheet */}
            <Sheet
                modal
                open={isMenuOpen}
                onOpenChange={setIsMenuOpen}
                snapPointsMode="percent"
                snapPoints={[85]}
                position={0}
                dismissOnSnapToBottom
                dismissOnOverlayPress
                zIndex={100000}
                animation="medium"
            >
                <Sheet.Handle
                    alignSelf="center"
                    height={6}
                    width={56}
                    opacity={0.35}
                    backgroundColor="$accent8"
                />
                <Sheet.Frame backgroundColor="$background" flex={1}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingHorizontal: 16,
                            paddingTop: 8,
                            paddingBottom: (insets.bottom ?? 0) + 32,
                        }}
                        keyboardShouldPersistTaps="handled"
                    >
                        {/* Header */}
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 30
                        }}>
                            <RNText style={{
                                fontSize: 24,
                                fontWeight: '600',
                                color: t.color?.val
                            }}>
                                {translate('navigation.menu')}
                            </RNText>
                            <TouchableOpacity
                                onPress={closeMenu}
                                style={{padding: 8, borderRadius: 20, backgroundColor: t.gray5?.val}}
                            >
                                <X size={24} color={t.color?.val}/>
                            </TouchableOpacity>
                        </View>

                        {/* Navigation Items */}
                        <View style={{marginBottom: 24}}>
                            <TouchableOpacity
                                onPress={() => navigateAndClose('/map')}
                                style={{
                                    padding: 16,
                                    marginBottom: 12,
                                    borderRadius: 8,
                                    backgroundColor: t.gray2?.val,
                                    borderWidth: 1,
                                    borderColor: t.accent8?.val,
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}
                            >
                                <MapIcon color={t.accent8?.val} size={24}/>
                                <RNText style={{
                                    fontSize: 18,
                                    fontWeight: '500',
                                    color: t.accent8?.val,
                                    marginLeft: 12
                                }}>
                                    {translate('navigation.map')}
                                </RNText>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => navigateAndClose('/dashboard/5')}
                                style={{
                                    padding: 16,
                                    marginBottom: 12,
                                    borderRadius: 8,
                                    backgroundColor: t.gray2?.val,
                                    borderWidth: 1,
                                    borderColor: t.accent8?.val,
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}
                            >
                                <LayoutDashboard color={t.accent8?.val} size={24}/>
                                <RNText style={{
                                    fontSize: 18,
                                    fontWeight: '500',
                                    color: t.accent8?.val,
                                    marginLeft: 12
                                }}>
                                    {translate('dashboard.dashboard')}
                                </RNText>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => navigateAndClose('/about')}
                                style={{
                                    padding: 16,
                                    marginBottom: 12,
                                    borderRadius: 8,
                                    backgroundColor: t.gray2?.val,
                                    borderWidth: 1,
                                    borderColor: t.accent8?.val,
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}
                            >
                                <InfoIcon color={t.accent8?.val} size={24}/>
                                <RNText style={{
                                    fontSize: 18,
                                    fontWeight: '500',
                                    color: t.accent8?.val,
                                    marginLeft: 12
                                }}>
                                    {translate('navigation.aboutUs')}
                                </RNText>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => navigateAndClose('/sensors')}
                                style={{
                                    padding: 16,
                                    marginBottom: 12,
                                    borderRadius: 8,
                                    backgroundColor: t.gray2?.val,
                                    borderWidth: 1,
                                    borderColor: t.accent8?.val,
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}
                            >
                                <LOGO size={24} color={t.accent8?.val}/>
                                <RNText style={{
                                    fontSize: 18,
                                    fontWeight: '500',
                                    color: t.accent8?.val,
                                    marginLeft: 12
                                }}>
                                    {translate('navigation.sensors')}
                                </RNText>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => navigateAndClose('/api')}
                                style={{
                                    padding: 16,
                                    marginBottom: 12,
                                    borderRadius: 8,
                                    backgroundColor: t.gray2?.val,
                                    borderWidth: 1,
                                    borderColor: t.accent8?.val,
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}
                            >
                                <CloudIcon color={t.accent8?.val} size={24}/>
                                <RNText style={{
                                    fontSize: 18,
                                    fontWeight: '500',
                                    color: t.accent8?.val,
                                    marginLeft: 12
                                }}>
                                    {translate('navigation.api')}
                                </RNText>
                            </TouchableOpacity>
                        </View>

                        {/* Settings */}
                        <View style={{
                            borderTopWidth: 1,
                            borderTopColor: t.borderColor?.val,
                            paddingTop: 20,
                            marginBottom: 30
                        }}>
                            <RNText style={{
                                fontSize: 18,
                                fontWeight: '600',
                                color: t.color?.val,
                                marginBottom: 16
                            }}>
                                {translate('navigation.settings')}
                            </RNText>

                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                paddingVertical: 8
                            }}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Languages color={t.accent8?.val} size={20}/>
                                    <RNText style={{
                                        fontSize: 16,
                                        color: t.color?.val,
                                        marginLeft: 12
                                    }}>
                                        {translate('navigation.language')}
                                    </RNText>
                                </View>
                                <LanguageSelector/>
                            </View>

                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                paddingVertical: 8
                            }}>
                                <RNText style={{
                                    fontSize: 16,
                                    color: t.color?.val
                                }}>
                                    {translate('navigation.theme')}
                                </RNText>
                                <TouchableOpacity
                                    onPress={toggleTheme}
                                    style={{
                                        padding: 8,
                                        borderRadius: 12,
                                        backgroundColor: t.gray5?.val
                                    }}
                                >
                                    {isDark ? (
                                        <SunFilledIcon size={20} color={t.accent8?.val}/>
                                    ) : (
                                        <MoonFilledIcon size={20} color={t.accent8?.val}/>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Auth Buttons */}
                        <View style={{
                            borderTopWidth: 1,
                            borderTopColor: t.borderColor?.val,
                            paddingTop: 20,
                            paddingBottom: 20
                        }}>
                            {!session ? (
                                <View>
                                    <TouchableOpacity
                                        onPress={() => navigateAndClose('/login')}
                                        style={{
                                            backgroundColor: t.accent8?.val,
                                            padding: 16,
                                            borderRadius: 8,
                                            alignItems: 'center',
                                            marginBottom: 12
                                        }}
                                    >
                                        <RNText style={{
                                            color: 'white',
                                            fontSize: 16,
                                            fontWeight: '600'
                                        }}>
                                            {translate('auth.login')}
                                        </RNText>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => navigateAndClose('/register')}
                                        style={{
                                            borderWidth: 1,
                                            borderColor: t.accent8?.val,
                                            backgroundColor: 'transparent',
                                            padding: 16,
                                            borderRadius: 8,
                                            alignItems: 'center'
                                        }}
                                    >
                                        <RNText style={{
                                            color: t.accent8?.val,
                                            fontSize: 16,
                                            fontWeight: '600'
                                        }}>
                                            {translate('auth.register')}
                                        </RNText>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <TouchableOpacity
                                    onPress={() => navigateAndClose('/(profile)/profile')}
                                    style={{
                                        padding: 16,
                                        borderRadius: 8,
                                        borderWidth: 1,
                                        borderColor: t.accent8?.val,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <User size={20} color={t.accent8?.val}/>
                                    <RNText style={{
                                        color: t.accent8?.val,
                                        fontSize: 16,
                                        marginLeft: 8
                                    }}>
                                        {translate('navigation.profile')}
                                    </RNText>
                                </TouchableOpacity>
                            )}
                        </View>
                    </ScrollView>
                </Sheet.Frame>
            </Sheet>
        </>
    );
}