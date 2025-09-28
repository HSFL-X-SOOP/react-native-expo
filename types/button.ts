// PrimaryButton.tsx
import { styled, Button } from 'tamagui'

export const PrimaryButton = styled(Button, {
    name: 'PrimaryButton',
    br: '$6',
    px: '$6',
    py: '$3',
    ai: 'center',
    jc: 'center',
    bw: 0,
    shadowColor: '$shadow2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 0,
    fontWeight: '600',
    size: '$4',

    variants: {
        tone: {
            // 👉 etwas dunkleres Blau (Secondary-Palette)
            soft: {
                bg: '$accent4',           // war $background08 → jetzt blaue Stufe 4
                color: '$accent12',       // dunkelblauer Text für guten Kontrast
                hoverStyle: { bg: '$accent5' },
                pressStyle: { bg: '$accent6', scale: 0.98 },
            },
            // „bold“ bleibt solide dunkelblau
            bold: {
                bg: '$accent6',
                color: '$background',
                hoverStyle: { bg: '$accent7' },
                pressStyle: { bg: '$accent8', scale: 0.98 },
            },
        },
    },

    defaultVariants: { tone: 'soft' },
})
