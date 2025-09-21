import { useState } from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { styles } from '../_layout';
export default function ProfileSettingsApiScreen() {
  const [apiKey, setApiKey] = useState("");  
  return (

    <View style={styles.container}>
      <Text>Hier kannst du deinen persönlichen API-Token verwalten:</Text>
      <TextInput
        label="API-Token"
        value={apiKey}
        mode='outlined'
        style={{width: '95%'}}
        placeholder='1234-5678-ABCD-EFGH'
        onChangeText={text => setApiKey(text)}
        />
      <Button mode="outlined" onPress={() => console.log("")}>
        Speichern
      </Button>
    </View>
    
  );
}