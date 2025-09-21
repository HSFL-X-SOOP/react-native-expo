import { useSession } from '@/context/SessionContext';
import { useAuth } from '@/hooks/useAuth';
import { Link, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Checkbox, Divider, Icon, MD3Colors, Text, TextInput } from 'react-native-paper';
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
      <Card>
        <Card.Content>
          <View style={style.container}>
          <View style={{marginTop: 20, alignItems: 'center'}}>
            <Text style={{marginBottom: 10, fontSize: 28}}>Create account</Text>
            <Text style={styles.textLg}>Join us by filling out the information below.</Text>
          </View>

          <View style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20}}>
            <TextInput
              label="Email*"
              value={email}
              mode='outlined'
              style={{width: '95%'}}
              placeholder='you@example.com'
              onChangeText={text => setEmail(text)}
              />
            <TextInput
              label="Password*"
              value={password}
              mode='outlined'
              placeholder='********'
              style={{width: '95%'}}
              onChangeText={password => setPassword(password)}
              secureTextEntry={!showPassword}
              right={<TextInput.Icon icon="eye" color={'green'} onPress={() => setShowPassword(!showPassword)}/>}
              />
            <TextInput
              label="Confirm Password*"
              value={confirmPassword}
              mode='outlined'
              placeholder='********'
              style={{width: '95%'}}
              onChangeText={password => setConfirmPassword(password)}
              secureTextEntry={!showConfirmPassword}
              right={<TextInput.Icon icon="eye" color={'green'} onPress={() => setShowConfirmPassword(!showConfirmPassword)}/>}
              />

            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%'}}>
              <Checkbox.Item 
                label="I agree to the"
                status={agreeTermsOfService ? 'checked' : 'unchecked'}
                onPress={() => {
                  setAgreeTermsOfService(!agreeTermsOfService);
                }}
                position="leading"
              />
              <Link href="/(other)/terms-of-service"><Text style={{color: 'green'}}>Terms of Service</Text></Link>
            </View>
            <Button mode="contained"  buttonColor='green' style={style.buttons} onPress={handleSubmit}>
              <Text style={{color: 'black'}}>Sign up</Text>
              </Button>
          </View>

          <View style={{display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center', gap: 10}}>
            <Divider style={{width: '45%'}}/>
            <Text>or</Text>
            <Divider style={{width: '45%'}}/>
          </View>

          <View style={{display: 'flex', flexDirection: 'column', gap: 20, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <Button mode="outlined" style={style.buttons} onPress={() => {console.log("H")}}>
              <Icon source="google" color={MD3Colors.error50} size={20} />
              <Text style={{width: '95%'}}> Sign up with Google</Text>
            </Button>
          </View>

          <View>
            <Text>Already have an account? <Link href="/(auth)/login" style={{color: 'green'}}>Sign in</Link></Text>
          </View>
          </View>
        </Card.Content>
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