import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons';
import { Button, ScrollView, Sheet, View, XStack, YStack } from 'tamagui';
import { ReactNode } from 'react';

interface MapSensorDrawerProps {
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
}

export default function MapSensorDrawer({ isOpen, onToggle, children }: MapSensorDrawerProps) {
  return (
    <Sheet
      forceRemoveScrollEnabled={isOpen}
      modal={false}
      open={isOpen}
      onOpenChange={onToggle}
      snapPoints={[20, 60, 90]}
      dismissOnSnapToBottom
      position={0}
      zIndex={100_000}
      animation="quick"
    >
      <Sheet.Overlay
        animation="lazy"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />

      <Sheet.Handle backgroundColor="$borderColor" />

      <Sheet.Frame
        padding="$0"
        backgroundColor="$background"
        borderTopLeftRadius="$4"
        borderTopRightRadius="$4"
      >
        {/* Header */}
        <XStack
          paddingVertical="$3"
          paddingHorizontal="$4"
          borderBottomWidth={1}
          borderColor="$borderColor"
          alignItems="center"
          justifyContent="space-between"
        >
          <Button
            size="$3"
            chromeless
            icon={isOpen ? ChevronDown : ChevronUp}
            onPress={onToggle}
            circular
            aria-label={isOpen ? "Close drawer" : "Open drawer"}
          />
        </XStack>

        {/* Content */}
        <ScrollView flex={1} contentContainerStyle={{ padding: 0 }}>
          <YStack padding="$0">
            {children}
          </YStack>
        </ScrollView>
      </Sheet.Frame>
    </Sheet>
  );
}
