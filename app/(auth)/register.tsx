import { useSession } from '@/context/SessionContext';
import { useAuth } from '@/hooks/useAuth';
import { Link, useRouter } from 'expo-router';
import { useEffect, useState, useMemo } from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Card, Checkbox, Input, Text, View, YStack, XStack, Separator, H1, Spinner } from 'tamagui';
import { User, Mail, Lock, Eye, EyeOff, Check, X } from '@tamagui/lucide-icons';

const EMAIL_REGEX = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#\-])[A-Za-z\d@$!%*?&#\-]{8,64}$/;

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

  const passwordValidation = useMemo(() => {
    const hasValidLength = password.length >= 8 && password.length <= 64;
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecial = /[@$!%*?&#\-]/.test(password);
    const hasOnlyValidChars = /^[A-Za-z\d@$!%*?&#\-]*$/.test(password);

    return {
      length: hasValidLength,
      lowercase: hasLowercase,
      uppercase: hasUppercase,
      digit: hasDigit,
      special: hasSpecial,
      validChars: hasOnlyValidChars,
    };
  }, [password]);

  const passwordStrength = useMemo(() => {
    if (password.length === 0) return { count: 0, total: 5, percentage: 0 };

    const validationValues = [
      passwordValidation.length,
      passwordValidation.lowercase,
      passwordValidation.uppercase,
      passwordValidation.digit,
      passwordValidation.special,
    ];
    const validCount = validationValues.filter(Boolean).length;

    const lengthScore = Math.min((password.length / 12) * 40, 40);
    const criteriaScore = (validCount / validationValues.length) * 60;
    const percentage = Math.min(lengthScore + criteriaScore, 100);

    return {
      count: validCount,
      total: validationValues.length,
      percentage,
    };
  }, [password, passwordValidation]);

  const isPasswordValid = useMemo(() => {
    return passwordValidation.length &&
           passwordValidation.lowercase &&
           passwordValidation.uppercase &&
           passwordValidation.digit &&
           passwordValidation.special &&
           passwordValidation.validChars;
  }, [passwordValidation]);

  const isEmailValid = useMemo(() => {
    return EMAIL_REGEX.test(email);
  }, [email]);

  const handleSubmit = async () => {
      if (password !== confirmPassword) return;
      if (!agreeTermsOfService) return;
      if (!isPasswordValid) return;
      if (!isEmailValid) return;

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

  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;
  const isFormValid = isEmailValid && isPasswordValid && passwordsMatch && agreeTermsOfService;

  // Debug
  console.log('DEBUG:', {
    email,
    password,
    confirmPassword,
    isEmailValid,
    isPasswordValid,
    passwordsMatch,
    agreeTermsOfService,
    isFormValid,
    passwordValidation
  });

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
                  borderColor={email && !isEmailValid ? "$red10" : "$borderColor"}
                  focusStyle={{ borderColor: email && !isEmailValid ? "$red10" : "$accent7" }}
                  onSubmitEditing={handleSubmit}
                />
                {email && !isEmailValid && (
                  <Text color="$red10" fontSize={12}>{t('auth.invalidEmail')}</Text>
                )}
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
                    onSubmitEditing={handleSubmit}
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
                {password && (
                  <YStack gap="$3" paddingTop="$2">
                    <YStack gap="$2">
                      <Text fontSize={12} fontWeight="600" color="$color">
                        {t('auth.passwordStrength')}
                      </Text>
                      <View
                        width="100%"
                        height={8}
                        backgroundColor="$gray5"
                        borderRadius="$4"
                        overflow="hidden"
                      >
                        <View
                          width={`${passwordStrength.percentage}%`}
                          height="100%"
                          style={{
                            backgroundColor:
                              passwordStrength.percentage === 100
                                ? '#22c55e'
                                : passwordStrength.percentage >= 60
                                ? '#eab308'
                                : '#ef4444'
                          }}
                        />
                      </View>
                    </YStack>
                    <YStack gap="$2" paddingLeft="$2">
                    <XStack gap="$2" alignItems="center">
                      {passwordValidation.length ? (
                        <View width={14} height={14} alignItems="center" justifyContent="center">
                          <Check size={14} style={{ color: '#22c55e' }} />
                        </View>
                      ) : (
                        <View width={14} height={14} alignItems="center" justifyContent="center">
                          <X size={14} style={{ color: '#ef4444' }} />
                        </View>
                      )}
                      <Text fontSize={12} style={{ color: passwordValidation.length ? '#22c55e' : '#ef4444' }}>
                        {t('auth.passwordLength')}
                      </Text>
                    </XStack>
                    <XStack gap="$2" alignItems="center">
                      {passwordValidation.lowercase ? (
                        <View width={14} height={14} alignItems="center" justifyContent="center">
                          <Check size={14} style={{ color: '#22c55e' }} />
                        </View>
                      ) : (
                        <View width={14} height={14} alignItems="center" justifyContent="center">
                          <X size={14} style={{ color: '#ef4444' }} />
                        </View>
                      )}
                      <Text fontSize={12} style={{ color: passwordValidation.lowercase ? '#22c55e' : '#ef4444' }}>
                        {t('auth.passwordLowercase')}
                      </Text>
                    </XStack>
                    <XStack gap="$2" alignItems="center">
                      {passwordValidation.uppercase ? (
                        <View width={14} height={14} alignItems="center" justifyContent="center">
                          <Check size={14} style={{ color: '#22c55e' }} />
                        </View>
                      ) : (
                        <View width={14} height={14} alignItems="center" justifyContent="center">
                          <X size={14} style={{ color: '#ef4444' }} />
                        </View>
                      )}
                      <Text fontSize={12} style={{ color: passwordValidation.uppercase ? '#22c55e' : '#ef4444' }}>
                        {t('auth.passwordUppercase')}
                      </Text>
                    </XStack>
                    <XStack gap="$2" alignItems="center">
                      {passwordValidation.digit ? (
                        <View width={14} height={14} alignItems="center" justifyContent="center">
                          <Check size={14} style={{ color: '#22c55e' }} />
                        </View>
                      ) : (
                        <View width={14} height={14} alignItems="center" justifyContent="center">
                          <X size={14} style={{ color: '#ef4444' }} />
                        </View>
                      )}
                      <Text fontSize={12} style={{ color: passwordValidation.digit ? '#22c55e' : '#ef4444' }}>
                        {t('auth.passwordDigit')}
                      </Text>
                    </XStack>
                    <XStack gap="$2" alignItems="center">
                      {passwordValidation.special ? (
                        <View width={14} height={14} alignItems="center" justifyContent="center">
                          <Check size={14} style={{ color: '#22c55e' }} />
                        </View>
                      ) : (
                        <View width={14} height={14} alignItems="center" justifyContent="center">
                          <X size={14} style={{ color: '#ef4444' }} />
                        </View>
                      )}
                      <Text fontSize={12} style={{ color: passwordValidation.special ? '#22c55e' : '#ef4444' }}>
                        {t('auth.passwordSpecial')}
                      </Text>
                    </XStack>
                    </YStack>
                  </YStack>
                )}
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
                    onSubmitEditing={handleSubmit}
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