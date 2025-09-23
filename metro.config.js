const { getDefaultConfig } = require('expo/metro-config')
const { withTamagui } = require('@tamagui/metro-plugin')

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, { isCSSEnabled: true })

// (nur falls nötig) mjs-Workaround für ältere SDKs
if (!config.resolver.sourceExts.includes('mjs')) {
 config.resolver.sourceExts.push('mjs')
}

// Support für .txt Dateien hinzufügen
if (!config.resolver.assetExts.includes('txt')) {
 config.resolver.assetExts.push('txt')
}

module.exports = withTamagui(config, {
 components: ['tamagui', '@tamagui/lucide-icons'],
 config: './tamagui.config.ts',
 outputCSS: './tamagui-web.css',
})
