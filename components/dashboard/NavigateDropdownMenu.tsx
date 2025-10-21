import { MarinaNameWithId } from '@/types/marina';
import { ChevronDown } from '@tamagui/lucide-icons';
import { Router } from 'expo-router';
import { useMemo } from 'react';
import { SelectWithSheet } from '@/components/ui/SelectWithSheet';
import { SelectItem } from '@/types/select';

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

    const locationOptions: SelectItem<string>[] = useMemo(() =>
            sensorLocations.map(item => ({
                value: item.id.toString(),
                label: item.name
            })),
        [sensorLocations]
    );

    return (
        <SelectWithSheet
            id="location-select"
            name="location"
            items={locationOptions}
            value={String(selectedMarinaId)}
            onValueChange={handleValueChange}
            placeholder="Select Location"
            triggerProps={{
                width: 280,
                iconAfter: ChevronDown,
                backgroundColor: isDark ? '$gray8' : '$gray2',
                borderColor: isDark ? '$gray7' : '$gray4'
            }}
        />
    );
}