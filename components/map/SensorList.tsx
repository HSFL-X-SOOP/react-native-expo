import {BoxType, LocationWithBoxes} from '@/api/models/sensor';
import {useTranslation} from '@/hooks/useTranslation';
import {AlertCircle, ArrowUpDown, Filter, Search} from '@tamagui/lucide-icons';
import {useMemo, useState} from 'react';
import {Button, H4, Input, ScrollView, Select, Separator, Text, XStack, YStack} from 'tamagui';
import SensorListItem from './SensorListItem';

interface SensorListProps {
    sensors: LocationWithBoxes[];
    allSensors: LocationWithBoxes[];
    onSensorSelect: (sensor: LocationWithBoxes) => void;
    highlightedSensorId?: number | null;
    loading?: boolean;
    mapCenter?: [number, number];
}

type SortOption = 'distance' | 'name' | 'recent';
type FilterType = 'all' | 'water' | 'air';

export default function SensorList({
                                       sensors,
                                       allSensors,
                                       onSensorSelect,
                                       highlightedSensorId,
                                       loading = false,
                                       mapCenter
                                   }: SensorListProps) {
    const {t} = useTranslation();

    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<SortOption>('distance');
    const [filterType, setFilterType] = useState<FilterType>('all');
    const [showAllSensors, setShowAllSensors] = useState(false);

    // Use either viewport sensors or all sensors based on toggle
    const sensorsToDisplay = showAllSensors ? allSensors : sensors;

    // Calculate distance from map center to sensor
    const calculateDistance = (sensor: LocationWithBoxes) => {
        if (!mapCenter) return 0;

        const [mapLon, mapLat] = mapCenter;
        const sensorLat = sensor.location.coordinates.lat;
        const sensorLon = sensor.location.coordinates.lon;

        // Haversine formula for distance calculation
        const R = 6371; // Earth's radius in km
        const dLat = ((sensorLat - mapLat) * Math.PI) / 180;
        const dLon = ((sensorLon - mapLon) * Math.PI) / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((mapLat * Math.PI) / 180) *
            Math.cos((sensorLat * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    // Filter and sort sensors
    const processedSensors = useMemo(() => {
        let filtered = sensorsToDisplay;

        // Apply search filter
        if (searchQuery) {
            filtered = filtered.filter((sensor) =>
                sensor.location.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Apply type filter
        if (filterType !== 'all') {
            filtered = filtered.filter((sensor) => {
                if (filterType === 'water') {
                    return sensor.boxes.some(
                        (box) =>
                            box.type === BoxType.WaterBox ||
                            box.type === BoxType.WaterTemperatureOnlyBox
                    );
                } else if (filterType === 'air') {
                    return sensor.boxes.some((box) => box.type === BoxType.AirBox);
                }
                return true;
            });
        }

        // Apply sorting
        const sorted = [...filtered].sort((a, b) => {
            if (sortBy === 'distance') {
                const distA = calculateDistance(a);
                const distB = calculateDistance(b);
                return distA - distB;
            } else if (sortBy === 'name') {
                return a.location.name.localeCompare(b.location.name);
            } else if (sortBy === 'recent') {
                // Sort by most recent measurement
                const getLatestTime = (sensor: LocationWithBoxes) => {
                    let latest = 0;
                    for (const box of sensor.boxes) {
                        if (box.measurementTimes[0]) {
                            const time = new Date(box.measurementTimes[0].time + 'Z').getTime();
                            if (time > latest) latest = time;
                        }
                    }
                    return latest;
                };
                return getLatestTime(b) - getLatestTime(a);
            }
            return 0;
        });

        return sorted;
    }, [sensorsToDisplay, searchQuery, filterType, sortBy, mapCenter, calculateDistance]);

    if (loading) {
        return (
            <YStack padding="$4" gap="$3">
                {/* Loading skeletons */}
                {[1, 2, 3, 4, 5].map((i) => (
                    <YStack
                        key={i}
                        height={120}
                        backgroundColor="$content2"
                        borderRadius="$4"
                        animation="quick"
                        opacity={0.5}
                    />
                ))}
            </YStack>
        );
    }

    return (
        <YStack flex={1}>
            {/* Header with count and toggle */}
            <YStack padding="$3" paddingBottom="$2" backgroundColor="$background">
                <XStack justifyContent="space-between" alignItems="center" marginBottom="$2">
                    <H4 fontSize="$5" fontWeight="700" color="$color">
                        {showAllSensors ? t('sensor.allSensors') : t('sensor.sensorsInView')}
                    </H4>
                    <XStack
                        paddingHorizontal="$2.5"
                        paddingVertical="$1.5"
                        borderRadius="$3"
                        backgroundColor="$accent3"
                    >
                        <Text fontSize="$3" fontWeight="700" color="$accent11">
                            {processedSensors.length}
                        </Text>
                    </XStack>
                </XStack>

                {/* Toggle between viewport and all sensors */}
                <XStack gap="$2" flexWrap="wrap">
                    <Button
                        size="$2"
                        flex={1}
                        variant={!showAllSensors ? "outlined" : undefined}
                        backgroundColor={!showAllSensors ? "$accent5" : "$content2"}
                        color={!showAllSensors ? "white" : "$color"}
                        onPress={() => setShowAllSensors(false)}
                        borderWidth={!showAllSensors ? 0 : 1}
                        borderColor="$borderColor"
                        hoverStyle={{
                            backgroundColor: !showAllSensors ? "$accent6" : "$content3",
                            borderColor: !showAllSensors ? "$accent7" : "$accent6"
                        }}
                        pressStyle={{
                            backgroundColor: !showAllSensors ? "$accent7" : "$content3",
                            scale: 0.98
                        }}
                        animation="quick"
                    >
                        {t('sensor.inViewport')}
                    </Button>
                    <Button
                        size="$2"
                        flex={1}
                        variant={showAllSensors ? "outlined" : undefined}
                        backgroundColor={showAllSensors ? "$accent5" : "$content2"}
                        color={showAllSensors ? "white" : "$color"}
                        onPress={() => setShowAllSensors(true)}
                        borderWidth={showAllSensors ? 0 : 1}
                        borderColor="$borderColor"
                        hoverStyle={{
                            backgroundColor: showAllSensors ? "$accent6" : "$content3",
                            borderColor: showAllSensors ? "$accent7" : "$accent6"
                        }}
                        pressStyle={{
                            backgroundColor: showAllSensors ? "$accent7" : "$content3",
                            scale: 0.98
                        }}
                        animation="quick"
                    >
                        {t('sensor.showAll')}
                    </Button>
                </XStack>
            </YStack>

            {/* Search Bar */}
            <YStack paddingHorizontal="$3" paddingBottom="$2">
                <XStack alignItems="center" gap="$2" position="relative">
                    <XStack position="absolute" left="$3" zIndex={1} pointerEvents="none">
                        <Search size={16} color="$gray10"/>
                    </XStack>
                    <Input
                        placeholder={t('sensor.searchSensors')}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        size="$3"
                        flex={1}
                        paddingLeft="$8"
                        borderColor="$borderColor"
                        backgroundColor="$content2"
                    />
                </XStack>
            </YStack>

            {/* Filter and Sort Controls */}
            <YStack paddingHorizontal="$3" paddingBottom="$2">
                <XStack gap="$2" flexWrap="wrap">
                    {/* Filter Type */}
                    <XStack flex={1} minWidth="45%" gap="$2" alignItems="center">
                        <Filter size={16} color="$color"/>
                        <Select value={filterType} onValueChange={(val) => setFilterType(val as FilterType)}>
                            <Select.Trigger flex={1} size="$3" iconAfter={null}>
                                <Select.Value placeholder={t('sensor.filterType')}/>
                            </Select.Trigger>

                            <Select.Content zIndex={200000}>
                                <Select.Viewport>
                                    <Select.Item index={0} value="all">
                                        <Select.ItemText>{t('sensor.allTypes')}</Select.ItemText>
                                    </Select.Item>
                                    <Select.Item index={1} value="water">
                                        <Select.ItemText>{t('sensor.waterSensors')}</Select.ItemText>
                                    </Select.Item>
                                    <Select.Item index={2} value="air">
                                        <Select.ItemText>{t('sensor.airSensors')}</Select.ItemText>
                                    </Select.Item>
                                </Select.Viewport>
                            </Select.Content>
                        </Select>
                    </XStack>

                    {/* Sort By */}
                    <XStack flex={1} minWidth="45%" gap="$2" alignItems="center">
                        <ArrowUpDown size={16} color="$color"/>
                        <Select value={sortBy} onValueChange={(val) => setSortBy(val as SortOption)}>
                            <Select.Trigger flex={1} size="$3" iconAfter={null}>
                                <Select.Value placeholder={t('sensor.sortBy')}/>
                            </Select.Trigger>

                            <Select.Content zIndex={200000}>
                                <Select.Viewport>
                                    <Select.Item index={0} value="distance">
                                        <Select.ItemText>{t('sensor.sortByDistance')}</Select.ItemText>
                                    </Select.Item>
                                    <Select.Item index={1} value="name">
                                        <Select.ItemText>{t('sensor.sortByName')}</Select.ItemText>
                                    </Select.Item>
                                    <Select.Item index={2} value="recent">
                                        <Select.ItemText>{t('sensor.sortByRecent')}</Select.ItemText>
                                    </Select.Item>
                                </Select.Viewport>
                            </Select.Content>
                        </Select>
                    </XStack>
                </XStack>
            </YStack>

            <Separator/>

            {/* Sensor List */}
            <ScrollView flex={1}>
                {processedSensors.length === 0 ? (
                    <YStack padding="$4" alignItems="center" gap="$3">
                        <AlertCircle size={48} color="$gray10"/>
                        <Text fontSize="$5" fontWeight="600" color="$color" textAlign="center">
                            {searchQuery
                                ? t('sensor.noSearchResults')
                                : t('sensor.noSensorsInView')}
                        </Text>
                        <Text fontSize="$3" color="$gray11" textAlign="center">
                            {t('sensor.noSensorsHint')}
                        </Text>
                        {(searchQuery || filterType !== 'all') && (
                            <Button
                                size="$3"
                                onPress={() => {
                                    setSearchQuery('');
                                    setFilterType('all');
                                }}
                            >
                                {t('sensor.clearFilters')}
                            </Button>
                        )}
                    </YStack>
                ) : (
                    <YStack paddingBottom="$4">
                        {processedSensors.map((sensor) => (
                            <SensorListItem
                                key={sensor.location.id}
                                locationWithBoxes={sensor}
                                onPress={() => onSensorSelect(sensor)}
                                isHighlighted={sensor.location.id === highlightedSensorId}
                            />
                        ))}
                    </YStack>
                )}
            </ScrollView>
        </YStack>
    );
}
