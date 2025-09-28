import { useSession } from '@/context/SessionContext';
import { useAuth } from '@/hooks/useAuth';
import { Link, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, Checkbox, Input, Text, View, YStack, XStack, Separator } from 'tamagui';
import { styles } from './_layout';

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTermsOfService, setAgreeTermsOfService] = useState(false);

  const router = useRouter();
  const {register, registerStatus} = useAuth();
  const {login, session} = useSession();

  useEffect(() => {
      if (session) {
          router.push("/");
      }
  }, [session, router]);

  const handleSubmit = async () => {
      if (password !== confirmPassword) return;
      if (!agreeTermsOfService) return;

      const res = await register({email, password, rememberMe: false});
      if (res) {
          login({
              accessToken: res.accessToken,
              refreshToken: res.refreshToken,
              loggedInSince: new Date(),
              lastTokenRefresh: null
          });
          router.push("/");
      } else {
          // TODO: ADD ERROR BANNER
          console.error("Registration failed:", registerStatus.error);
      }
  };

  return (
    <View style={styles.container}>
      <Card elevate size="$4" bordered padding="$4" width={350}>
        <YStack space="$4" alignItems="center">
          <YStack space="$2" alignItems="center" marginTop="$4">
            <Text fontSize="$8" fontWeight="bold">Create account</Text>
            <Text color="$gray10" textAlign="center">Join us by filling out the information below.</Text>
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
            <Input
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={password => setConfirmPassword(password)}
              secureTextEntry={!showConfirmPassword}
              size="$4"
              />

            <XStack space="$2" alignItems="center" width="100%">
              <Checkbox
                checked={agreeTermsOfService}
                onCheckedChange={(checked) => setAgreeTermsOfService(checked === true)}
                size="$4"
              />
              <Text>I agree to the </Text>
              <Link href="/(other)/terms-of-service"><Text color="$green10">Terms of Service</Text></Link>
            </XStack>

            <Button backgroundColor="$green10" color="white" size="$4" onPress={handleSubmit}>
              Sign up
            </Button>
          </YStack>

          <XStack space="$2" alignItems="center" width="100%">
            <Separator flex={1} />
            <Text>or</Text>
            <Separator flex={1} />
          </XStack>

          <YStack space="$3" width="100%">
            <Button variant="outlined" size="$4" onPress={() => {console.log("H")}}>
              Sign up with Google
            </Button>
          </YStack>

          <YStack alignItems="center">
            <Text>Already have an account? <Link href="/(auth)/login"><Text color="$green10">Sign in</Text></Link></Text>
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