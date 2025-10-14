import { useThemeContext } from "@/context/ThemeSwitch";
import { useTranslation } from "@/hooks/useTranslation";
import { Activity } from "@tamagui/lucide-icons";
import { useMemo, useState } from "react";
import { Card, H3, Text, useMedia, XStack, YStack } from "tamagui";

export type LineChartCardProps = {
    title: string,
    icon?: React.ReactNode,
    chartData: { label: string, value: number, fullDateTime?: string }[],
    dataPrecision: number,
    color?: string,
    currentValue?: number,
}

export const LineChartCard: React.FC<LineChartCardProps> = ({
    title,
    icon,
    chartData,
    dataPrecision,
    color = "#4dabf7",
    currentValue
}) => {
    const {isDark} = useThemeContext();
    const {t} = useTranslation();
    const media = useMedia();
    const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const {data, displayData, minValue, maxValue} = useMemo(() => {
        if (chartData.length === 0) {
            return {data: [], displayData: [], minValue: 0, maxValue: 1};
        }

        const filteredData = chartData.filter((_, idx) => idx % dataPrecision === 0);

        const lastIndex = chartData.length - 1;
        if (lastIndex % dataPrecision !== 0 && lastIndex >= 0) {
            filteredData.push(chartData[lastIndex]);
        }

        const values = filteredData.map(item => item.value);
        const minValue = Math.min(...values);
        const maxValue = Math.max(...values);

        const padding = (maxValue - minValue) * 0.1 || 0.5;

        return {
            data: values,
            displayData: filteredData,
            minValue: minValue - padding,
            maxValue: maxValue + padding
        };
    }, [chartData, dataPrecision]);

    const chartWidth = media.md ? 320 : 400;
    const chartHeight = media.md ? 180 : 220;
    const padding = { top: 20, right: 20, bottom: 40, left: 50 };
    const innerWidth = chartWidth - padding.left - padding.right;
    const innerHeight = chartHeight - padding.top - padding.bottom;

    const unit = useMemo(() => {
        if (title === t('dashboard.charts.waterTemperature')) return t('dashboard.units.celsius');
        if (title === t('dashboard.charts.waveHeight')) return t('dashboard.units.centimeters');
        return t('dashboard.units.centimeters');
    }, [title, t]);

    const gridColor = isDark ? '#333' : '#e5e5e5';
    const textColor = isDark ? 'white' : '#666';

    const linePath = useMemo(() => {
        if (displayData.length === 0) return null;

        const xScale = (index: number) => (index / (displayData.length - 1 || 1)) * innerWidth;
        const yScale = (value: number) => innerHeight - ((value - minValue) / (maxValue - minValue)) * innerHeight;

        const points = displayData.map((item, index) => ({
            x: xScale(index),
            y: yScale(item.value)
        }));

        let path = `M ${points[0].x} ${points[0].y}`;

        for (let i = 1; i < points.length; i++) {
            const cpx = (points[i].x + points[i - 1].x) / 2;
            const cpy = (points[i].y + points[i - 1].y) / 2;
            path += ` Q ${cpx} ${points[i - 1].y} ${cpx} ${cpy}`;
            path += ` Q ${cpx} ${points[i].y} ${points[i].x} ${points[i].y}`;
        }

        return { path, points };
    }, [displayData, innerWidth, innerHeight, minValue, maxValue]);

    const handleMouseMove = (event: React.MouseEvent<SVGElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left - padding.left;
        const y = event.clientY - rect.top - padding.top;

        if (x >= 0 && x <= innerWidth && y >= 0 && y <= innerHeight) {
            const pointIndex = Math.round((x / innerWidth) * (displayData.length - 1));
            setHoveredPoint(Math.min(Math.max(0, pointIndex), displayData.length - 1));
            setMousePosition({ x: event.clientX - rect.left, y: event.clientY - rect.top });
        } else {
            setHoveredPoint(null);
        }
    };

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
                                {displayData.length} {t('dashboard.charts.dataPoints')}
                            </Text>
                        </YStack>
                    </XStack>
                    {(currentValue !== undefined || data.length > 0) && (
                        <YStack alignItems="flex-end">
                            <Text fontSize="$1" color="$gray11">{t('dashboard.charts.current')}</Text>
                            <XStack alignItems="baseline" gap="$1">
                                <Text fontSize="$6" fontWeight="600" color={color}>
                                    {currentValue !== undefined
                                        ? (currentValue < 1 ? currentValue.toFixed(2) : currentValue.toFixed(1))
                                        : data[data.length - 1] !== undefined
                                            ? (data[data.length - 1] < 1 ? data[data.length - 1].toFixed(2) : data[data.length - 1].toFixed(1))
                                            : '0'}
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
                {displayData.length > 0 ? (
                    <YStack position="relative" width="100%">
                        <svg
                            width={chartWidth}
                            height={chartHeight}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={() => setHoveredPoint(null)}
                            style={{ cursor: 'crosshair' }}
                        >
                            <g transform={`translate(${padding.left}, ${padding.top})`}>
                                {/* Grid lines */}
                                {[0, 1, 2, 3, 4].map(i => {
                                    const y = (innerHeight / 4) * i;
                                    const value = maxValue - ((maxValue - minValue) / 4) * i;
                                    return (
                                        <g key={i}>
                                            <line
                                                x1={0}
                                                y1={y}
                                                x2={innerWidth}
                                                y2={y}
                                                stroke={gridColor}
                                                strokeDasharray="3 3"
                                            />
                                            <text
                                                x={-10}
                                                y={y + 4}
                                                fill={textColor}
                                                fontSize="10"
                                                textAnchor="end"
                                            >
                                                {value < 1 ? value.toFixed(1) : Math.round(value)}
                                            </text>
                                        </g>
                                    );
                                })}

                                {/* X axis */}
                                <line
                                    x1={0}
                                    y1={innerHeight}
                                    x2={innerWidth}
                                    y2={innerHeight}
                                    stroke={gridColor}
                                />

                                {/* Y axis */}
                                <line
                                    x1={0}
                                    y1={0}
                                    x2={0}
                                    y2={innerHeight}
                                    stroke={gridColor}
                                />

                                {/* Line chart */}
                                {linePath?.path && (
                                    <path
                                        d={linePath.path}
                                        fill="none"
                                        stroke={color}
                                        strokeWidth="2.5"
                                    />
                                )}

                                {/* Data points */}
                                {linePath?.points?.map((point, index) => (
                                    <circle
                                        key={index}
                                        cx={point.x}
                                        cy={point.y}
                                        r={hoveredPoint === index ? 6 : 3}
                                        fill={color}
                                        stroke={isDark ? '#fff' : '#fff'}
                                        strokeWidth={hoveredPoint === index ? 2 : 0}
                                        style={{ transition: 'all 0.2s' }}
                                    />
                                ))}

                                {/* Hover line */}
                                {hoveredPoint !== null && linePath?.points && (
                                    <line
                                        x1={linePath.points[hoveredPoint].x}
                                        y1={0}
                                        x2={linePath.points[hoveredPoint].x}
                                        y2={innerHeight}
                                        stroke={color}
                                        strokeDasharray="5 5"
                                        opacity={0.5}
                                    />
                                )}
                            </g>
                        </svg>

                        {/* Tooltip */}
                        {hoveredPoint !== null && displayData[hoveredPoint] && (
                            <YStack
                                position="absolute"
                                left={mousePosition.x}
                                top={mousePosition.y - 40}
                                transform="translateX(-50%)"
                                backgroundColor={isDark ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.95)'}
                                paddingHorizontal="$2"
                                paddingVertical="$1.5"
                                borderRadius="$2"
                                borderWidth={1}
                                borderColor={color}
                                pointerEvents="none"
                                zIndex={10}
                                shadowColor="$shadowColor"
                                shadowRadius="$2"
                                shadowOpacity={0.15}
                            >
                                <Text fontSize="$1" color={textColor}>
                                    {displayData[hoveredPoint].fullDateTime || displayData[hoveredPoint].label}
                                </Text>
                                <Text fontSize="$2" fontWeight="bold" color={color}>
                                    {displayData[hoveredPoint].value < 1
                                        ? displayData[hoveredPoint].value.toFixed(2)
                                        : displayData[hoveredPoint].value.toFixed(1)} {unit}
                                </Text>
                            </YStack>
                        )}
                    </YStack>
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