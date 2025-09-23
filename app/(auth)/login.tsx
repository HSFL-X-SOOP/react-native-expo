import { useSession } from '@/context/SessionContext';
import { useAuth } from '@/hooks/useAuth';
import { Link, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, Checkbox, Input, Text, View, YStack, XStack, Separator } from 'tamagui';
import { Eye } from '@tamagui/lucide-icons';
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
          //TODO: ADD ERROR BANNER
          console.error("Login failed:", loginStatus.error);
      }
  };

  return (
    <View style={styles.container}>
      <Card elevate size="$4" bordered padding="$4" width={350}>
        {!session && (
        <YStack space="$4" alignItems="center">
          <YStack space="$2" alignItems="center" marginTop="$4">
            <Text fontSize="$8" fontWeight="bold">Sign in</Text>
            <Text color="$gray10" textAlign="center">Welcome back! Please enter your credentials.</Text>
          </YStack>

          <YStack space="$4" width="100%">
            <Input
              placeholder="you@example.com"
              value={email}
              onChangeText={text => setEmail(text)}
              size="$4"
              />
            <Input
              placeholder="Password"
              value={password}
              onChangeText={password => setPassword(password)}
              secureTextEntry={!showPassword}
              size="$4"
              />

            <XStack justifyContent="space-between" alignItems="center" width="100%">
              <XStack space="$2" alignItems="center">
                <Checkbox
                  checked={rememberMe}
                  onCheckedChange={setRememberMe}
                  size="$4"
                />
                <Text>Remember me</Text>
              </XStack>
              <Link href="/(auth)/register"><Text color="$green10">Forgot password?</Text></Link>
            </XStack>

            <Button backgroundColor="$green10" color="white" size="$4" onPress={handleSubmit}>
              Sign in
            </Button>
          </YStack>

          <XStack space="$2" alignItems="center" width="100%">
            <Separator flex={1} />
            <Text>or</Text>
            <Separator flex={1} />
          </XStack>

          <YStack space="$3" width="100%">
            <Button variant="outlined" size="$4" onPress={() => {console.log("H")}}>
              Sign in with Google
            </Button>

            <Button variant="outlined" size="$4" onPress={() => {router.push("/magic-link");}}>
              Sign in with Email Magic Link
            </Button>
          </YStack>

          <YStack alignItems="center">
            <Text>Don't have an account? <Link href="/(auth)/register"><Text color="$green10">Sign up</Text></Link></Text>
          </YStack>
        </YStack>
        )}
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