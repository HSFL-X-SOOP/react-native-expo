import {useTranslation} from "@/hooks/useTranslation";
import {ChevronDown} from "@tamagui/lucide-icons";
import {useMemo} from "react";
import {SelectWithSheet} from "@/components/ui/SelectWithSheet";
import type {SelectItem} from "@/types/select";

export type ChartTimeRange =
    "today"
    | "yesterday"
    | "last7days"
    | "last30days"
    | "last90days"
    | "last180days"
    | "last1year";

interface TimeRangeDropdownProps {
    selectedTimeRange: ChartTimeRange;
    setTimeRange: (range: ChartTimeRange) => void;
    isDark?: boolean;
}

export function TimeRangeDropdown(props: TimeRangeDropdownProps) {
    const {selectedTimeRange, setTimeRange, isDark} = props;
    const {t} = useTranslation();

    const timeRangeOptions: SelectItem<ChartTimeRange>[] = useMemo(() => [
        {value: "today", label: t('dashboard.timeRange.todayButton')},
        {value: "yesterday", label: t('dashboard.timeRange.yesterdayButton')},
        {value: "last7days", label: t('dashboard.timeRange.last7daysButton')},
        {value: "last30days", label: t('dashboard.timeRange.last30daysButton')},
        {value: "last90days", label: t('dashboard.timeRange.last90daysButton')},
        {value: "last180days", label: t('dashboard.timeRange.last180daysButton')},
        {value: "last1year", label: t('dashboard.timeRange.last1yearButton')},
    ], [t]);

    return (
        <SelectWithSheet
            id="time-range-select"
            name="timeRange"
            items={timeRangeOptions}
            value={selectedTimeRange}
            onValueChange={setTimeRange}
            placeholder={t('dashboard.timeRange.selectRange')}
            triggerProps={{
                width: 180,
                iconAfter: ChevronDown,
                backgroundColor: isDark ? '$gray8' : '$gray2',
                borderColor: isDark ? '$gray7' : '$gray4',
            }}
        />
    );
}
