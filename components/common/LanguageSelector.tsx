import React from 'react';
import { Button, YStack, XStack, Text } from 'tamagui';
import { useTranslation } from '@/hooks/useTranslation';

const languages = [
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
];

export const LanguageSelector: React.FC = () => {
  const { currentLanguage, changeLanguage } = useTranslation();

  return (
    <YStack gap="$3" padding="$2" minWidth={200}>
      {languages.map((language) => (
        <Button
          key={language.code}
          variant={currentLanguage === language.code ? "outlined" : "ghost"}
          justifyContent="flex-start"
          onPress={() => changeLanguage(language.code)}
        >
          <XStack alignItems="center" gap="$3" width="100%">
            <Text fontSize={"$5"}>{language.flag}</Text>
            <Text color="$color">{language.name}</Text>
          </XStack>
        </Button>
      ))}
    </YStack>
  );
};

