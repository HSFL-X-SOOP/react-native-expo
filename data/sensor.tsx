export interface SensorModule {
    location:           Location;
    latestMeasurements: LatestMeasurement[];
}

export interface LatestMeasurement {
    sensor:          Sensor;
    measurementType: MeasurementType;
    time:            Date;
    value:           number;
}

export interface MeasurementType {
    id:             number;
    name:           string;
    description:    string;
    unitName:       string;
    unitSymbol:     string;
    unitDefinition: string;
}

export interface Sensor {
    id:          number;
    name:        string;
    description: string;
    isMoving:    boolean;
}

export interface Location {
    id:          number;
    name:        string;
    coordinates: Coordinates;
}

export interface Coordinates {
    lat: number;
    lon: number;
}

export interface Coordinates {
    lat: number;
    lon: number;
}

export interface Location {
    id: number;
    name: string;
    coordinates: Coordinates;
}

export interface WaterTemperatureOnlyMeasurements {
    waterTemperature: number;
}

export interface WaterBoxMeasurements {
    waterTemperature: number;
    waveHeight: number;
    tide: number;
    standardDeviation: number;
    batteryVoltage: number;
}

export interface AirBoxMeasurements {
    airTemperature: number;
    windSpeed: number;
    windDirection: number;
    gustSpeed: number;
    gustDirection: number;
    humidity: number;
    airPressure: number;
}

export interface MeasurementTime<T> {
    time: string;
    measurements: T;
}

export type Box =
    | {
        type: "WaterTemperatureOnlyBox";
        id: number;
        name: string;
        description: string;
        isMoving: boolean;
        measurementTimes: MeasurementTime<WaterTemperatureOnlyMeasurements>[];
    }
    | {
        type: "WaterBox";
        id: number;
        name: string;
        description: string;
        isMoving: boolean;
        measurementTimes: MeasurementTime<WaterBoxMeasurements>[];
    }
    | {
        type: "AirBox";
        id: number;
        name: string;
        description: string;
        isMoving: boolean;
        measurementTimes: MeasurementTime<AirBoxMeasurements>[];
    };

export interface LocationWithBoxes {
    location: Location;
    boxes: Box[];
}