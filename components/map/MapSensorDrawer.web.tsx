import {LocationWithBoxes} from '@/api/models/sensor';
import {ChevronLeft, ChevronRight} from '@tamagui/lucide-icons';
import {AnimatePresence, Button, ScrollView, View, XStack, YStack, useMedia} from 'tamagui';
import {ReactNode} from 'react';

interface MapSensorDrawerProps {
    isOpen: boolean;
    onToggle: () => void;
    children: ReactNode;
}

const DRAWER_WIDTH = 400;
const COLLAPSED_WIDTH = 56;

export default function MapSensorDrawer({isOpen, onToggle, children}: MapSensorDrawerProps) {
    const media = useMedia();
    const isMobileWeb = !media.gtMd; // Mobile web = screen width <= medium breakpoint

    // Mobile web: Drawer is either fully open (400px) or hidden (0px)
    // Desktop web: Drawer can be open (400px) or collapsed (56px)
    const drawerWidth = isOpen
        ? DRAWER_WIDTH
        : (isMobileWeb ? 0 : COLLAPSED_WIDTH);

    return (
        <View
            position="absolute"
            left={0}
            top={0}
            bottom={0}
            zIndex={1000}
            width={drawerWidth}
            animation="quick"
            backgroundColor="$background"
            borderRightWidth={isOpen || !isMobileWeb ? 1 : 0}
            borderColor="$borderColor"
            shadowColor="$shadowColor"
            shadowOffset={{width: 2, height: 0}}
            shadowOpacity={0.1}
            shadowRadius={8}
            overflow="hidden"
        >
            {/* Drawer Content */}
            <YStack flex={1}>
                {/* Header with toggle button */}
                <XStack
                    paddingVertical="$3"
                    paddingHorizontal="$3"
                    borderBottomWidth={1}
                    borderColor="$borderColor"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <AnimatePresence>
                        {isOpen && (
                            <View
                                animation="quick"
                                enterStyle={{opacity: 0, x: -10}}
                                exitStyle={{opacity: 0, x: -10}}
                            >
                                <Button
                                    size="$3"
                                    chromeless
                                    icon={ChevronLeft}
                                    onPress={onToggle}
                                    circular
                                    aria-label="Collapse drawer"
                                />
                            </View>
                        )}
                    </AnimatePresence>

                    {!isOpen && (
                        <Button
                            size="$3"
                            chromeless
                            icon={ChevronRight}
                            onPress={onToggle}
                            circular
                            aria-label="Expand drawer"
                        />
                    )}
                </XStack>

                {/* Content Area */}
                <AnimatePresence>
                    {isOpen && (
                        <View
                            flex={1}
                            animation="quick"
                            enterStyle={{opacity: 0, x: -20}}
                            exitStyle={{opacity: 0, x: -20}}
                        >
                            <ScrollView flex={1}>
                                {children}
                            </ScrollView>
                        </View>
                    )}
                </AnimatePresence>

                {/* Collapsed state - just show icons */}
                {!isOpen && (
                    <YStack flex={1} alignItems="center" paddingTop="$4" gap="$3">
                        {/* Could add quick action icons here in future */}
                    </YStack>
                )}
            </YStack>
        </View>
    );
}
