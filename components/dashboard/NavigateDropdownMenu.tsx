import { MarinaNameWithId } from '@/types/marina';
import {
    Check,
    ChevronDown,
    ChevronUp,
} from '@tamagui/lucide-icons';
import { Router } from 'expo-router';
import { useMemo } from 'react';
import { LinearGradient } from 'react-native-svg';
import { Adapt, FontSizeTokens, getFontSize, Select, SelectProps, Sheet, YStack } from 'tamagui';

interface NavigateDashboardDropdownMenuProps extends SelectProps {
    router: Router;
    sensorLocations: MarinaNameWithId[];
    isDark: boolean;
    selectedMarinaId: number;
    trigger?: React.ReactNode;
}

export function NavigateDashboardDropdownMenu(props: NavigateDashboardDropdownMenuProps) {
    const {router, isDark, sensorLocations, selectedMarinaId, ...restProps} = props;

    const handleValueChange = (value: string) => {
        router.push(`/dashboard/${value}`);
    };

    return (
        <Select value={String(selectedMarinaId)} onValueChange={handleValueChange} disablePreventBodyScroll {...restProps}>
            {props?.trigger || (
                <Select.Trigger maxWidth={220} iconAfter={ChevronDown}>
                    <Select.Value placeholder="Something"/>
                </Select.Trigger>
            )}

            <Adapt platform="touch">
                <Sheet native={!!props.native} modal dismissOnSnapToBottom animation="medium">
                    <Sheet.Frame>
                        <Sheet.ScrollView>
                            <Adapt.Contents/>
                        </Sheet.ScrollView>
                    </Sheet.Frame>
                    <Sheet.Overlay
                        backgroundColor={isDark ? '$gray8' : '$gray2'}
                        animation="lazy"
                        enterStyle={{opacity: 0}}
                        exitStyle={{opacity: 0}}
                    />
                </Sheet>
            </Adapt>

            <Select.Content zIndex={200000}>
                <Select.ScrollUpButton
                    alignItems="center"
                    justifyContent="center"
                    position="relative"
                    width="100%"
                    height="$3"
                >
                    <YStack zIndex={10}>
                        <ChevronUp size={20}/>
                    </YStack>
                    <LinearGradient
                        x1={0}
                        y1={0}
                        x2={0}
                        y2={1}
                    />
                </Select.ScrollUpButton>

                <Select.Viewport
                    minWidth={200}
                >
                    <Select.Group>
                        <Select.Label>Sensors</Select.Label>
                        {useMemo(
                            () =>
                                sensorLocations.map((item, i) => (
                                    <Select.Item
                                        index={i}
                                        key={item.id}
                                        value={item.id.toString()}
                                    >
                                        <Select.ItemText>
                                            {item.name}
                                        </Select.ItemText>
                                        <Select.ItemIndicator marginLeft="auto">
                                            <Check size={16}/>
                                        </Select.ItemIndicator>
                                    </Select.Item>
                                )),
                            [sensorLocations]
                        )}
                    </Select.Group>
                    {props.native && (
                        <YStack
                            position="absolute"
                            right={0}
                            top={0}
                            bottom={0}
                            alignItems="center"
                            justifyContent="center"
                            width={'$4'}
                            pointerEvents="none"
                        >
                            <ChevronDown
                                size={getFontSize((props.size as FontSizeTokens) ?? '$true')}
                            />
                        </YStack>
                    )}
                </Select.Viewport>

                <Select.ScrollDownButton
                    alignItems="center"
                    justifyContent="center"
                    position="relative"
                    width="100%"
                    height="$3"
                >
                    <YStack zIndex={10}>
                        <ChevronDown size={20}/>
                    </YStack>
                    <LinearGradient
                        x1={0}
                        y1={0}
                        x2={0}
                        y2={1}
                    />
                </Select.ScrollDownButton>
            </Select.Content>
        </Select>
    )
}