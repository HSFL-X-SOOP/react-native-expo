import { useState } from 'react';
import { Input, Button, XStack, Text } from 'tamagui';
import { Eye, EyeOff, Lock } from '@tamagui/lucide-icons';

interface PasswordInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  label: string;
  autoComplete?: 'current-password' | 'new-password';
  onSubmitEditing?: () => void;
  hasError?: boolean;
  errorMessage?: string;
}

export const PasswordInput = ({
  value,
  onChangeText,
  placeholder,
  label,
  autoComplete = 'current-password',
  onSubmitEditing,
  hasError = false,
  errorMessage,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <XStack alignItems="center" gap="$2">
        <Lock size={16} color="$accent7" />
        <Text fontSize={14} fontWeight="500" color="$accent7">
          {label}
        </Text>
      </XStack>
      <XStack alignItems="center" width="100%" position="relative">
        <Input
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!showPassword}
          size="$4"
          flex={1}
          autoComplete={autoComplete}
          borderColor={hasError ? "$red10" : "$borderColor"}
          focusStyle={{ borderColor: hasError ? "$red10" : "$accent7" }}
          onSubmitEditing={onSubmitEditing}
        />
        <Button
          position="absolute"
          right="$2"
          size="$3"
          circular
          chromeless
          onPress={() => setShowPassword(!showPassword)}
          zIndex={1}
        >
          {showPassword ? <EyeOff size={16} color="$accent7" /> : <Eye size={16} color="$accent7" />}
        </Button>
      </XStack>
      {hasError && errorMessage && (
        <Text color="$red10" fontSize={12}>
          {errorMessage}
        </Text>
      )}
    </>
  );
};
