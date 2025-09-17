import { useState } from "react";
import { Dimensions, Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Checkbox, Icon, MD3Colors, Portal, Surface, Text } from "react-native-paper";

const { width: screenWidth } = Dimensions.get('window');

export default function MapFilterButton() {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const openDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);  

  const [module1Checked, setModule1Checked] = useState(true);
  const [module2Checked, setModule2Checked] = useState(false);
  const [module3Checked, setModule3Checked] = useState(false);
  const [temperatureOverlaychecked, setTemperatureOverlayChecked] = useState(false);
  const [windDirectionchecked, setWindDirectionChecked] = useState(false);
  return (
      <View>
        <TouchableOpacity style={styles.button} onPress={openDrawer}>
          <Icon source='filter' color={MD3Colors.error50} size={28} />
        </TouchableOpacity>

      <Portal>
        {drawerVisible && (
          <>
            <Pressable style={styles.backdrop} onPress={closeDrawer} />

            <Surface style={styles.drawer}>
              <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <Button onPress={closeDrawer}>
                  <Icon source='chevron-double-right' color={MD3Colors.error50} size={28} />
                </Button>
                <Text style={styles.drawerTitle}>Filtereinstellungen</Text>
              </View>
              <View>
                <View style={styles.checkboxAndText}>
                  <Checkbox.Item 
                    label="Module 1: Water Level Temperature"
                    status={module1Checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setModule1Checked(!module1Checked);
                    }}
                    position="leading"
                    />
                </View>
                <View style={styles.checkboxAndText}>
                  <Checkbox.Item
                    label="Module 2: Air Properties"
                    status={module2Checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setModule2Checked(!module2Checked);
                    }}
                    position="leading"
                    />
                </View>
                <View style={styles.checkboxAndText}>
                  <Checkbox.Item
                    label="Module 3: Air Quality"
                    status={module3Checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setModule3Checked(!module3Checked);
                    }}
                    position="leading"
                    />
                </View>
                <View style={styles.checkboxAndText}>
                  <Checkbox.Item
                    label="Temperatur-Overlay"
                    status={temperatureOverlaychecked ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setTemperatureOverlayChecked(!temperatureOverlaychecked);
                    }}
                    position="leading"
                    />
                </View>
                <View style={styles.checkboxAndText}>
                  <Checkbox.Item
                    label="Windrichtung Overlay"
                    status={windDirectionchecked ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setWindDirectionChecked(!windDirectionchecked);
                    }}
                    position="leading"
                    />
                </View>
              </View>
              
            </Surface>
          </>
        )}
      </Portal>
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