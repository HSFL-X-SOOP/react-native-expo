import { Link } from "expo-router";
import { SafeAreaView, View } from "react-native";
import { Button, Text } from "react-native-paper";
export default function AboutTabScreen() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 50}}>
        <Button mode="contained-tonal">
          <Link href="/(about)/about"><Text>Über uns</Text></Link>
        </Button>
        <Button mode="contained-tonal">
          <Link href="/(about)/sensors"><Text>Sensoren</Text></Link>
        </Button>
        <Button mode="contained-tonal">
          <Link href="/(about)/api"><Text>API</Text></Link>
        </Button>
      </View>
    </SafeAreaView>
  );
}