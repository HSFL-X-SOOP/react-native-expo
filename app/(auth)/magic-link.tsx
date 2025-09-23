import { Link } from 'expo-router';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, Input, Text, View, YStack } from 'tamagui';
import { styles } from './_layout';

export default function MagicLinkScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const hasErrors = () => {
    return !email.includes('@');
  };

  return (
    <View style={styles.container}>
      <Card elevate size="$4" bordered padding="$4" width={350}>
        <YStack space="$4" alignItems="center">
          <YStack space="$2" alignItems="center" marginTop="$2">
            <Text fontSize="$8" fontWeight="bold">Magic Link</Text>
            <Text color="$gray10" textAlign="center">Enter your email and we'll send you a sign-in link.</Text>
          </YStack>

          <YStack space="$4" width="100%">
            <YStack space="$2" width="100%">
              <Input
                placeholder="you@example.com"
                value={email}
                onChangeText={text => setEmail(text)}
                size="$4"
                />
              {hasErrors() && (
                <Text color="$red10" fontSize="$2">Email address is invalid!</Text>
              )}
            </YStack>

            <Button backgroundColor="$green10" color="white" size="$4" onPress={() => {console.log("H")}}>
              Send Link
            </Button>

            <YStack space="$2" alignItems="center">
              <Text>Don't have an account? <Link href="/(auth)/register"><Text color="$green10">Sign up</Text></Link></Text>
              <Text>Already have an account? <Link href="/(auth)/login"><Text color="$green10">Sign in</Text></Link></Text>
            </YStack>
          </YStack>
        </YStack>
      </Card>
    </View>
  );
}

export const style = StyleSheet.create({
  container: {
    height: 400,
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