import { Input, XStack, Text } from 'tamagui';
import { Mail } from '@tamagui/lucide-icons';

interface EmailInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  label: string;
  onSubmitEditing?: () => void;
  hasError?: boolean;
  errorMessage?: string;
}

export const EmailInput = ({
  value,
  onChangeText,
  placeholder,
  label,
  onSubmitEditing,
  hasError = false,
  errorMessage,
}: EmailInputProps) => {
  return (
    <>
      <XStack alignItems="center" gap="$2">
        <Mail size={16} color="$accent7" />
        <Text fontSize={14} fontWeight="500" color="$accent7">
          {label}
        </Text>
      </XStack>
      <Input
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        size="$4"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        borderColor={hasError ? "$red10" : "$borderColor"}
        focusStyle={{ borderColor: hasError ? "$red10" : "$accent7" }}
        onSubmitEditing={onSubmitEditing}
      />
      {hasError && errorMessage && (
        <Text color="$red10" fontSize={12}>
          {errorMessage}
        </Text>
      )}
    </>
  );
};
