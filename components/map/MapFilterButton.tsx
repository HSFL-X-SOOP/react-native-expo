import { useState } from "react";
import { Dimensions, Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Icon, MD3Colors, Portal, Surface, Text } from "react-native-paper";

const { width: screenWidth } = Dimensions.get('window');

export default function MapFilterButton() {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const openDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);  
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
              <Text style={styles.drawerTitle}>Filter</Text>
              <Button onPress={closeDrawer}>Close</Button>
            </Surface>
          </>
        )}
      </Portal>
      </View>
    );
}

const drawerWidth = 300;

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
    width: drawerWidth,
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
});