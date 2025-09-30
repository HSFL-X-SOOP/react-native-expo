import { LocationWithBoxes, SensorModule } from "@/data/sensor";
import { useTranslation } from "@/hooks/useTranslation";
import { ArrowLeft, Battery, HelpCircle, Thermometer, Waves } from "@tamagui/lucide-icons";
import { Link, useRouter } from "expo-router";
import { Platform, TouchableOpacity } from "react-native";
import { Text, useTheme, XStack, YStack } from "tamagui";
type MapSensorMeasurementsProps = {
    sensorModule: SensorModule
}

export const MapSensorMeasurements: React.FC<MapSensorMeasurementsProps> =({sensorModule}) => {
  const t = useTheme();
  const isAdmin = false; //TODO: Hier prüfen ob Admin
  const excludedMeasurements: string[] = [];

  if (!isAdmin) {
    excludedMeasurements.push("Battery, voltage");
  }
  excludedMeasurements.push("Standard deviation");

  // Wenn die Width/minWidth geändert wird, dann muss das in der global.css bei '.maplibregl-popup-content' auch angepasst werden, damit das Schließen-Kreuz richtig positioniert ist.
  const cardWidth = Platform.OS === "web" ? 300 : 320;
  const cardMinHeight = 200;

  return (
    <YStack
      backgroundColor="$background"
      padding="$3"
      borderRadius="$4"
      width={cardWidth}
      minHeight={cardMinHeight}
      shadowColor="$shadowColor"
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={0.1}
      shadowRadius={4}
      elevation={3}
    >
      <Text fontSize={16} color="$gray10">Name</Text>


      <Link href={`/dashboard/${sensorModule.location.id}`} style={{ zIndex: 10}} onPress={(e) => e.stopPropagation()}>
        <Text fontSize={24} color="$color" fontWeight="600">
          {sensorModule.location.name}
        </Text>
      </Link>


      <XStack flexWrap="wrap" width="100%" justifyContent="space-between" marginTop="$3">
        {sensorModule.latestMeasurements.map((a, index) => (
          !excludedMeasurements.includes(a.measurementType.name) && (
            <YStack key={index} width="48%" marginBottom="$2">
              <Text fontSize={16} color="$gray10">
                {getTextFromMeasurementType(a.measurementType.name)}
              </Text>
              <XStack alignItems="center">
                <Text fontSize={24} color="$color">
                  {a.value}{getMeasurementTypeSymbol(a.measurementType.name)}{" "}
                </Text>
                {getMeasurementTypeIcon(a.measurementType.name, t.color?.val)}
              </XStack>
            </YStack>
          )
        ))}
      </XStack>
    </YStack>
  );
}

type MapSensorMeasurementsNewProps = {
    locationWithBoxes: LocationWithBoxes,
    closeOverlay?: () => void
}

export const MapSensorMeasurementsNew: React.FC<MapSensorMeasurementsNewProps> =({locationWithBoxes, closeOverlay}) => {
  const {t} = useTranslation();
  const isAdmin = false; //TODO: Hier prüfen ob Admin
  const excludedMeasurements: string[] = [];
  const router = useRouter();
  if (!isAdmin) {
    excludedMeasurements.push("Battery, voltage");
  }
  excludedMeasurements.push("Standard deviation");

  // Wenn die Width/minWidth geändert wird, dann muss das in der global.css bei '.maplibregl-popup-content' auch angepasst werden, damit das Schließen-Kreuz richtig positioniert ist.
  const cardWidth = Platform.OS === "web" ? 300 : 320;
  const cardMinHeight = 200;

  const close = () => {
    closeOverlay ? closeOverlay() : null;
    router.push(`/dashboard/${locationWithBoxes.location.id}`);
  }

  return (
    <YStack
      backgroundColor="$background"
      padding="$3"
      borderRadius="$4"
      width={cardWidth}
      minHeight={cardMinHeight}
      shadowColor="$shadowColor"
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={0.1}
      shadowRadius={4}
      elevation={3}
    >
      <Text fontSize={16} color="$gray10">Name</Text>

      <TouchableOpacity onPress={close}>
        <Text fontSize={24} color="$color" fontWeight="600">
          {locationWithBoxes.location.name}
        </Text>

      </TouchableOpacity>
      {/* <Link href={`/dashboard/${locationWithBoxes.location.id}`} style={{ zIndex: 10}}>
      </Link> */}


        {locationWithBoxes.boxes.map((a, index) => (
          a.type === "WaterBox" && (
            <XStack key={index} flexWrap="wrap" width="100%" justifyContent="space-between" marginTop="$3">
            
              <MeasurementCard key={index + 1} index={index + 1} measurementType="Temperature, water" value={a.measurementTimes[0].measurements.waterTemperature}/>
              <MeasurementCard key={index + 2} index={index + 2} measurementType="Wave Height" value={a.measurementTimes[0].measurements.waveHeight}/>
              <MeasurementCard key={index + 3} index={index + 3} measurementType="Tide" value={a.measurementTimes[0].measurements.tide}/>
              {/* <MeasurementCard key={index + 4} index={index + 4} measurementType="Battery, voltage" value={a.measurementTimes[0].measurements.batteryVoltage}/> */}
              
              <XStack width={"100%"} justifyContent="space-between" alignItems="center">
                <Text fontSize={14}>{t('last.measurement')}: {formatDateTime(a.measurementTimes[0].time)}</Text>
              </XStack>
            </XStack>
            )
        )
        
        )}

        {locationWithBoxes.boxes.map((a, index) => (
          a.type === "WaterTemperatureOnlyBox" && (
            <XStack flexWrap="wrap" width="100%" justifyContent="space-between" marginTop="$3">
            
              <MeasurementCard key={index + 1} index={index + 1} measurementType="Temperature, water" value={a.measurementTimes[0].measurements.waterTemperature}/>

              <XStack width={"100%"} justifyContent="space-between" alignItems="center">
                <Text fontSize={14}>t{'last.measurement'}: {formatDateTime(a.measurementTimes[0].time)}</Text>
              </XStack>
            </XStack>
            )
        ))}
    </YStack>
  );
}

type MeasurementCardProps = {
    index: number,
    measurementType: string,
    value: number
}

function MeasurementCard({index, measurementType, value}: MeasurementCardProps) {
  const t = useTheme();
  return (              
      <YStack key={index} width="48%" marginBottom="$2">
        <Text fontSize={16} color="$gray10">
          {getTextFromMeasurementType(measurementType)}
        </Text>
        <XStack alignItems="center">
          <Text fontSize={24} color="$color">
            {value}{getMeasurementTypeSymbol(measurementType)}{" "}
          </Text>
          {getMeasurementTypeIcon(measurementType, "$color")}
        </XStack>
      </YStack>  
  );
}

function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  const pad = (n: number) => n.toString().padStart(2, "0");
  const hh = pad(date.getHours());
  const mm = pad(date.getMinutes());
  const dd = pad(date.getDate());
  const MM = pad(date.getMonth() + 1);
  const yyyy = date.getFullYear();
  return `${hh}:${mm} Uhr · ${dd}.${MM}.${yyyy}`;
}

const getMeasurementTypeIcon = (measurementType: string, color?: string) => {
  const iconColor = color || "#000000";
  const size = 24;

  switch (measurementType) {
    case "Wave Height":
      return <Waves color={iconColor} size={size} />;
    case "Temperature, water":
      return <Thermometer color={iconColor} size={size} />;
    case "WTemp":
      return <Thermometer color={iconColor} size={size} />;
    case "Tide":
      //TODO: Hier noch überprüfen ob Flut oder Ebbe und den Pfeil dementsprechend anpassen?
      return <ArrowLeft color={iconColor} size={size} />;
    case "Battery, voltage":
      return <Battery color={iconColor} size={size} />;
    default:
      return <HelpCircle color={iconColor} size={size} />;
  }
};

const getTextFromMeasurementType = (measurementType: string): string => {
  switch (measurementType) {
    case "Wave Height":
      return "Wellenhöhe";
    case "Temperature, water":
      return "Wassertemperatur";
    case "WTemp":
      return "Wassertemperatur";
    case "Tide":
      //TODO: Hier noch überprüfen ob Flut oder Ebbe und den Pfeil dementsprechend anpassen?
      return "Tide";
    case "Battery, voltage":
      return "Batteriespannung";
    default:
      return "help-circle";
  }
};

const getMeasurementTypeSymbol = (measurementType: string): string => {
  switch (measurementType) {
    case "Wave Height":
      return "cm";
    case "Temperature, water":
      return "°C";
    case "WTemp":
      return "°C";
    case "Tide":
      //TODO: Hier noch überprüfen ob Flut oder Ebbe und den Pfeil dementsprechend anpassen?
      return "cm";
    case "Battery, voltage":
      return "V";
    default:
      return "help-circle";
  }
};
