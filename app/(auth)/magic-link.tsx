import { Link, useRouter, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Card, Input, Text, View, YStack, XStack, H1, Spinner } from 'tamagui';
import { Mail, Sparkles, CheckCircle, AlertCircle } from '@tamagui/lucide-icons';
import { useAuth } from '@/hooks/useAuth';
import { useSession } from '@/context/SessionContext';

export default function MagicLinkScreen() {
  const router = useRouter();
  const { token } = useLocalSearchParams<{ token?: string }>();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const { requestMagicLink, requestMagicLinkStatus, magicLinkLogin, magicLinkLoginStatus } = useAuth();
  const { login: logUserIn } = useSession();

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
    if (token && typeof token === 'string') {
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
              <H1 fontSize={28} fontWeight="bold" color="$accent7" fontFamily="$oswald">Verifying Magic Link</H1>
              <Text color="$color" textAlign="center" fontSize={16} opacity={0.8} maxWidth={300}>
                Please wait while we sign you in...
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
              <H1 fontSize={28} fontWeight="bold" color="$accent7" fontFamily="$oswald">Invalid or Expired Link</H1>
              <Text color="$color" textAlign="center" fontSize={16} opacity={0.8} maxWidth={300}>
                {magicLinkLoginStatus.error.message}
              </Text>
              <Link href="/(auth)/magic-link">
                <Text color="$accent7" textDecorationLine="underline" fontWeight="600">Request a new magic link</Text>
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
              <H1 fontSize={28} fontWeight="bold" color="$accent7" fontFamily="$oswald">Check Your Email</H1>
              <Text color="$color" textAlign="center" fontSize={16} opacity={0.8} maxWidth={300}>
                We&apos;ve sent a magic link to <Text fontWeight="600">{email}</Text>. Click the link in the email to sign in.
              </Text>
              <Link href="/(auth)/login">
                <Text color="$accent7" textDecorationLine="underline" fontWeight="600">Back to sign in</Text>
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
              <H1 fontSize={28} fontWeight="bold" color="$accent7" fontFamily="$oswald">Magic Link</H1>
              <Text color="$color" textAlign="center" fontSize={16} opacity={0.8} maxWidth={300}>
                Enter your email and we&apos;ll send you a secure sign-in link.
              </Text>
            </YStack>

            <YStack gap="$4" width="100%">
              <YStack gap="$2">
                <XStack alignItems="center" gap="$2">
                  <Mail size={16} color="$accent7" />
                  <Text fontSize={14} fontWeight="500" color="$accent7">Email Address</Text>
                </XStack>
                <Input
                  placeholder="you@example.com"
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
                  <Text color="$red10" fontSize={14}>Please enter a valid email address</Text>
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
                    <Text color="white" fontWeight="600">Sending...</Text>
                  </XStack>
                ) : (
                  <XStack alignItems="center" gap="$2">
                    <Sparkles size={16} color="white" />
                    <Text color="white" fontWeight="600">Send Magic Link</Text>
                  </XStack>
                )}
              </Button>
            </YStack>

            <YStack gap="$2" alignItems="center">
              <Text fontSize={14} color="$color">
                Don&#39;t have an account?{' '}
                <Link href="/(auth)/register">
                  <Text color="$accent7" textDecorationLine="underline" fontWeight="600">Sign up</Text>
                </Link>
              </Text>
              <Text fontSize={14} color="$color">
                Already have an account?{' '}
                <Link href="/(auth)/login">
                  <Text color="$accent7" textDecorationLine="underline" fontWeight="600">Sign in</Text>
                </Link>
              </Text>
            </YStack>

          </YStack>
        </Card>
      </YStack>
    </SafeAreaView>
  );
}
