import { Card, YStack, View, H1, Text } from 'tamagui';
import { ReactNode } from 'react';
import type { IconProps } from '@tamagui/helpers-icon';

interface AuthCardProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  icon: React.ComponentType<IconProps>;
}

export const AuthCard = ({ children, title, subtitle, icon: Icon }: AuthCardProps) => {
  return (
    <Card
      elevate
      size="$4"
      bordered
      padding="$6"
      width={400}
      maxWidth="90%"
      backgroundColor="$content1"
      borderRadius="$8"
      borderColor="$borderColor"
    >
      <YStack gap="$5" alignItems="center">
        <YStack gap="$3" alignItems="center">
          <View
            width={80}
            height={80}
            backgroundColor="$accent2"
            borderRadius="$12"
            alignItems="center"
            justifyContent="center"
          >
            <Icon size={40} color="$accent7" />
          </View>
          <H1 fontSize={28} fontWeight="bold" color="$accent7" fontFamily="$oswald">
            {title}
          </H1>
          <Text color="$color" textAlign="center" fontSize={16} opacity={0.8} maxWidth={300}>
            {subtitle}
          </Text>
        </YStack>
        {children}
      </YStack>
    </Card>
  );
};
