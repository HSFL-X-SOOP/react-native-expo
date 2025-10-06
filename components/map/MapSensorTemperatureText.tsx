import {LocationWithBoxes} from "@/api/models/sensor";
import {SensorMarkerSvg} from "./SensorMarkerSvg";
import {useThemeContext} from "@/context/ThemeSwitch.tsx";

type SensorMarkerContentProps = {
    locationWithBoxes: LocationWithBoxes
}

export const SensorMarkerContent: React.FC<SensorMarkerContentProps> = ({locationWithBoxes}) => {
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
