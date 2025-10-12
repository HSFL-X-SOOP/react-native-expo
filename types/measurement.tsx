import { ChartDataPoint } from "@/types/chart";

export interface LatestMeasurement {
    measurementType: string;
    value: number;
}

export interface MeasurementDictionary {
    [key: string]: ChartDataPoint[];
}