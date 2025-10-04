import { Link, useRouter, useLocalSearchParams, Href } from 'expo-router';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Card, Input, Text, View, YStack, XStack, H1, Spinner } from 'tamagui';
import { Mail, Sparkles, CheckCircle, AlertCircle } from '@tamagui/lucide-icons';
import { useAuth } from '@/hooks/useAuth';
import { useSession } from '@/context/SessionContext';
import { useTranslation } from '@/hooks/useTranslation';

export default function MagicLinkScreen() {
  const router = useRouter();
  const { token } = useLocalSearchParams<{ token?: string }>();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const { requestMagicLink, requestMagicLinkStatus, magicLinkLogin, magicLinkLoginStatus } = useAuth();
  const { login: logUserIn } = useSession();
  const { t } = useTranslation();

  const hasErrors = () => {
    return email.length > 0 && !email.includes('@');
  };

  const handleSendMagicLink = async () => {
    const result = await requestMagicLink({ email });
    if (result !== undefined) {
      setSent(true);
    }
  };

  useEffect(() => {
    if (token) {
      (async () => {
        const result = await magicLinkLogin({ token });
        if (result) {
          logUserIn({
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
            loggedInSince: new Date(),
            lastTokenRefresh: null,
            profile: result.profile
          });
          router.replace("/map");
        }
      })();
    }
  }, [token]);

  if (token && magicLinkLoginStatus.loading) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <YStack flex={1} backgroundColor="$content3" alignItems="center" justifyContent="center" padding="$4">
          <Card elevate size="$4" bordered padding="$6" width={400} maxWidth="90%" backgroundColor="$content1" borderRadius="$8" borderColor="$borderColor">
            <YStack gap="$5" alignItems="center">
              <Spinner size="large" color="$accent7" />
              <H1 fontSize={28} fontWeight="bold" color="$accent7" fontFamily="$oswald">{t('auth.magicLink.verifying')}</H1>
              <Text color="$color" textAlign="center" fontSize={16} opacity={0.8} maxWidth={300}>
                {t('auth.magicLink.verifyingMessage')}
              </Text>
            </YStack>
          </Card>
        </YStack>
      </SafeAreaView>
    );
  }

  if (token && magicLinkLoginStatus.error) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <YStack flex={1} backgroundColor="$content3" alignItems="center" justifyContent="center" padding="$4">
          <Card elevate size="$4" bordered padding="$6" width={400} maxWidth="90%" backgroundColor="$content1" borderRadius="$8" borderColor="$borderColor">
            <YStack gap="$5" alignItems="center">
              <View
                width={80}
                height={80}
                backgroundColor="$red2"
                borderRadius="$12"
                alignItems="center"
                justifyContent="center"
              >
                <AlertCircle size={40} color="$red10" />
              </View>
              <H1 fontSize={28} fontWeight="bold" color="$accent7" fontFamily="$oswald">{t('auth.magicLink.invalidOrExpired')}</H1>
              <Text color="$color" textAlign="center" fontSize={16} opacity={0.8} maxWidth={300}>
                {magicLinkLoginStatus.error.message}
              </Text>
              <Link href={"/(auth)/magic-link" as Href}>
                <Text color="$accent7" textDecorationLine="underline" fontWeight="600">{t('auth.magicLink.requestNewLink')}</Text>
              </Link>
            </YStack>
          </Card>
        </YStack>
      </SafeAreaView>
    );
  }

  if (sent) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <YStack flex={1} backgroundColor="$content3" alignItems="center" justifyContent="center" padding="$4">
          <Card elevate size="$4" bordered padding="$6" width={400} maxWidth="90%" backgroundColor="$content1" borderRadius="$8" borderColor="$borderColor">
            <YStack gap="$5" alignItems="center">
              <View
                width={80}
                height={80}
                backgroundColor="$green2"
                borderRadius="$12"
                alignItems="center"
                justifyContent="center"
              >
                <CheckCircle size={40} color="$green10" />
              </View>
              <H1 fontSize={28} fontWeight="bold" color="$accent7" fontFamily="$oswald">{t('auth.magicLink.checkYourEmail')}</H1>
              <Text color="$color" textAlign="center" fontSize={16} opacity={0.8} maxWidth={300}>
                {t('auth.magicLink.emailSent').replace('{email}', email)}
              </Text>
              <Link href={"/(auth)/login" as Href}>
                <Text color="$accent7" textDecorationLine="underline" fontWeight="600">{t('auth.magicLink.backToSignIn')}</Text>
              </Link>
            </YStack>
          </Card>
        </YStack>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <YStack flex={1} backgroundColor="$content3" alignItems="center" justifyContent="center" padding="$4">
        <Card elevate size="$4" bordered padding="$6" width={400} maxWidth="90%" backgroundColor="$content1" borderRadius="$8" borderColor="$borderColor">
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
                <Sparkles size={40} color="$accent7" />
              </View>
              <H1 fontSize={28} fontWeight="bold" color="$accent7" fontFamily="$oswald">{t('auth.magicLink.title')}</H1>
              <Text color="$color" textAlign="center" fontSize={16} opacity={0.8} maxWidth={300}>
                {t('auth.magicLink.description')}
              </Text>
            </YStack>

            <YStack gap="$4" width="100%">
              <YStack gap="$2">
                <XStack alignItems="center" gap="$2">
                  <Mail size={16} color="$accent7" />
                  <Text fontSize={14} fontWeight="500" color="$accent7">{t('auth.magicLink.emailAddress')}</Text>
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
                  focusStyle={{ borderColor: "$accent7" }}
                  onSubmitEditing={handleSendMagicLink}
                />
                {hasErrors() && (
                  <Text color="$red10" fontSize={14}>{t('auth.magicLink.validEmail')}</Text>
                )}
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
                hoverStyle={{ backgroundColor: "$accent8" }}
                pressStyle={{ backgroundColor: "$accent6" }}
                disabled={!email || hasErrors() || requestMagicLinkStatus.loading}
                opacity={!email || hasErrors() || requestMagicLinkStatus.loading ? 0.6 : 1}
              >
                {requestMagicLinkStatus.loading ? (
                  <XStack alignItems="center" gap="$2">
                    <Spinner size="small" color="white" />
                    <Text color="white" fontWeight="600">{t('auth.magicLink.sending')}</Text>
                  </XStack>
                ) : (
                  <XStack alignItems="center" gap="$2">
                    <Sparkles size={16} color="white" />
                    <Text color="white" fontWeight="600">{t('auth.magicLink.sendMagicLink')}</Text>
                  </XStack>
                )}
              </Button>
            </YStack>

            <YStack gap="$2" alignItems="center">
              <Text fontSize={14} color="$color">
                {t('auth.dontHaveAccount')}{' '}
                <Link href={"/(auth)/register" as Href}>
                  <Text color="$accent7" textDecorationLine="underline" fontWeight="600">{t('auth.signUp')}</Text>
                </Link>
              </Text>
              <Text fontSize={14} color="$color">
                {t('auth.alreadyHaveAccount')}{' '}
                <Link href={"/(auth)/login" as Href}>
                  <Text color="$accent7" textDecorationLine="underline" fontWeight="600">{t('auth.signIn')}</Text>
                </Link>
              </Text>
            </YStack>

          </YStack>
        </Card>
      </YStack>
    </SafeAreaView>
  );
}
