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