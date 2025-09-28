import { Dimensions, StyleSheet } from "react-native";
import { Button, Text, XStack, YStack, Sheet, Checkbox, View, useTheme } from 'tamagui';
import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

interface MapFilterButtonProps {
  module1Visible: boolean;
  setModule1Visible: (value: boolean) => void;
  module2Visible: boolean;
  setModule2Visible: (value: boolean) => void;
  module3Visible: boolean;
  setModule3Visible: (value: boolean) => void;
  temperatureVisible: boolean;
  setTemperatureVisible: (value: boolean) => void;
  windDirectionVisible: boolean;
  setWindDirectionVisible: (value: boolean) => void;
}

export default function MapFilterButton({
  module1Visible,
  setModule1Visible,
  module2Visible,
  setModule2Visible,
  module3Visible,
  setModule3Visible,
  temperatureVisible,
  setTemperatureVisible,
  windDirectionVisible,
  setWindDirectionVisible,
}: MapFilterButtonProps) {
  const {t} = useTranslation();
  const [sheetVisible, setSheetVisible] = useState(false);
  const theme = useTheme();

  const buttonBg = theme.secondary?.get?.() || theme.accentBackground?.get?.() || theme.color?.get?.();
  const iconColor = theme.onSecondary?.get?.() || theme.accentColor?.get?.() || theme.color?.get?.();

  return (
    <View>
      <Button
        theme="secondary"
        circular
        size="$6"
        onPress={() => setSheetVisible(true)}
        style={[styles.button, { backgroundColor: buttonBg }]}
      />

      <Sheet modal open={sheetVisible} onOpenChange={setSheetVisible} snapPointsMode="fit">
        <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
        <Sheet.Handle />
        <Sheet.Frame padding="$4" backgroundColor="$background" minHeight="50%">
          <XStack alignItems="center" marginBottom="$4" gap="$2">
            <Button size="$3" chromeless circular onPress={() => setSheetVisible(false)}>
            </Button>
            <Text fontSize="$6" fontWeight="600">{t('map.filterSettings')}</Text>
          </XStack>

          <YStack space="$4">
            <XStack alignItems="center" space="$3" paddingVertical="$2">
              <Checkbox
                checked={module1Visible}
                onCheckedChange={(checked) => setModule1Visible(checked === true)}
                size="$4"
              />
              <Text fontSize="$4">{t('map.module1')}</Text>
            </XStack>

            <XStack alignItems="center" space="$3" paddingVertical="$2">
              <Checkbox
                checked={module2Visible}
                onCheckedChange={(checked) => setModule2Visible(checked === true)}
                size="$4"
              />
              <Text fontSize="$4">{t('map.module2')}</Text>
            </XStack>

            <XStack alignItems="center" space="$3" paddingVertical="$2">
              <Checkbox
                checked={module3Visible}
                onCheckedChange={(checked) => setModule3Visible(checked === true)}
                size="$4"
              />
              <Text fontSize="$4">{t('map.module3')}</Text>
            </XStack>

            <XStack alignItems="center" space="$3" paddingVertical="$2">
              <Checkbox
                checked={temperatureVisible}
                onCheckedChange={(checked) => setTemperatureVisible(checked === true)}
                size="$4"
              />
              <Text fontSize="$4">{t('map.temperatureOverlay')}</Text>
            </XStack>

            <XStack alignItems="center" space="$3" paddingVertical="$2">
              <Checkbox
                checked={windDirectionVisible}
                onCheckedChange={(checked) => setWindDirectionVisible(checked === true)}
                size="$4"
              />
              <Text fontSize="$4">{t('map.windDirectionOverlay')}</Text>
            </XStack>
          </YStack>
        </Sheet.Frame>
      </Sheet>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 100,
    zIndex: 10,
    boxShadow: '0px 2px 3.84px rgba(0, 0, 0, 0.25)',
    elevation: 5,
  },
});
