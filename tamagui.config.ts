import { createTamagui, createFont } from 'tamagui'
import { themes } from './themes'
import { config as defaultConfig } from '@tamagui/config/v3'

const oswaldFont = createFont({
  family: 'Oswald_400Regular',
  size: defaultConfig.fonts.body.size,
  lineHeight: defaultConfig.fonts.body.lineHeight,
  letterSpacing: defaultConfig.fonts.body.letterSpacing,
  weight: defaultConfig.fonts.body.weight,
  face: {
    400: { normal: 'Oswald_400Regular' },
    500: { normal: 'Oswald_500Medium' },
    600: { normal: 'Oswald_600SemiBold' },
    700: { normal: 'Oswald_700Bold' },
  },
})

export const config = createTamagui({
  ...defaultConfig,
  fonts: {
    ...defaultConfig.fonts,
    oswald: oswaldFont,
  },
  themes,
})

export type AppConfig = typeof config
declare module 'tamagui' { interface TamaguiCustomConfig extends AppConfig {} }

export default config
