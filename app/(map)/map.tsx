import MapWrapper from '@/components/Map';
import MapFilterButton from "@/components/map/MapFilterButton.tsx";
import {View} from "tamagui";
import {useState} from "react";
import {useThemeContext} from '@/context/ThemeSwitch';

export default function MapScreen() {
  const {isDark} = useThemeContext();

  const [module1Visible, setModule1Visible] = useState(true);
  const [module2Visible, setModule2Visible] = useState(true);
  const [module3Visible, setModule3Visible] = useState(false);

  return (
      <View pos={"relative"} flex={1}>
        <MapWrapper
            module1Visible={module1Visible}
            module2Visible={module2Visible}
            module3Visible={module3Visible}
            isDark={isDark}
            // temperatureVisible={temperatureVisible}
            // windDirectionVisible={windDirectionVisible}
        />

        <MapFilterButton
            module1Visible={module1Visible}
            setModule1Visible={setModule1Visible}
            module2Visible={module2Visible}
            setModule2Visible={setModule2Visible}
            module3Visible={module3Visible}
            setModule3Visible={setModule3Visible}
            // temperatureVisible={temperatureVisible}
            // setTemperatureVisible={setTemperatureVisible}
            // windDirectionVisible={windDirectionVisible}
            // setWindDirectionVisible={setWindDirectionVisible}
        />
      </View>
  );
}
