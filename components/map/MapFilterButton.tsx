import {StyleSheet, Platform} from "react-native";
import {Button, Text, XStack, YStack, Sheet, Checkbox, View, useMedia, Popover, Separator} from 'tamagui';
import {useState} from 'react';
import {useTranslation} from '@/hooks/useTranslation';
import {SlidersHorizontal, X} from '@tamagui/lucide-icons';

interface MapFilterButtonProps {
    module1Visible: boolean;
    setModule1Visible: (value: boolean) => void;
    module2Visible: boolean;
    setModule2Visible: (value: boolean) => void;
    module3Visible: boolean;
    setModule3Visible: (value: boolean) => void;
}

export default function MapFilterButton({
                                            module1Visible,
                                            setModule1Visible,
                                            module2Visible,
                                            setModule2Visible,
                                            module3Visible,
                                            setModule3Visible,
                                        }: MapFilterButtonProps) {
    const {t} = useTranslation();
    const [sheetVisible, setSheetVisible] = useState(false);
    const [popoverOpen, setPopoverOpen] = useState(false);
    const media = useMedia();
    const isWeb = Platform.OS === 'web';
    const isMobile = media.sm || media.xs;

    // For web desktop: use Popover, for web mobile and native: use Sheet
    const useSheet = !isWeb || isMobile;

    const FilterContent = () => (
        <YStack gap="$3" padding="$3" minWidth={250}>
            <XStack alignItems="center" gap="$3" paddingVertical="$2"
                    pressStyle={{opacity: 0.7}}
                    onPress={() => setModule1Visible(!module1Visible)}>
                <Checkbox
                    checked={module1Visible}
                    onCheckedChange={(checked) => setModule1Visible(checked === true)}
                    size="$4"
                    borderColor={module1Visible ? "$accent7" : "$borderColor"}
                    backgroundColor={module1Visible ? "$accent7" : "transparent"}
                >
                    <Checkbox.Indicator>
                        <View width="100%" height="100%" alignItems="center" justifyContent="center">
                            <Text color="white" fontWeight="bold">✓</Text>
                        </View>
                    </Checkbox.Indicator>
                </Checkbox>
                <Text fontSize="$4" flex={1}>{t('map.module1')}</Text>
            </XStack>

            <XStack alignItems="center" gap="$3" paddingVertical="$2"
                    pressStyle={{opacity: 0.7}}
                    onPress={() => setModule2Visible(!module2Visible)}>
                <Checkbox
                    checked={module2Visible}
                    onCheckedChange={(checked) => setModule2Visible(checked === true)}
                    size="$4"
                    borderColor={module2Visible ? "$accent7" : "$borderColor"}
                    backgroundColor={module2Visible ? "$accent7" : "transparent"}
                >
                    <Checkbox.Indicator>
                        <View width="100%" height="100%" alignItems="center" justifyContent="center">
                            <Text color="white" fontWeight="bold">✓</Text>
                        </View>
                    </Checkbox.Indicator>
                </Checkbox>
                <Text fontSize="$4" flex={1}>{t('map.module2')}</Text>
            </XStack>

            <XStack alignItems="center" gap="$3" paddingVertical="$2"
                    pressStyle={{opacity: 0.7}}
                    onPress={() => setModule3Visible(!module3Visible)}>
                <Checkbox
                    checked={module3Visible}
                    onCheckedChange={(checked) => setModule3Visible(checked === true)}
                    size="$4"
                    borderColor={module3Visible ? "$accent7" : "$borderColor"}
                    backgroundColor={module3Visible ? "$accent7" : "transparent"}
                >
                    <Checkbox.Indicator>
                        <View width="100%" height="100%" alignItems="center" justifyContent="center">
                            <Text color="white" fontWeight="bold">✓</Text>
                        </View>
                    </Checkbox.Indicator>
                </Checkbox>
                <Text fontSize="$4" flex={1}>{t('map.module3')}</Text>
            </XStack>
        </YStack>
    );

    const FilterButton = () => (
        <Button
            circular
            size="$5"
            backgroundColor="$background"
            borderWidth={2}
            borderColor="$accent8"
            onPress={() => {
                if (useSheet) {
                    setSheetVisible(true);
                } else {
                    setPopoverOpen(!popoverOpen);
                }
            }}
            hoverStyle={{
                backgroundColor: "$backgroundHover",
                borderColor: "$accent9"
            }}
            pressStyle={{
                backgroundColor: "$backgroundPress",
                borderColor: "$accent10",
                scale: 0.95
            }}
        >
            <SlidersHorizontal size={20} color="$accent8" strokeWidth={2.5} />
        </Button>
    );

    if (useSheet) {
        // Mobile (web & native) - use Sheet
        return (
            <View style={styles.buttonContainer}>
                <FilterButton />
                <Sheet modal open={sheetVisible} onOpenChange={setSheetVisible} snapPointsMode="fit">
                    <Sheet.Overlay animation="quick" enterStyle={{opacity: 0}} exitStyle={{opacity: 0}}/>
                    <Sheet.Handle/>
                    <Sheet.Frame padding="$4" backgroundColor="$background">
                        <XStack alignItems="center" justifyContent="space-between" marginBottom="$4">
                            <Text fontSize="$6" fontWeight="600">{t('map.filterSettings')}</Text>
                            <Button size="$3" chromeless circular onPress={() => setSheetVisible(false)}>
                                <X size={20} color="$color" />
                            </Button>
                        </XStack>
                        <Separator marginBottom="$3" />
                        <FilterContent />
                    </Sheet.Frame>
                </Sheet>
            </View>
        );
    } else {
        // Desktop web - use Popover
        return (
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen} placement="top-end">
                <Popover.Trigger asChild>
                    <View style={styles.buttonContainer}>
                        <FilterButton />
                    </View>
                </Popover.Trigger>
                <Popover.Content
                    borderWidth={1}
                    borderColor="$borderColor"
                    enterStyle={{y: -10, opacity: 0}}
                    exitStyle={{y: -10, opacity: 0}}
                    elevate
                    animation={[
                        'quick',
                        {
                            opacity: {
                                overshootClamping: true,
                            },
                        },
                    ]}
                >
                    <Popover.Arrow borderWidth={1} borderColor="$borderColor"/>
                    <YStack>
                        <XStack alignItems="center" justifyContent="space-between" padding="$3" paddingBottom="$2">
                            <Text fontSize="$5" fontWeight="600">{t('map.filterSettings')}</Text>
                            <Button size="$2" chromeless circular onPress={() => setPopoverOpen(false)}>
                                <X size={16} color="$color" />
                            </Button>
                        </XStack>
                        <Separator />
                        <FilterContent />
                    </YStack>
                </Popover.Content>
            </Popover>
        );
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        zIndex: 10,
    },
});
