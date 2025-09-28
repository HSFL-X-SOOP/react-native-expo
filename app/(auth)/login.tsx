import {useSession} from '@/context/SessionContext';
import {useAuth} from '@/hooks/useAuth';
import {Link, useRouter} from 'expo-router';
import {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {Eye, EyeOff, Lock, Mail} from '@tamagui/lucide-icons';
import {Button, Card, Checkbox, Input, Text, View, YStack, XStack, Separator, Spinner, H1} from 'tamagui';
import {useTranslation} from '@/hooks/useTranslation';

export default function LoginScreen() {
    const router = useRouter();
    const {t} = useTranslation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const {login, loginStatus} = useAuth();
    const {login: logUserIn, session} = useSession()

    useEffect(() => {
        if (session) {
            router.push("/");
        }
    }, [session, router]);

    const handleSubmit = async () => {
        const res = await login({email, password, rememberMe});
        if (res) {
            logUserIn({
                accessToken: res.accessToken,
                refreshToken: res.refreshToken,
                loggedInSince: new Date(),
                lastTokenRefresh: null
            });
            router.push("/map");
        } else {
            console.error("Login failed:", loginStatus.error);
        }
    };

    const handleGoogleLogin = () => {
        // Web OAuth redirect
        if (typeof window !== 'undefined') {
            window.location.assign("/api/login/google");
        }
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <YStack flex={1} backgroundColor="$content3" alignItems="center" justifyContent="center" padding="$4">
                <Card elevate size="$4" bordered padding="$6" width={400} maxWidth="90%" backgroundColor="$content1"
                      borderRadius="$8" borderColor="$borderColor">
                    <YStack gap="$5" alignItems="center">

                        <YStack gap="$3" alignItems="center">
                            <View
                                width={80}
                                height={80}
                                backgroundColor="$accent2"
                                borderRadius="$12"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Lock size={40} color="$accent7"/>
                            </View>
                            <H1 fontSize={28} fontWeight="bold" color="$accent7" fontFamily="$oswald">{t('auth.signIn')}</H1>
                            <Text color="$color" textAlign="center" fontSize={16} opacity={0.8} maxWidth={300}>
                                {t('auth.welcomeBack')}
                            </Text>
                        </YStack>

                        <YStack gap="$4" width="100%">
                            <YStack gap="$2">
                                <XStack alignItems="center" gap="$2">
                                    <Mail size={16} color="$accent7"/>
                                    <Text fontSize={14} fontWeight="500" color="$accent7">{t('auth.email')}</Text>
                                </XStack>
                                <Input
                                    placeholder={t('auth.emailPlaceholder')}
                                    value={email}
                                    onChangeText={setEmail}
                                    size="$4"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoComplete="email"
                                    borderColor="$borderColor"
                                    focusStyle={{borderColor: "$accent7"}}
                                />
                            </YStack>

                            <YStack gap="$2">
                                <XStack alignItems="center" gap="$2">
                                    <Lock size={16} color="$accent7"/>
                                    <Text fontSize={14} fontWeight="500" color="$accent7">{t('auth.password')}</Text>
                                </XStack>
                                <XStack alignItems="center" width="100%" position="relative">
                                    <Input
                                        placeholder={t('auth.passwordPlaceholder')}
                                        value={password}
                                        onChangeText={setPassword}
                                        secureTextEntry={!showPassword}
                                        size="$4"
                                        flex={1}
                                        autoComplete="current-password"
                                        borderColor="$borderColor"
                                        focusStyle={{borderColor: "$accent7"}}
                                    />
                                    <Button
                                        position="absolute"
                                        right="$2"
                                        size="$3"
                                        circular
                                        chromeless
                                        onPress={() => setShowPassword(!showPassword)}
                                        zIndex={1}
                                    >
                                        {showPassword ? <EyeOff size={16} color="$accent7"/> :
                                            <Eye size={16} color="$accent7"/>}
                                    </Button>
                                </XStack>
                            </YStack>

                            {loginStatus.error && (
                                <Text color="$red10" fontSize="$3" textAlign="center">
                                    {loginStatus.error.message}
                                </Text>
                            )}

                            <XStack justifyContent="space-between" alignItems="center" width="100%">
                                <XStack gap="$2" alignItems="center">
                                    <Checkbox
                                        checked={rememberMe}
                                        onCheckedChange={(checked) => setRememberMe(checked === true)}
                                        size="$3"
                                    />
                                    <Text fontSize={14} color="$color">{t('auth.rememberMe')}</Text>
                                </XStack>
                                <Link href="/">
                                    <Text color="$accent7" fontSize={14} textDecorationLine="underline">
                                        {t('auth.forgotPassword')}
                                    </Text>
                                </Link>
                            </XStack>

                            <Button
                                backgroundColor="$accent7"
                                color="white"
                                size="$4"
                                onPress={handleSubmit}
                                disabled={loginStatus.loading}
                                opacity={loginStatus.loading ? 0.6 : 1}
                                borderRadius="$6"
                                hoverStyle={{backgroundColor: "$accent8"}}
                                pressStyle={{backgroundColor: "$accent6"}}
                            >
                                {loginStatus.loading ? (
                                    <XStack gap="$2" alignItems="center">
                                        <Spinner size="small" color="white"/>
                                        <Text color="white" fontWeight="600">{t('auth.signingIn')}</Text>
                                    </XStack>
                                ) : (
                                    <Text color="white" fontWeight="600">{t('auth.signIn')}</Text>
                                )}
                            </Button>
                        </YStack>

                        <XStack gap="$3" alignItems="center" width="100%">
                            <Separator flex={1} borderColor="$borderColor"/>
                            <Text color="$color" fontSize={14} opacity={0.7}>{t('auth.or')}</Text>
                            <Separator flex={1} borderColor="$borderColor"/>
                        </XStack>

                        <YStack gap="$3" width="100%">
                            <Button
                                variant="outlined"
                                size="$4"
                                onPress={handleGoogleLogin}
                                borderColor="$borderColor"
                                borderRadius="$6"
                                hoverStyle={{backgroundColor: "$content2"}}
                            >
                                <XStack gap="$2" alignItems="center">
                                    <Text>🔍</Text>
                                    <Text color="$color">{t('auth.signInWithGoogle')}</Text>
                                </XStack>
                            </Button>

                            <Button
                                variant="outlined"
                                size="$4"
                                onPress={() => router.push("/(auth)/magic-link")}
                                borderColor="$borderColor"
                                borderRadius="$6"
                                hoverStyle={{backgroundColor: "$content2"}}
                            >
                                <XStack gap="$2" alignItems="center">
                                    <Text>✨</Text>
                                    <Text color="$color">{t('auth.signInWithMagicLink')}</Text>
                                </XStack>
                            </Button>
                        </YStack>

                        <YStack alignItems="center">
                            <Text fontSize={14} color="$color">
                                {t('auth.dontHaveAccount')}{' '}
                                <Link href="/(auth)/register">
                                    <Text color="$accent7" textDecorationLine="underline" fontWeight="600">
                                        {t('auth.signUp')}
                                    </Text>
                                </Link>
                            </Text>
                        </YStack>

                    </YStack>
                </Card>
            </YStack>
        </SafeAreaView>
    );
}