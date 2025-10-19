import { Platform } from 'react-native';
import { useMedia } from 'tamagui';

/**
 * Hook to detect if the current platform is mobile web
 * Returns true when:
 * - Platform is web AND
 * - Viewport is smaller than medium breakpoint (mobile/tablet size)
 *
 * Returns false for:
 * - Native platforms (iOS/Android)
 * - Desktop web (large screens)
 */
export function useIsMobileWeb(): boolean {
  const media = useMedia();

  // Check if it's web platform
  const isWeb = Platform.OS === 'web';

  // Check if viewport is mobile size (not greater than medium)
  const isMobileViewport = !media.gtMd;

  // Return true only if both conditions are met
  return isWeb && isMobileViewport;
}
