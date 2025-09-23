import { useState } from "react";
import { Dimensions, Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Text, XStack, YStack, Sheet, Checkbox } from 'tamagui';
import { Filter, ChevronRight } from '@tamagui/lucide-icons';

const { width: screenWidth } = Dimensions.get('window');

export default function MapFilterButton() {
  const [sheetOpen, setSheetOpen] = useState(false);

  const openDrawer = () => setSheetOpen(true);
  const closeDrawer = () => setSheetOpen(false);  

  const [module1Checked, setModule1Checked] = useState(true);
  const [module2Checked, setModule2Checked] = useState(false);
  const [module3Checked, setModule3Checked] = useState(false);
  const [temperatureOverlaychecked, setTemperatureOverlayChecked] = useState(false);
  const [windDirectionchecked, setWindDirectionChecked] = useState(false);
  return (
      <View>
        <TouchableOpacity style={styles.button} onPress={openDrawer}>
          <Filter color={'$orange10'} size={28} />
        </TouchableOpacity>

      <Sheet
        modal
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        snapPoints={[90]}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay />
        <Sheet.Handle />
        <Sheet.Frame padding="$4" backgroundColor="white">
          <XStack alignItems="center" marginBottom="$4">
            <Button onPress={closeDrawer} size="$3" chromeless>
              <ChevronRight color={'$orange10'} size={28} />
            </Button>
            <Text fontSize="$6" fontWeight="bold">Filtereinstellungen</Text>
          </XStack>

          <YStack space="$3">
            <XStack alignItems="center" space="$3">
              <Checkbox
                checked={module1Checked}
                onCheckedChange={() => setModule1Checked(!module1Checked)}
              />
              <Text>Module 1: Water Level Temperature</Text>
            </XStack>

            <XStack alignItems="center" space="$3">
              <Checkbox
                checked={module2Checked}
                onCheckedChange={() => setModule2Checked(!module2Checked)}
              />
              <Text>Module 2: Air Properties</Text>
            </XStack>

            <XStack alignItems="center" space="$3">
              <Checkbox
                checked={module3Checked}
                onCheckedChange={() => setModule3Checked(!module3Checked)}
              />
              <Text>Module 3: Air Quality</Text>
            </XStack>

            <XStack alignItems="center" space="$3">
              <Checkbox
                checked={temperatureOverlaychecked}
                onCheckedChange={() => setTemperatureOverlayChecked(!temperatureOverlaychecked)}
              />
              <Text>Temperatur-Overlay</Text>
            </XStack>

            <XStack alignItems="center" space="$3">
              <Checkbox
                checked={windDirectionchecked}
                onCheckedChange={() => setWindDirectionChecked(!windDirectionchecked)}
              />
              <Text>Windrichtung Overlay</Text>
            </XStack>
          </YStack>
        </Sheet.Frame>
      </Sheet>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#2c3538ff',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 100,
    zIndex: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 400,
    height: '100%',
    backgroundColor: 'white',
    elevation: 4,
    padding: 16,
    zIndex: 20,
  },
  drawerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  checkboxAndText: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
});