import { Link } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Card, Input, Text, View, YStack, XStack, H1 } from 'tamagui';
import { Mail, Sparkles } from '@tamagui/lucide-icons';

export default function MagicLinkScreen() {
  const [email, setEmail] = useState("");

  const hasErrors = () => {
    return email.length > 0 && !email.includes('@');
  };

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
                />
                {hasErrors() && (
                  <Text color="$red10" fontSize={14}>Please enter a valid email address</Text>
                )}
              </YStack>

              <Button
                backgroundColor="$accent7"
                color="white"
                size="$4"
                onPress={() => console.log("Send magic link")}
                borderRadius="$6"
                hoverStyle={{ backgroundColor: "$accent8" }}
                pressStyle={{ backgroundColor: "$accent6" }}
                disabled={!email || hasErrors()}
                opacity={!email || hasErrors() ? 0.6 : 1}
              >
                <XStack alignItems="center" gap="$2">
                  <Sparkles size={16} color="white" />
                  <Text color="white" fontWeight="600">Send Magic Link</Text>
                </XStack>
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