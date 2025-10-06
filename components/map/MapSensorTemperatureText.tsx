import {LocationWithBoxes, SensorModule} from "@/api/models/sensor";
import {SensorMarkerSvg} from "./SensorMarkerSvg";
import {useTheme} from 'tamagui';
import {useThemeContext} from "@/context/ThemeSwitch.tsx";

type MapSensorTemperatureTextProps = {
    sensorModule: SensorModule
}

export const MapSensorTemperatureText: React.FC<MapSensorTemperatureTextProps> = ({sensorModule}) => {
    const theme = useTheme();
    const tempValue = sensorModule.latestMeasurements.find(measurement => measurement.measurementType.name === "Temperature, water" || measurement.measurementType.name === "WTemp")?.value;
    const temperature = tempValue !== undefined ? Math.round(Number(tempValue)) : "N/A";

    const isDark = theme.background?.val === '#000000' || theme.background?.val?.includes('1a1a1a');
    const accentColor = isDark ? '#053246' : '#7db07d';
    const backgroundColor = isDark ? '#edf5f2' : '#000000';
    const textColor = isDark ? 'black' : 'white';

    return (
        <SensorMarkerSvg
            temperature={temperature}
            accentColor={accentColor}
            backgroundColor={backgroundColor}
            textColor={textColor}
        />
    );
}

type MapSensorTemperatureTextNewProps = {
    locationWithBoxes: LocationWithBoxes
}

export const MapSensorTemperatureNew: React.FC<MapSensorTemperatureTextNewProps> = ({locationWithBoxes}) => {
    const {isDark} = useThemeContext();
    const tempValue = locationWithBoxes.boxes.find(box => box.type === "WaterBox" || box.type === "WaterTemperatureOnlyBox")?.measurementTimes.find(measurement => measurement.measurements.waterTemperature)?.measurements.waterTemperature;
    const temperature = tempValue !== undefined ? Math.round(Number(tempValue)) : "N/A";

    const accentColor = isDark ? '#0794d9' : '#7db07d';
    const backgroundColor = isDark ? '#edf5f2' : '#1c1c1c';
    const textColor = isDark ? 'black' : 'white';

    return (
        <SensorMarkerSvg
            temperature={temperature}
            accentColor={accentColor}
            backgroundColor={backgroundColor}
            textColor={textColor}
        />
    );
}