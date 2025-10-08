import useTranslation from "@/hooks/useTranslation";
import { Button } from "tamagui";

export type ChartTimeRange = "today" | "yesterday" | "last7days" | "last30days";

interface TimeRangeButtonProps  {
    timeRange: ChartTimeRange;
    selectedTimeRange: ChartTimeRange;
    buttonText: string;
    setTimeRange: (range: ChartTimeRange) => void;
    isDark?: boolean;
}

export function TimeRangeButton(props: TimeRangeButtonProps) {
    const {timeRange, setTimeRange, isDark, selectedTimeRange, buttonText} = props;
    const {t} = useTranslation();

    return (
        <Button
            size="$2"
            variant="outlined"
            color={selectedTimeRange === timeRange ? '$blue10' : '$gray10'}
            backgroundColor={selectedTimeRange === timeRange ? (isDark ? '$gray9' : '$background') : 'transparent'}
            onPress={() => setTimeRange(timeRange)}
            borderRadius="$2"
        >
            {t(buttonText)}
        </Button>
    );
}