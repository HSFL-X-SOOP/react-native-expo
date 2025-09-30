export interface UserProfile {
    id: number;
    userId: number;
    language: Language;
    roles: ActivityRole[];
    measurementSystem: MeasurementSystem;
    createdAt: string;
    updatedAt?: string;
}

export interface UpdateProfileRequest {
    language?: Language;
    roles?: ActivityRole[];
    measurementSystem?: MeasurementSystem;
}

export enum Language {
    EN = "EN",
    DE = "DE"
}

export enum ActivityRole {
    HARBOR_MASTER = "HARBOR_MASTER",
    SWIMMER = "SWIMMER",
    SAILOR = "SAILOR",
    FISHERMAN = "FISHERMAN"
}

export enum MeasurementSystem {
    METRIC = "METRIC",
    IMPERIAL = "IMPERIAL"
}