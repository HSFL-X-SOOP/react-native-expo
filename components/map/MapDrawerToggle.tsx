import { List } from '@tamagui/lucide-icons';
import { Button, XStack, useMedia } from 'tamagui';
import { Platform } from 'react-native';

interface MapDrawerToggleProps {
  onPress: () => void;
  isOpen?: boolean;
}

export default function MapDrawerToggle({ onPress, isOpen = false }: MapDrawerToggleProps) {
  const media = useMedia();
  const isNative = Platform.OS !== 'web';

  // Show toggle button only on:
  // 1. Native platforms (iOS/Android)
  // 2. Mobile web (screen width <= medium breakpoint)
  const shouldShowToggle = isNative || !media.gtMd;

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
