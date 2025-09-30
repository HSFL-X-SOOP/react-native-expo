import {useEffect, useRef} from 'react';
import {useRouter, useLocalSearchParams} from 'expo-router';
import {useSession} from '@/context/SessionContext';
import {SafeAreaView, Platform} from 'react-native';
import {YStack, Text, Spinner} from 'tamagui';

export default function OAuthCallbackHandler() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const {login, session} = useSession();
    const hasProcessed = useRef(false);

    useEffect(() => {
        if (session) {
            router.push("/");
        }
    }, [session, router]);

    useEffect(() => {
        if (hasProcessed.current) return;

        const handleCallback = () => {
            let accessToken: string | null = null;
            let refreshToken: string | null = null;

            if (Platform.OS === 'web' && typeof window !== 'undefined') {
                const hash = window.location.hash;

                const hashParams = new URLSearchParams(hash.substring(1));
                accessToken = hashParams.get('access_token');
                refreshToken = hashParams.get('refresh_token');
            }

            if (!accessToken) {
                accessToken = params.access_token as string;
                refreshToken = params.refresh_token as string;
            }

            if (accessToken) {
                hasProcessed.current = true;

                login({
                    accessToken: accessToken,
                    refreshToken: refreshToken || null,
                    loggedInSince: new Date(),
                    lastTokenRefresh: null
                });

                if (Platform.OS === 'web' && typeof window !== 'undefined') {
                    window.history.replaceState({}, document.title, '/map');
                }
            } else {
                console.error('No tokens found in callback URL');
                router.replace('/(auth)/login');
            }
        };

        handleCallback();
    }, [params, login, router]);

    return (
        <SafeAreaView style={{flex: 1}}>
            <YStack flex={1} backgroundColor="$content3" alignItems="center" justifyContent="center" gap="$4">
                <Spinner size="large" color="$accent7" />
                <Text fontSize={18} color="$color" opacity={0.8}>
                    Signing you in…
                </Text>
            </YStack>
        </SafeAreaView>
    );
}