import { useSession } from '@/context/SessionContext';
import { useAuth } from '@/hooks/useAuth';
import { Link, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Card, Checkbox, Input, Text, View, YStack, XStack, Separator, H1, Spinner } from 'tamagui';
import { User, Mail, Lock, Eye, EyeOff } from '@tamagui/lucide-icons';

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
              lastTokenRefresh: null,
              profile: res.profile
          });
          router.push("/");
      } else {
          console.error("Registration failed:", registerStatus.error);
      }
  };

  const passwordsMatch = password === confirmPassword;
  const isFormValid = email && password && passwordsMatch && agreeTermsOfService;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <YStack flex={1} backgroundColor="$content3" alignItems="center" justifyContent="center" padding="$4">
        <Card elevate size="$4" bordered padding="$6" width={450} maxWidth="90%" backgroundColor="$content1" borderRadius="$8" borderColor="$borderColor">
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
                <User size={40} color="$accent7" />
              </View>
              <H1 fontSize={28} fontWeight="bold" color="$accent7" fontFamily="$oswald">Create Account</H1>
              <Text color="$color" textAlign="center" fontSize={16} opacity={0.8} maxWidth={350}>
                Join us by filling out the information below.
              </Text>
            </YStack>

            <YStack gap="$4" width="100%">
                <YStack gap="$2">
                <XStack alignItems="center" gap="$2">
                  <Mail size={16} color="$accent7" />
                  <Text fontSize={14} fontWeight="500" color="$accent7">Email</Text>
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
              </YStack>

              <YStack gap="$2">
                <XStack alignItems="center" gap="$2">
                  <Lock size={16} color="$accent7" />
                  <Text fontSize={14} fontWeight="500" color="$accent7">Password</Text>
                </XStack>
                <XStack alignItems="center" width="100%" position="relative">
                  <Input
                    placeholder="••••••••"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    size="$4"
                    flex={1}
                    autoComplete="new-password"
                    borderColor="$borderColor"
                    focusStyle={{ borderColor: "$accent7" }}
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
                    {showPassword ? <EyeOff size={16} color="$accent7" /> : <Eye size={16} color="$accent7" />}
                  </Button>
                </XStack>
              </YStack>

              <YStack gap="$2">
                <XStack alignItems="center" gap="$2">
                  <Lock size={16} color="$accent7" />
                  <Text fontSize={14} fontWeight="500" color="$accent7">Confirm Password</Text>
                </XStack>
                <XStack alignItems="center" width="100%" position="relative">
                  <Input
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                    size="$4"
                    flex={1}
                    autoComplete="new-password"
                    borderColor={confirmPassword && !passwordsMatch ? "$red10" : "$borderColor"}
                    focusStyle={{ borderColor: confirmPassword && !passwordsMatch ? "$red10" : "$accent7" }}
                  />
                  <Button
                    position="absolute"
                    right="$2"
                    size="$3"
                    circular
                    chromeless
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    zIndex={1}
                  >
                    {showConfirmPassword ? <EyeOff size={16} color="$accent7" /> : <Eye size={16} color="$accent7" />}
                  </Button>
                </XStack>
                {confirmPassword && !passwordsMatch && (
                  <Text color="$red10" fontSize={14}>Passwords do not match</Text>
                )}
              </YStack>

              {registerStatus.error && (
                <Text color="$red10" fontSize={14} textAlign="center">
                  {registerStatus.error.message}
                </Text>
              )}

              <XStack gap="$2" alignItems="center" width="100%" pressStyle={{ opacity: 0.7 }} onPress={() => setAgreeTermsOfService(!agreeTermsOfService)}>
                <Checkbox
                  id="agree-terms"
                  checked={agreeTermsOfService}
                  onCheckedChange={(checked) => setAgreeTermsOfService(checked === true)}
                  size="$4"
                  borderWidth={2}
                  borderColor={agreeTermsOfService ? "$accent7" : "$borderColor"}
                  backgroundColor={agreeTermsOfService ? "$accent7" : "transparent"}
                >
                  <Checkbox.Indicator>
                    <View width="100%" height="100%" alignItems="center" justifyContent="center">
                      <Text color="white" fontWeight="bold">✓</Text>
                    </View>
                  </Checkbox.Indicator>
                </Checkbox>
                <Text fontSize={14} color="$color">
                  I agree to the{' '}
                  <Link href="/(other)/terms-of-service">
                    <Text color="$accent7" textDecorationLine="underline">Terms of Service</Text>
                  </Link>
                </Text>
              </XStack>

              <Button
                backgroundColor="$accent7"
                color="white"
                size="$4"
                onPress={handleSubmit}
                disabled={!isFormValid || registerStatus.loading}
                opacity={!isFormValid || registerStatus.loading ? 0.6 : 1}
                borderRadius="$6"
                hoverStyle={{ backgroundColor: "$accent8" }}
                pressStyle={{ backgroundColor: "$accent6" }}
              >
                {registerStatus.loading ? (
                  <XStack gap="$2" alignItems="center">
                    <Spinner size="small" color="white" />
                    <Text color="white" fontWeight="600">Creating account...</Text>
                  </XStack>
                ) : (
                  <Text color="white" fontWeight="600">Create Account</Text>
                )}
              </Button>
            </YStack>

            <XStack gap="$3" alignItems="center" width="100%">
              <Separator flex={1} borderColor="$borderColor" />
              <Text color="$color" fontSize={14} opacity={0.7}>or</Text>
              <Separator flex={1} borderColor="$borderColor" />
            </XStack>

            <Button
              variant="outlined"
              size="$4"
              onPress={() => console.log("Google signup")}
              borderColor="$borderColor"
              borderRadius="$6"
              hoverStyle={{ backgroundColor: "$content2" }}
              width="100%"
            >
              <XStack gap="$2" alignItems="center">
                <Text>🔍</Text>
                <Text color="$color">Sign up with Google</Text>
              </XStack>
            </Button>

            <Text fontSize={14} color="$color">
              Already have an account?{' '}
              <Link href="/(auth)/login">
                <Text color="$accent7" textDecorationLine="underline" fontWeight="600">Sign in</Text>
              </Link>
            </Text>

          </YStack>
        </Card>
      </YStack>
    </SafeAreaView>
  );
}