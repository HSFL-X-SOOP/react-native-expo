import {Href, Link} from 'expo-router';
import {ScrollView, SafeAreaView} from 'react-native';
import {Card, Text, XStack, YStack, View, Button, H1, H2, Separator} from 'tamagui';
import {ExternalLink, Globe, Database, MapPin, TrendingUp} from '@tamagui/lucide-icons';

type StudentCardProps = {
    id: string;
    letter: string;
    name: string;
    role: string;
    description: string;
    skills: string[];
};

type FeatureProps = {
    icon: React.ComponentType<{ size: number; color: string | undefined }>;
    title: string;
    description: string;
    link?: string;
};

export default function AboutScreen() {
    const studentCards: StudentCardProps[] = [
        {
            id: '1',
            letter: 'D',
            name: 'Daniel',
            role: 'Backend-Entwicklung & API',
            description: "Verantwortlich für die Server-Infrastruktur und API-Entwicklung. Expertise in Node.js und Datenbank-Design.",
            skills: ['Node.js', 'PostgreSQL', 'REST APIs', 'Docker']
        },
        {
            id: '2',
            letter: 'F',
            name: 'Fatih',
            role: 'Frontend & Mobile App',
            description: "Entwickelt die Benutzeroberfläche und mobile Anwendung. Spezialisiert auf React Native und moderne UI/UX.",
            skills: ['React Native', 'TypeScript', 'Tamagui', 'UI/UX Design']
        },
        {
            id: '3',
            letter: 'J',
            name: 'Julian',
            role: 'Datenanalyse & Algorithmen',
            description: "Analysiert Sensordaten und entwickelt Algorithmen für Dateninterpolation und -vorhersage.",
            skills: ['Python', 'Data Science', 'Machine Learning', 'Statistik']
        },
        {
            id: '4',
            letter: 'K',
            name: 'Krister',
            role: 'Hardware & IoT',
            description: "Entwickelt und wartet die Sensorkits. Expertise in Embedded Systems und IoT-Protokollen.",
            skills: ['Arduino', 'Raspberry Pi', 'Sensortechnik', 'IoT']
        },
        {
            id: '5',
            letter: 'T',
            name: 'Tarek',
            role: 'DevOps & Infrastruktur',
            description: "Verwaltet die Cloud-Infrastruktur und CI/CD-Pipelines. Sorgt für Skalierbarkeit und Zuverlässigkeit.",
            skills: ['AWS', 'Kubernetes', 'CI/CD', 'Monitoring']
        },
    ]

    const features : FeatureProps[] = [
        {
            icon: MapPin,
            title: 'Interaktive Karte',
            description: 'Visualisierung aller Sensoren mit Echtzeitdaten und interpolierten Werten zwischen den Messpunkten.',
            link: '/map'
        },
        {
            icon: TrendingUp,
            title: 'Dashboard & Historische Daten',
            description: 'Detaillierte Analyse einzelner Sensoren mit Zeitreihen und historischen Trends.',
            link: '/dashboard'
        },
        {
            icon: Database,
            title: 'API für Entwickler',
            description: 'RESTful API für den programmatischen Zugriff auf alle Messdaten.',
            link: '/api'
        }
    ]

    return (
        <SafeAreaView style={{flex: 1}}>
            <YStack flex={1} backgroundColor="$content3">
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentInsetAdjustmentBehavior="automatic"
                >
                    <YStack gap="$6" padding="$4" maxWidth={1000} alignSelf="center" paddingTop="$4">

                        <Card
                            padding="$8"
                            backgroundColor="$accent5"
                            borderRadius="$6"
                            marginTop="$4"
                            borderWidth={1}
                            borderColor="$accent6"
                        >
                            <YStack gap="$4" alignItems="center">
                                <H1 fontSize={48} fontFamily="$oswald" fontWeight="bold" textAlign="center"
                                    color="white">
                                    MARLIN
                                </H1>
                                <Text fontSize={24} textAlign="center" color="white" opacity={0.95} fontWeight="500">
                                    Marine Research & Live Information Network
                                </Text>
                                <Text fontSize={18} textAlign="center" color="white" opacity={0.9} maxWidth={600}
                                      lineHeight={26}>
                                    Echtzeitdaten zu Wetter und Meeresbedingungen aus verschiedenen Marinas
                                </Text>
                            </YStack>
                        </Card>

                        <YStack gap="$5" marginTop="$6">
                            <YStack gap="$3" alignItems="center">
                                <H2 fontSize={32} fontFamily="$oswald" fontWeight="600" textAlign="center"
                                    color="$accent7">
                                    Unsere Features
                                </H2>
                                <View width={60} height={4} backgroundColor="$accent7" borderRadius="$2"/>
                            </YStack>

                            <YStack gap="$4">
                                {features.map((feature, index) => (
                                    <FeatureCard key={index} feature={feature}/>
                                ))}
                            </YStack>
                        </YStack>

                        <Separator marginVertical="$8" borderColor="$borderColor"/>

                        <YStack gap="$5">
                            <YStack gap="$3" alignItems="center">
                                <H2 fontSize={32} fontFamily="$oswald" fontWeight="600" textAlign="center"
                                    color="$accent7">
                                    Unser Team
                                </H2>
                                <View width={60} height={4} backgroundColor="$accent7" borderRadius="$2"/>
                            </YStack>

                            <Text fontSize={18} textAlign="center" color="$color" opacity={0.85} marginBottom="$4"
                                  maxWidth={700} alignSelf="center" lineHeight={24}>
                                Studenten des Master Angewandte Informatik, die gemeinsam das MARLIN-Projekt entwickeln
                            </Text>

                            <YStack gap="$4">
                                {studentCards.map(student => (
                                    <ModernStudentCard
                                        key={student.id}
                                        student={student}
                                    />
                                ))}
                            </YStack>
                        </YStack>

                        <Card
                            padding="$8"
                            backgroundColor="$content1"
                            borderRadius="$6"
                            borderWidth={1}
                            borderColor="$borderColor"
                            marginTop="$8"
                            marginBottom="$6"
                        >
                            <YStack gap="$6" alignItems="center">
                                <View
                                    width={80}
                                    height={80}
                                    backgroundColor="$accent2"
                                    borderRadius="$12"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Globe size={48} color="$accent7"/>
                                </View>

                                <YStack gap="$3" alignItems="center">
                                    <H2 fontSize={28} fontFamily="$oswald" fontWeight="600" textAlign="center"
                                        color="$accent7">
                                        Über das Projekt
                                    </H2>
                                    <View width={60} height={4} backgroundColor="$accent7" borderRadius="$2"/>
                                </YStack>

                                <Text fontSize={18} textAlign="center" color="$color" lineHeight={26} maxWidth={700}
                                      opacity={0.9}>
                                    MARLIN ist ein innovatives Masterprojekt zur Erfassung und Visualisierung von
                                    Meeres- und Wetterdaten. Unsere Sensornetzwerke in verschiedenen Marinas
                                    sammeln kontinuierlich Daten, die über diese Plattform zugänglich gemacht werden.
                                </Text>

                                <Link href="https://marlin-live.com/" style={{textDecorationLine: 'none'}}>
                                    <Button backgroundColor="$accent7" color="white" borderRadius="$6"
                                            paddingHorizontal="$6" paddingVertical="$4"
                                            hoverStyle={{backgroundColor: "$accent8"}}>
                                        <XStack alignItems="center" gap="$3">
                                            <ExternalLink size={20} color="white"/>
                                            <Text color="white" fontWeight="600" fontSize={16}>Projektwebseite
                                                besuchen</Text>
                                        </XStack>
                                    </Button>
                                </Link>
                            </YStack>
                        </Card>

                    </YStack>
                </ScrollView>
            </YStack>
        </SafeAreaView>
    );
}


const FeatureCard = ({ feature }: { feature: FeatureProps }) => (
    <Card
        padding="$5"
        backgroundColor="$content1"
        borderRadius="$6"
        borderWidth={1}
        borderColor="$borderColor"
        hoverStyle={{
            backgroundColor: "$content2",
            borderColor: "$accent6"
        }}
    >
        <XStack alignItems="center" gap="$4">
            <View
                width={56}
                height={56}
                backgroundColor="$accent2"
                borderRadius="$10"
                alignItems="center"
                justifyContent="center"
            >
                <feature.icon size={28} color="$accent6"/>
            </View>

            <YStack flex={1} gap="$2">
                <Text fontSize="$6" fontWeight="600" color="$color">
                    {feature.title}
                </Text>
                <Text fontSize="$3" color="$color" opacity={0.8} lineHeight="$4">
                    {feature.description}
                </Text>
                {feature.link && (
                    <Link href={feature.link as Href}>
                        <Text fontSize="$3" color="$accent7" textDecorationLine="underline">
                            Mehr erfahren →
                        </Text>
                    </Link>
                )}
            </YStack>
        </XStack>
    </Card>
);

const ModernStudentCard = ({student}: {student: StudentCardProps}) => (
    <Card
        padding="$5"
        backgroundColor="$content1"
        borderRadius="$6"
        borderWidth={1}
        borderColor="$borderColor"
        hoverStyle={{
            backgroundColor: "$content2",
            scale: 1.02
        }}
    >
        <XStack alignItems="flex-start" gap="$4">
            <View
                width={72}
                height={72}
                backgroundColor="$accent7"
                borderRadius="$12"
                alignItems="center"
                justifyContent="center"
            >
                <Text fontSize="$9" fontWeight="bold" color="white">
                    {student.letter}
                </Text>
            </View>

            <YStack flex={1} gap="$3">
                <YStack gap="$1">
                    <Text fontSize="$7" fontWeight="bold" color="$color">
                        {student.name}
                    </Text>
                    <Text fontSize="$5" fontWeight="600" color="$accent7">
                        {student.role}
                    </Text>
                </YStack>

                <Text fontSize="$4" color="$color" opacity={0.8} lineHeight="$5">
                    {student.description}
                </Text>

                <XStack flexWrap="wrap" gap="$2" marginTop="$2">
                    {student.skills.map((skill, index) => (
                        <View
                            key={index}
                            backgroundColor="$accent2"
                            paddingHorizontal="$3"
                            paddingVertical="$2"
                            borderRadius="$4"
                        >
                            <Text fontSize="$2" color="$accent8" fontWeight="500">
                                {skill}
                            </Text>
                        </View>
                    ))}
                </XStack>
            </YStack>
        </XStack>
    </Card>
);