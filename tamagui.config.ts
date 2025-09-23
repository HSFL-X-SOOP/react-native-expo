import { createTamagui } from 'tamagui'
import { defaultConfig } from '@tamagui/config/v4'

const config = createTamagui({
    ...defaultConfig,
    // 👉 hier kannst du Tokens/Themes überschreiben
    // themeClassNameOnRoot: true, // für Web-Theming auf <html> (optional)
})

export type AppConfig = typeof config
declare module 'tamagui' { interface TamaguiCustomConfig extends AppConfig {} }

export default config
