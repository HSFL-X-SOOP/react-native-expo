import { useSession } from '@/context/SessionContext';
import { useAuth } from '@/hooks/useAuth';
import { Link, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, Checkbox, Input, Text, View, YStack, XStack, Separator, Spinner } from 'tamagui';
import { styles } from './_layout';

export default function LoginScreen() {
  const router = useRouter();
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
      const res = await login({ email, password, rememberMe });
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
    <View style={styles.container}>
      <Card elevate size="$4" bordered padding="$6" width={350} maxWidth="90%">
        <YStack space="$4" alignItems="center">

          {/* Header */}
          <YStack space="$2" alignItems="center">
            <Text fontSize="$8" fontWeight="bold">Sign in</Text>
            <Text color="$gray10" textAlign="center" fontSize="$3">
              Welcome back! Please enter your credentials.
            </Text>
          </YStack>

          {/* Form */}
          <YStack space="$4" width="100%">
            <Input
              placeholder="you@example.com"
              value={email}
              onChangeText={setEmail}
              size="$4"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />

            <XStack alignItems="center" width="100%" position="relative">
              <Input
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                size="$4"
                flex={1}
                autoComplete="current-password"
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
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </Button>
            </XStack>

            {/* Error Display */}
            {loginStatus.error && (
              <Text color="$red10" fontSize="$3" textAlign="center">
                {loginStatus.error.message}
              </Text>
            )}

            {/* Remember Me & Forgot Password */}
            <XStack justifyContent="space-between" alignItems="center" width="100%">
              <XStack space="$2" alignItems="center">
                <Checkbox
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                  size="$3"
                />
                <Text fontSize="$3">Remember me</Text>
              </XStack>
              <Link href="/(auth)/forgot-password">
                <Text color="$blue10" fontSize="$3" textDecorationLine="underline">
                  Forgot password?
                </Text>
              </Link>
            </XStack>

            {/* Sign In Button */}
            <Button
              backgroundColor="$blue10"
              color="white"
              size="$4"
              onPress={handleSubmit}
              disabled={loginStatus.loading}
              opacity={loginStatus.loading ? 0.6 : 1}
            >
              {loginStatus.loading ? (
                <XStack space="$2" alignItems="center">
                  <Spinner size="small" color="white" />
                  <Text color="white">Signing in...</Text>
                </XStack>
              ) : (
                <Text color="white">Sign in</Text>
              )}
            </Button>
          </YStack>

          {/* Divider */}
          <XStack space="$3" alignItems="center" width="100%">
            <Separator flex={1} />
            <Text color="$gray10" fontSize="$3">or</Text>
            <Separator flex={1} />
          </XStack>

          {/* OAuth Buttons */}
          <YStack space="$3" width="100%">
            <Button
              variant="outlined"
              size="$4"
              onPress={handleGoogleLogin}
              borderColor="$borderColor"
            >
              <XStack space="$2" alignItems="center">
                <Text>🔍</Text>
                <Text>Sign in with Google</Text>
              </XStack>
            </Button>

            <Button
              variant="outlined"
              size="$4"
              onPress={() => router.push("/(auth)/magic-link")}
              borderColor="$borderColor"
            >
              <XStack space="$2" alignItems="center">
                <Text>✨</Text>
                <Text>Sign in with Email Magic Link</Text>
              </XStack>
            </Button>
          </YStack>

          {/* Sign Up Link */}
          <YStack alignItems="center">
            <Text fontSize="$3">
              Don't have an account?{' '}
              <Link href="/(auth)/register">
                <Text color="$blue10" textDecorationLine="underline">
                  Sign up
                </Text>
              </Link>
            </Text>
          </YStack>

        </YStack>
      </Card>
    </View>
  );
}

export const style = StyleSheet.create({
  container: {
    height: 600,
    width: 350,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttons: {
    width: '100%',
    alignItems: 'center'
  }
});