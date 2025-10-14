import {useThemeContext} from "@/context/ThemeSwitch";
import useTranslation from "@/hooks/useTranslation";
import {Activity} from "@tamagui/lucide-icons";
import {useMemo} from "react";
import {View, Alert, Vibration} from "react-native";
import {LineChart} from "react-native-chart-kit";
import {Card, H3, Text, useMedia, XStack, YStack} from "tamagui";

export type LineChartCardProps = {
    title: string,
    icon?: React.ReactNode,
    chartData: { label: string, value: number, fullDateTime?: string }[],
    color?: string,
    currentValue?: number,
}
export const LineChartCard: React.FC<LineChartCardProps> = ({
                                                                title,
                                                                icon,
                                                                chartData,
                                                                color = "#4dabf7",
                                                                currentValue
                                                            }) => {
    const {isDark} = useThemeContext();
    const {t} = useTranslation();
    const media = useMedia();

    const formatValue = (value: number): string => {
        return value < 1 ? value.toFixed(2) : value.toFixed(1);
    };

    const {data, displayLabels, filteredChartData} = useMemo(() => {
        if (chartData.length === 0) {
            return {data: [], displayLabels: [], filteredChartData: []};
        }

        const dataValues = chartData.map(item => item.value);
        const labelValues = chartData.map(item => item.label);
        const showEvery = Math.ceil(labelValues.length / 6);
        const displayLabelValues = labelValues.filter((_, index) => index % showEvery === 0);

        return {
            data: dataValues,
            displayLabels: displayLabelValues,
            filteredChartData: chartData
        };
    }, [chartData]);

    const chartWidth = media.md ? 360 : 460;
    const chartHeight = media.md ? 200 : 260;

    const unit = useMemo(() => {
        if (title === t('dashboard.charts.waterTemperature')) return t('dashboard.units.celsius');
        if (title === t('dashboard.charts.waveHeight')) return t('dashboard.units.centimeters');
        return t('dashboard.units.centimeters');
    }, [title, t]);

    const handleDataPointClick = (data: any) => {
        const index = data.index;
        if (index >= 0 && index < filteredChartData.length) {
            const point = filteredChartData[index];
            const formattedValue = formatValue(point.value);
            const dateTime = point.fullDateTime || point.label;

            Vibration.vibrate(10);

            Alert.alert(
                title,
                `${dateTime}\n${formattedValue} ${unit}`,
                [{text: t('dashboard.ok') || 'OK', style: 'cancel'}]
            );
        }
    };

    const chartConfig = useMemo(() => ({
        backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
        backgroundGradientFrom: isDark ? '#1a1a1a' : '#ffffff',
        backgroundGradientTo: isDark ? '#1a1a1a' : '#ffffff',
        decimalPlaces: 1,
        color: (opacity = 1) => color + Math.round(opacity * 255).toString(16).padStart(2, '0'),
        labelColor: (opacity = 1) => isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
        style: {
            borderRadius: 16
        },
        propsForDots: {
            r: "4",
            strokeWidth: "2",
            stroke: color
        },
        propsForBackgroundLines: {
            strokeDasharray: "5,5",
            stroke: isDark ? '#333' : '#e5e5e5',
            strokeWidth: 1
        }
    }), [isDark, color]);

    return (
        <Card
            elevate
            bordered
            backgroundColor={isDark ? '$gray1' : '$background'}
            flex={media.md ? undefined : 1}
            width={media.md ? "100%" : undefined}
            minWidth={280}
            marginBottom={media.md ? "$3" : 0}
        >
            <Card.Header padded>
                <XStack gap="$2" alignItems="center" justifyContent="space-between">
                    <XStack gap="$2" alignItems="center">
                        {icon}
                        <YStack>
                            <H3 fontSize="$5">{title}</H3>
                            <Text fontSize="$1" color="$gray11">
                                {data.length} {t('dashboard.charts.dataPoints')}
                            </Text>
                        </YStack>
                    </XStack>
                    {(currentValue !== undefined || data.length > 0) && (
                        <YStack alignItems="flex-end">
                            <Text fontSize="$1" color="$gray11">{t('dashboard.charts.current')}</Text>
                            <XStack alignItems="baseline" gap="$1">
                                <Text fontSize="$6" fontWeight="600" color={color}>
                                    {(() => {
                                        if (currentValue !== undefined) {
                                            return formatValue(currentValue);
                                        }
                                        if (data.length > 0) {
                                            return formatValue(data[data.length - 1]);
                                        }
                                        return '0';
                                    })()}
                                </Text>
                                <Text fontSize="$3" color="$gray10">
                                    {unit}
                                </Text>
                            </XStack>
                        </YStack>
                    )}
                </XStack>
            </Card.Header>
            <Card.Footer padded paddingTop="$0">
                {data.length > 0 ? (
                    <View style={{width: '100%', alignItems: 'center'}}>
                        <LineChart
                            data={{
                                labels: displayLabels,
                                datasets: [{
                                    data: data.length > 0 ? data : [0],
                                    color: () => color,
                                    strokeWidth: 2.5
                                }]
                            }}
                            width={chartWidth}
                            height={chartHeight}
                            yAxisLabel=""
                            yAxisSuffix=""
                            yAxisInterval={1}
                            chartConfig={chartConfig}
                            bezier
                            style={{
                                marginVertical: 8,
                                borderRadius: 16
                            }}
                            withInnerLines={true}
                            withOuterLines={false}
                            withVerticalLines={true}
                            withHorizontalLines={true}
                            withVerticalLabels={true}
                            withHorizontalLabels={true}
                            withDots={data.length < 20}
                            transparent={true}
                            onDataPointClick={handleDataPointClick}
                        />
                    </View>
                ) : (
                    <YStack height={chartHeight} alignItems="center" justifyContent="center">
                        <Activity size={32} color="$gray8"/>
                        <Text color="$gray10" marginTop="$2">{t('dashboard.charts.noData')}</Text>
                    </YStack>
                )}
            </Card.Footer>
        </Card>
    );
}
