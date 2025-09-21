import { useSession } from '@/context/SessionContext';
import { useAuth } from '@/hooks/useAuth';
import { Link, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Checkbox, Divider, Icon, MD3Colors, Text, TextInput } from 'react-native-paper';
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
      <Card>
        <Card.Content>
          {!session && (
          <View style={style.container}>
          <View style={{marginTop: 20, alignItems: 'center'}}>
            <Text style={{marginBottom: 10, fontSize: 28}}>Sign in</Text>
            <Text style={styles.textLg}>Welcome back! Please enter your credentials.</Text>
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

            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', paddingRight: 30, justifyContent: 'space-between'}}>
              <Checkbox.Item 
                label="Remember me"
                status={rememberMe ? 'checked' : 'unchecked'}
                onPress={() => {
                  setRememberMe(!rememberMe);
                }}
                position="leading"
              />
              <Link href="/(auth)/register"><Text style={{color: 'green'}}>Forgot password?</Text></Link>
            </View>
            <Button mode="contained" buttonColor={'green'} style={style.buttons} onPress={handleSubmit}>
              <Text style={{color: 'black'}}>Sign in</Text>
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
              <Text style={{width: '95%'}}> Sign in with Google</Text>
            </Button>

            <Button mode="outlined" style={style.buttons} onPress={() => {router.push("/magic-link");}}>
              <Icon source="creation" color={MD3Colors.error50} size={20} />
              <Text> Sign in with Email Magic Link</Text>
            </Button>
          </View>

          <View>
            <Text>Don't have an account? <Link href="/(auth)/register" style={{color: 'green'}}>Sign up</Link></Text>
          </View>
          </View>
          )}

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