import { MarinaNameWithId } from '@/types/marina';
import { ChevronDown } from '@tamagui/lucide-icons';
import { Router } from 'expo-router';
import { useMemo } from 'react';
import { Adapt, Select, Sheet, YStack } from 'tamagui';

interface NavigateDashboardDropdownMenuProps {
    router: Router;
    sensorLocations: MarinaNameWithId[];
    isDark?: boolean;
    selectedMarinaId: number;
}

export function NavigateDashboardDropdownMenu(props: NavigateDashboardDropdownMenuProps) {
    const {router, isDark, sensorLocations, selectedMarinaId} = props;

    const handleValueChange = (value: string) => {
        router.push(`/dashboard/${value}`);
    };

    const locationOptions = useMemo(() =>
        sensorLocations.map(item => ({
            value: item.id.toString(),
            label: item.name
        })),
        [sensorLocations]
    );

    return (
        <Select
            value={String(selectedMarinaId)}
            onValueChange={handleValueChange}
        >
            <Select.Trigger
                width={280}
                iconAfter={ChevronDown}
                backgroundColor={isDark ? '$gray8' : '$gray2'}
                borderColor={isDark ? '$gray7' : '$gray4'}
            >
                <Select.Value placeholder="Select Location" />
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
                            <Adapt.Contents />
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
                <Select.ScrollUpButton />
                <Select.Viewport minWidth={280}>
                    <YStack>
                        {locationOptions.map((option, index) => (
                            <Select.Item
                                key={option.value}
                                index={index}
                                value={option.value}
                            >
                                <Select.ItemText>{option.label}</Select.ItemText>
                                <Select.ItemIndicator marginLeft="auto" />
                            </Select.Item>
                        ))}
                    </YStack>
                </Select.Viewport>
                <Select.ScrollDownButton />
            </Select.Content>
        </Select>
    );
}