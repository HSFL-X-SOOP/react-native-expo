import {LocationWithBoxes, BoxType} from "@/api/models/sensor";
import {SensorMarkerSvg} from "../markers/SensorMarkerSvg";
import {useThemeContext} from "@/context/ThemeSwitch.tsx";

type SensorMarkerContentProps = {
    locationWithBoxes: LocationWithBoxes
    isHovered?: boolean
}

export const SensorMarkerContent: React.FC<SensorMarkerContentProps> = ({locationWithBoxes, isHovered = false}) => {
    const {isDark} = useThemeContext();
    const box = locationWithBoxes.boxes.find(box =>
        box.type === BoxType.WaterBox ||
        box.type === BoxType.WaterTemperatureOnlyBox ||
        box.type === BoxType.AirBox
    );

    let tempValue: number | undefined;
    if (box?.type === BoxType.AirBox) {
        tempValue = box.measurementTimes.find(measurement => measurement.measurements.airTemperature)?.measurements.airTemperature;
    } else {
        tempValue = box?.measurementTimes.find(measurement => measurement.measurements.waterTemperature)?.measurements.waterTemperature;
    }

    const temperature = tempValue !== undefined ? Math.round(Number(tempValue)) : "--";

    const accentColor = !isDark ? '#006e99' : '#7db07d';
    const backgroundColor = isDark ? '#1a1a1a' : '#1c1c1c';
    const textColor = 'white';

    const getIndicatorColor = (boxType?: string): string => {
        switch (boxType) {
            case BoxType.WaterBox:
                return '#0052ff';
            case BoxType.WaterTemperatureOnlyBox:
                return '#d900ff';
            case BoxType.AirBox:
                return '#ff9a00';
            default:
                return '#90CAF9';
        }
    };

    return (
        <SensorMarkerSvg
            temperature={temperature}
            accentColor={accentColor}
            backgroundColor={backgroundColor}
            textColor={textColor}
            indicatorColor={getIndicatorColor(box?.type)}
            enableAnimations={isHovered}
        />
    );
}
