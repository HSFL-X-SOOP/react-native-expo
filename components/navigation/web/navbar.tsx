import { useState } from 'react';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';

export function NavbarWeb() {
    const [current, setCurrent] = useState('Home');
  return (
    <View>
      <Appbar.Header>
        <Appbar.Action icon="home" onPress={() => setCurrent('Home')} />
        <Appbar.Action icon="cog" onPress={() => setCurrent('Settings')} />
      </Appbar.Header>
    </View>
  );
}