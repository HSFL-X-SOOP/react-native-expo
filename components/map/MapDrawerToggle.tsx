import { List } from '@tamagui/lucide-icons';
import { Button, XStack } from 'tamagui';
import { Platform } from 'react-native';
import { useIsMobileWeb } from '@/hooks/useIsMobileWeb';

interface MapDrawerToggleProps {
  onPress: () => void;
  isOpen?: boolean;
}

export default function MapDrawerToggle({ onPress, isOpen = false }: MapDrawerToggleProps) {
  const isMobileWeb = useIsMobileWeb();
  const isNative = Platform.OS !== 'web';

  const shouldShowToggle = isNative || isMobileWeb;

  if (!shouldShowToggle) {
    return null; // Don't show on desktop web
  }

  return (
    <XStack
      position="absolute"
      top={isNative ? '$12' : '$4'}
      left="$4"
      zIndex={999}
      animation="quick"
    >
      <Button
        size="$4"
        circular
        icon={List}
        backgroundColor="$background"
        borderColor="$borderColor"
        borderWidth={1}
        onPress={onPress}
        shadowColor="$shadowColor"
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={0.25}
        shadowRadius={4}
        elevate
        pressStyle={{
          scale: 0.95,
          backgroundColor: '$content2'
        }}
        hoverStyle={{
          scale: 1.05,
          backgroundColor: '$content2'
        }}
        animation="quick"
      />
    </XStack>
  );
}
