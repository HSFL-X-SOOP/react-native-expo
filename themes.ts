import {createThemes, defaultComponentThemes} from '@tamagui/theme-builder'
import * as Colors from '@tamagui/colors'

// Marlin Farben - Light Theme (HeroUI-kompatibel)
const lightPalette = [
    '#fcfcfd', // background (statt #ffffff)
    '#f4f4f5', // content1
    '#e4e4e7', // content2
    '#d4d4d8', // content3/default
    '#afafb2',
    '#8a8a8c',
    '#656567',
    '#404041',
    '#000000', // foreground
    '#78d278',
    '#053246',
    '#17c964',
]

// Marlin Farben - Dark Theme (HeroUI-kompatibel)
const darkPalette = [
    '#000000', // background
    '#18181b', // content1
    '#27272a', // content2
    '#3f3f46', // content3/default
    '#52525b', // content4
    '#65656b', // default 500
    '#8c8c90', // default 600
    '#b2b2b5', // default 700
    '#d9d9da', // default 800
    '#ffffff', // foreground
    '#78d278', // primary - Marlin Grün
    '#053246', // secondary - Marlin Blau-grau
    '#17c964', // success
]

const lightShadows = {
    shadow1: 'rgba(0,0,0,0.04)',
    shadow2: 'rgba(0,0,0,0.08)',
    shadow3: 'rgba(0,0,0,0.16)',
    shadow4: 'rgba(0,0,0,0.24)',
    shadow5: 'rgba(0,0,0,0.32)',
    shadow6: 'rgba(0,0,0,0.4)',
}

const darkShadows = {
    shadow1: 'rgba(0,0,0,0.2)',
    shadow2: 'rgba(0,0,0,0.3)',
    shadow3: 'rgba(0,0,0,0.4)',
    shadow4: 'rgba(0,0,0,0.5)',
    shadow5: 'rgba(0,0,0,0.6)',
    shadow6: 'rgba(0,0,0,0.7)',
}

const builtThemes = createThemes({
    componentThemes: defaultComponentThemes,

    base: {
        palette: {
            dark: darkPalette,
            light: lightPalette,
        },

        extra: {
            light: {
                ...lightShadows,
                shadowColor: lightShadows.shadow1,
                color: '#053246',
                accentColor: '#053246',
                // HeroUI Warning Farben
                yellow1: '#fef4e4',
                yellow2: '#fce4bd',
                yellow3: '#fad497',
                yellow4: '#f9c571',
                yellow5: '#f7b54a',
                yellow6: '#f5a524',
                yellow7: '#ca881e',
                yellow8: '#9f6b17',
                yellow9: '#744e11',
                yellow10: '#4a320b',
                yellow11: '#f5a524',
                yellow12: '#ca881e',
                // HeroUI Danger Farben
                red1: '#fee1eb',
                red2: '#fbb8cf',
                red3: '#f98eb3',
                red4: '#f76598',
                red5: '#f53b7c',
                red6: '#f31260',
                red7: '#c80f4f',
                red8: '#9e0c3e',
                red9: '#73092e',
                red10: '#49051d',
                red11: '#f31260',
                red12: '#c80f4f',
                // HeroUI Success Farben
                green1: '#e2f8ec',
                green2: '#b9efd1',
                green3: '#91e5b5',
                green4: '#68dc9a',
                green5: '#40d27f',
                green6: '#17c964',
                green7: '#13a653',
                green8: '#0f8341',
                green9: '#0b5f30',
                green10: '#073c1e',
                green11: '#17c964',
                green12: '#13a653',
            },
            dark: {
                ...darkShadows,
                color: '#78d278',        // oder z. B. dein Grün: '#78d278'
                accentColor: '#78d278',
                shadowColor: darkShadows.shadow1,
                // HeroUI Warning Farben (dark)
                yellow1: '#4a320b',
                yellow2: '#744e11',
                yellow3: '#9f6b17',
                yellow4: '#ca881e',
                yellow5: '#f5a524',
                yellow6: '#f7b54a',
                yellow7: '#f9c571',
                yellow8: '#fad497',
                yellow9: '#fce4bd',
                yellow10: '#fef4e4',
                yellow11: '#f5a524',
                yellow12: '#f7b54a',
                // HeroUI Danger Farben (dark)
                red1: '#49051d',
                red2: '#73092e',
                red3: '#9e0c3e',
                red4: '#c80f4f',
                red5: '#f31260',
                red6: '#f53b7c',
                red7: '#f76598',
                red8: '#f98eb3',
                red9: '#fbb8cf',
                red10: '#fee1eb',
                red11: '#f31260',
                red12: '#f53b7c',
                // HeroUI Success Farben (dark)
                green1: '#073c1e',
                green2: '#0b5f30',
                green3: '#0f8341',
                green4: '#13a653',
                green5: '#17c964',
                green6: '#40d27f',
                green7: '#68dc9a',
                green8: '#91e5b5',
                green9: '#b9efd1',
                green10: '#e2f8ec',
                green11: '#17c964',
                green12: '#40d27f',
            },
        },
    },

    accent: {
        palette: {
            // Marlin Primary (HeroUI-exakt)
            dark: ['#243f24', '#396439', '#4e894e', '#63ad63', '#78d278', '#90da90', '#a7e2a7', '#bfeabf', '#d7f2d7', '#eef9ee', '#78d278', '#90da90'],
            light: ['#eef9ee', '#d7f2d7', '#bfeabf', '#a7e2a7', '#90da90', '#78d278', '#63ad63', '#4e894e', '#396439', '#243f24', '#78d278', '#63ad63'],
        },
    },

    childrenThemes: {
        warning: {
            palette: {
                dark: ['#4a320b', '#744e11', '#9f6b17', '#ca881e', '#f5a524', '#f7b54a', '#f9c571', '#fad497', '#fce4bd', '#fef4e4', '#f5a524', '#f7b54a'],
                light: ['#fef4e4', '#fce4bd', '#fad497', '#f9c571', '#f7b54a', '#f5a524', '#ca881e', '#9f6b17', '#744e11', '#4a320b', '#f5a524', '#ca881e'],
            },
        },

        error: {
            palette: {
                dark: ['#49051d', '#73092e', '#9e0c3e', '#c80f4f', '#f31260', '#f53b7c', '#f76598', '#f98eb3', '#fbb8cf', '#fee1eb', '#f31260', '#f53b7c'],
                light: ['#fee1eb', '#fbb8cf', '#f98eb3', '#f76598', '#f53b7c', '#f31260', '#c80f4f', '#9e0c3e', '#73092e', '#49051d', '#f31260', '#c80f4f'],
            },
        },

        success: {
            palette: {
                dark: ['#073c1e', '#0b5f30', '#0f8341', '#13a653', '#17c964', '#40d27f', '#68dc9a', '#91e5b5', '#b9efd1', '#e2f8ec', '#17c964', '#40d27f'],
                light: ['#e2f8ec', '#b9efd1', '#91e5b5', '#68dc9a', '#40d27f', '#17c964', '#13a653', '#0f8341', '#0b5f30', '#073c1e', '#17c964', '#13a653'],
            },
        },

        secondary: {
            palette: {
                dark: ['#020f15', '#021821', '#03212e', '#04293a', '#053246', '#315666', '#5d7a87', '#889ea7', '#b4c2c8', '#e0e5e8', '#053246', '#315666'],
                light: ['#e0e5e8', '#b4c2c8', '#889ea7', '#5d7a87', '#315666', '#053246', '#04293a', '#03212e', '#021821', '#020f15', '#053246', '#04293a'],
            },
        },
    },
})

export const themes = builtThemes