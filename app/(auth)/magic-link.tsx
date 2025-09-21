import { Link } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, HelperText, Text, TextInput } from 'react-native-paper';
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
      <Card>
        <Card.Content>
          <View style={style.container}>
            <View style={{marginTop: 10, alignItems: 'center'}}>
                <Text style={{marginBottom: 10, fontSize: 28}}>Magic Link</Text>
                <Text style={styles.textLg}>Enter your email and we'll send you a sign-in link.</Text>
            </View>

            <View style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20}}>
                <View style={{width: '100%'}}>
                    <TextInput
                        label="Email*"
                        value={email}
                        mode='outlined'
                        style={{width: '95%'}}
                        placeholder='you@example.com'
                        onChangeText={text => setEmail(text)}
                        />
                    <HelperText type="error" visible={hasErrors()}>
                        Email address is invalid!
                    </HelperText>
                </View>
                <Button mode="contained" buttonColor={'green'} style={style.buttons} onPress={() => {console.log("H")}}>
                <Text style={{color: 'black'}}>Send Link</Text>
                </Button>
                <View style={{gap: 10}}>
                <Text>Don't have an account? <Link href="/(auth)/register" style={{color: 'green'}}>Sign up</Link></Text>
                <Text>Already have an account? <Link href="/(auth)/login" style={{color: 'green'}}>Sign in</Link></Text>
                </View>
            </View>


          </View>
        </Card.Content>
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