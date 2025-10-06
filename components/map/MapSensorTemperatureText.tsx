import {LocationWithBoxes, BoxType} from "@/api/models/sensor";
import {SensorMarkerSvg} from "./SensorMarkerSvg";
import {useThemeContext} from "@/context/ThemeSwitch.tsx";

type SensorMarkerContentProps = {
    locationWithBoxes: LocationWithBoxes
}

export const SensorMarkerContent: React.FC<SensorMarkerContentProps> = ({locationWithBoxes}) => {
    const {isDark} = useThemeContext();

    const waterBox = locationWithBoxes.boxes.find(box => box.type === BoxType.WaterBox || box.type === BoxType.WaterTemperatureOnlyBox);
    const tempValue = waterBox?.measurementTimes.find(measurement => measurement.measurements.waterTemperature)?.measurements.waterTemperature;
    const temperature = tempValue !== undefined ? Math.round(Number(tempValue)) : "N/A";

    const accentColor = isDark ? '#0794d9' : '#7db07d';
    const backgroundColor = isDark ? '#1a1a1a' : '#1c1c1c';
    const textColor = 'white';

    const getIndicatorColor = (boxType?: string): string => {
        switch (boxType) {
            case BoxType.WaterBox:
                return '#1565C0';
            case BoxType.WaterTemperatureOnlyBox:
                return '#5E35B1';
            case BoxType.AirBox:
                return '#F57C00';
            default:
                return '#1565C0';
        }
    };

    return (
        <SensorMarkerSvg
            temperature={temperature}
            accentColor={accentColor}
            backgroundColor={backgroundColor}
            textColor={textColor}
            indicatorColor={getIndicatorColor(waterBox?.type)}
        />
    );
}
