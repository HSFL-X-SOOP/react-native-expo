import MapWrapper from '@/components/Map';
import MapFilterButton from "@/components/map/MapFilterButton.tsx";
import {View} from "tamagui";
import {useState} from "react";
import {useThemeContext} from '@/context/ThemeSwitch';

export default function MapScreen() {
  const {isDark} = useThemeContext();

  const [temperatureVisible, setTemperatureVisible] = useState(false);
  const [windDirectionVisible, setWindDirectionVisible] = useState(false);
  const [module1Visible, setModule1Visible] = useState(true);
  const [module2Visible, setModule2Visible] = useState(true);
  const [module3Visible, setModule3Visible] = useState(false);

  return (
      <View pos={"relative"} flex={1} backgroundColor={isDark ? "#1a1a1a" : "#f5f5f5"}>
        <MapWrapper
            module1Visible={module1Visible}
            module2Visible={module2Visible}
            module3Visible={module3Visible}
            temperatureVisible={temperatureVisible}
            windDirectionVisible={windDirectionVisible}
        />

        <MapFilterButton
            module1Visible={module1Visible}
            setModule1Visible={setModule1Visible}
            module2Visible={module2Visible}
            setModule2Visible={setModule2Visible}
            module3Visible={module3Visible}
            setModule3Visible={setModule3Visible}
            temperatureVisible={temperatureVisible}
            setTemperatureVisible={setTemperatureVisible}
            windDirectionVisible={windDirectionVisible}
            setWindDirectionVisible={setWindDirectionVisible}
        />
      </View>
  );
}
