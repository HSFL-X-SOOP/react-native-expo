import {Link, useRouter, useLocalSearchParams, Href} from 'expo-router';
import {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {Button, Text, View, YStack, XStack, Spinner} from 'tamagui';
import {Sparkles, CheckCircle, AlertCircle} from '@tamagui/lucide-icons';
import {useAuth} from '@/hooks/useAuth';
import {useSession} from '@/context/SessionContext';
import {AuthCard} from '@/components/auth/AuthCard';
import {EmailInput} from '@/components/auth/EmailInput';
import {useTranslation} from '@/hooks/useTranslation';
import {createLogger} from '@/utils/logger';

const logger = createLogger('Auth:MagicLink');

export default function MagicLinkScreen() {
    const router = useRouter();
    const {token} = useLocalSearchParams<{ token?: string }>();
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);
    const {requestMagicLink, requestMagicLinkStatus, magicLinkLogin, magicLinkLoginStatus} = useAuth();
    const {login: logUserIn} = useSession();
    const {t} = useTranslation();

    const hasErrors = () => {
        return email.length > 0 && !email.includes('@');
    };

    const handleSendMagicLink = async () => {
        logger.info('Requesting magic link', {email});
        const result = await requestMagicLink({email});
        if (result !== undefined) {
            logger.info('Magic link sent successfully');
            setSent(true);
        } else {
            logger.error('Magic link request failed', requestMagicLinkStatus.error);
        }
    };

    useEffect(() => {
        if (token) {
            logger.info('Processing magic link token');
            (async () => {
                const result = await magicLinkLogin({token});
                if (result) {
                    logger.info('Magic link login successful');
                    logUserIn({
                        accessToken: result.accessToken,
                        refreshToken: result.refreshToken,
                        loggedInSince: new Date(),
                        lastTokenRefresh: null,
                        profile: result.profile
                    });
                    router.replace("/map");
                } else {
                    logger.error('Magic link login failed', magicLinkLoginStatus.error);
                }
            })();
        }
    }, [token]);

    if (token && magicLinkLoginStatus.loading) {
        return (
            <SafeAreaView style={{flex: 1}}>
                <YStack flex={1} backgroundColor="$content3" alignItems="center" justifyContent="center" padding="$4">
                    <AuthCard title={t('auth.verifyingMagicLink')} subtitle={t('auth.pleaseWait')} icon={Sparkles}>
                        <YStack gap="$4" alignItems="center">
                            <Spinner size="large" color="$accent7"/>
                        </YStack>
                    </AuthCard>
                </YStack>
            </SafeAreaView>
        );
    }

    if (token && magicLinkLoginStatus.error) {
        return (
            <SafeAreaView style={{flex: 1}}>
                <YStack flex={1} backgroundColor="$content3" alignItems="center" justifyContent="center" padding="$4">
                    <AuthCard title={t('auth.invalidOrExpiredLink')} subtitle={magicLinkLoginStatus.error.message}
                              icon={AlertCircle}>
                        <Link href={"/(auth)/magic-link" as Href}>
                            <Text color="$accent7" textDecorationLine="underline" fontWeight="600">
                                {t('auth.requestNewMagicLink')}
                            </Text>
                        </Link>
                    </AuthCard>
                </YStack>
            </SafeAreaView>
        );
    }

    if (sent) {
        return (
            <SafeAreaView style={{flex: 1}}>
                <YStack flex={1} backgroundColor="$content3" alignItems="center" justifyContent="center" padding="$4">
                    <AuthCard title={t('auth.checkYourEmail')} subtitle={t('auth.magicLinkSent', {email})}
                              icon={CheckCircle}>
                        <Link href={"/(auth)/login" as Href}>
                            <Text color="$accent7" textDecorationLine="underline" fontWeight="600">
                                {t('auth.backToSignIn')}
                            </Text>
                        </Link>
                    </AuthCard>
                </YStack>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <YStack flex={1} backgroundColor="$content3" alignItems="center" justifyContent="center" padding="$4">
                <AuthCard
                    title={t('auth.magicLink')}
                    subtitle={t('auth.magicLinkDescription')}
                    icon={Sparkles}
                >
                    <YStack gap="$4" width="100%">
                        <YStack gap="$2">
                            <EmailInput
                                value={email}
                                onChangeText={setEmail}
                                placeholder={t('auth.emailPlaceholder')}
                                label={t('auth.emailAddress')}
                                onSubmitEditing={handleSendMagicLink}
                                hasError={hasErrors()}
                                errorMessage={t('auth.invalidEmail')}
                            />
                            {requestMagicLinkStatus.error && (
                                <Text color="$red10" fontSize={14}>{requestMagicLinkStatus.error.message}</Text>
                            )}
                        </YStack>

                        <Button
                            backgroundColor="$accent7"
                            color="white"
                            size="$4"
                            onPress={handleSendMagicLink}
                            borderRadius="$6"
                            hoverStyle={{backgroundColor: "$accent8"}}
                            pressStyle={{backgroundColor: "$accent6"}}
                            disabled={!email || hasErrors() || requestMagicLinkStatus.loading}
                            opacity={!email || hasErrors() || requestMagicLinkStatus.loading ? 0.6 : 1}
                        >
                            {requestMagicLinkStatus.loading ? (
                                <XStack alignItems="center" gap="$2">
                                    <Spinner size="small" color="white"/>
                                    <Text color="white" fontWeight="600">{t('auth.sending')}</Text>
                                </XStack>
                            ) : (
                                <XStack alignItems="center" gap="$2">
                                    <Sparkles size={16} color="white"/>
                                    <Text color="white" fontWeight="600">{t('auth.sendMagicLink')}</Text>
                                </XStack>
                            )}
                        </Button>
                    </YStack>

                    <YStack gap="$2" alignItems="center">
                        <Text fontSize={14} color="$color">
                            {t('auth.dontHaveAccount')}{' '}
                            <Link href="/(auth)/register">
                                <Text color="$accent7" textDecorationLine="underline"
                                      fontWeight="600">{t('auth.signUp')}</Text>
                            </Link>
                        </Text>
                        <Text fontSize={14} color="$color">
                            {t('auth.alreadyHaveAccount')}{' '}
                            <Link href="/(auth)/login">
                                <Text color="$accent7" textDecorationLine="underline"
                                      fontWeight="600">{t('auth.signIn')}</Text>
                            </Link>
                        </Text>
                    </YStack>
                </AuthCard>
            </YStack>
        </SafeAreaView>
    );
}
