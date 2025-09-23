import { Link } from "expo-router";
import { SafeAreaView, View } from "react-native";
import { Button, Text, YStack } from 'tamagui';
export default function AboutTabScreen() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <YStack flex={1} justifyContent="center" space="$5" paddingHorizontal="$4">
        <Button size="$5" theme="blue">
          <Link href="/(about)/about"><Text>Über uns</Text></Link>
        </Button>
        <Button size="$5" theme="blue">
          <Link href="/(about)/sensors"><Text>Sensoren</Text></Link>
        </Button>
        <Button size="$5" theme="blue">
          <Link href="/(about)/api"><Text>API</Text></Link>
        </Button>
      </YStack>
    </SafeAreaView>
  );
}