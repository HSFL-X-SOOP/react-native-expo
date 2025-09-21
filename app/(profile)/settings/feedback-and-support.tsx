import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import { Button, Text, TextInput } from 'react-native-paper';
import { styles } from '../_layout';
export default function ProfileSettingsFeedbackAndSupportScreen() {
  const [message, setMessage] = useState("");  
  return (

    <ThemedView style={styles.container}>
      <Text>Gib uns Feedback oder stelle eine Support-Anfrage:</Text>
      <TextInput
        label="Nachricht"
        value={message}
        mode='outlined'
        style={{width: '95%'}}
        placeholder='Dein Feedback oder deine Frage...'
        onChangeText={text => setMessage(text)}
        />
      <Button mode="outlined" onPress={() => console.log("")}>
        Absenden
      </Button>
    </ThemedView>
    
  );
}