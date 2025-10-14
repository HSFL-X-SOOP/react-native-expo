import {useTranslation} from "@/hooks/useTranslation";
import {ChevronDown} from "@tamagui/lucide-icons";
import {useMemo} from "react";
import {Adapt, Select, Sheet, YStack} from "tamagui";

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

    const timeRangeOptions: { value: ChartTimeRange; label: string }[] = useMemo(() => [
        {value: "today", label: t('dashboard.timeRange.todayButton')},
        {value: "yesterday", label: t('dashboard.timeRange.yesterdayButton')},
        {value: "last7days", label: t('dashboard.timeRange.last7daysButton')},
        {value: "last30days", label: t('dashboard.timeRange.last30daysButton')},
        {value: "last90days", label: t('dashboard.timeRange.last90daysButton')},
        {value: "last180days", label: t('dashboard.timeRange.last180daysButton')},
        {value: "last1year", label: t('dashboard.timeRange.last1yearButton')},
    ], [t]);

    return (
        <Select
            value={selectedTimeRange}
            onValueChange={(value) => setTimeRange(value as ChartTimeRange)}
        >
            <Select.Trigger
                width={180}
                iconAfter={ChevronDown}
                backgroundColor={isDark ? '$gray8' : '$gray2'}
                borderColor={isDark ? '$gray7' : '$gray4'}
            >
                <Select.Value placeholder={t('dashboard.timeRange.selectRange')}/>
            </Select.Trigger>

            <Adapt when="sm" platform="touch">
                <Sheet
                    native
                    modal
                    dismissOnSnapToBottom
                    animationConfig={{
                        type: 'spring',
                        damping: 20,
                        mass: 1.2,
                        stiffness: 250,
                    }}
                >
                    <Sheet.Frame>
                        <Sheet.ScrollView>
                            <Adapt.Contents/>
                        </Sheet.ScrollView>
                    </Sheet.Frame>
                    <Sheet.Overlay
                        animation="lazy"
                        enterStyle={{opacity: 0}}
                        exitStyle={{opacity: 0}}
                    />
                </Sheet>
            </Adapt>

            <Select.Content zIndex={200000}>
                <Select.ScrollUpButton/>
                <Select.Viewport minWidth={200}>
                    <YStack>
                        {timeRangeOptions.map((option, index) => (
                            <Select.Item
                                key={option.value}
                                index={index}
                                value={option.value}
                            >
                                <Select.ItemText>{option.label}</Select.ItemText>
                                <Select.ItemIndicator marginLeft="auto"/>
                            </Select.Item>
                        ))}
                    </YStack>
                </Select.Viewport>
                <Select.ScrollDownButton/>
            </Select.Content>
        </Select>
    );
}
