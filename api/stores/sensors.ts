import { SensorModule, LocationWithBoxes } from '@/api/models/sensor';
import { mockSensorModules, mockLocationWithBoxes, mockTimeRangeData } from '@/api/mock/mock-sensor-data';
import { useHttpClient } from '@/api/client';
import axios from 'axios';

// ============================================
// MOCK DATA CONFIGURATION
// Set this to true to use mock data instead of API
// Set this to false to use real database
// ============================================
const USE_MOCK_DATA = true;

export function useSensorStore() {
    const httpClient = useHttpClient();
    return {
        getSensorData: async (): Promise<SensorModule[]> => {
            if (USE_MOCK_DATA) {
                console.log('Using mock sensor data (old API format)');
                await new Promise(resolve => setTimeout(resolve, 300));
                return mockSensorModules;
            }

            try {
                const response = await httpClient.get<SensorModule[]>('/latestmeasurements');
                return response.data;
            } catch (error) {
                console.error('API call failed, falling back to mock data:', error);
                return mockSensorModules;
            }
        },

        getSensorDataNew: async (): Promise<LocationWithBoxes[]> => {
            if (USE_MOCK_DATA) {
                console.log('Using mock sensor data (new API format)');
                await new Promise(resolve => setTimeout(resolve, 300));
                return mockLocationWithBoxes;
            }

            try {
                const response = await httpClient.get<LocationWithBoxes[]>('/latestmeasurementsNEW');
                return response.data;
            } catch (error) {
                console.error('API call failed, falling back to mock data:', error);
                return mockLocationWithBoxes;
            }
        },

        getSensorDataTimeRange: async (id: number, timeRange: string): Promise<LocationWithBoxes | null> => {
            if (USE_MOCK_DATA) {
                console.log(`Using mock time range data for location ${id}, range: ${timeRange}`);
                await new Promise(resolve => setTimeout(resolve, 300));
                return mockTimeRangeData(id, timeRange);
            }

            try {
                const response = await httpClient.get<LocationWithBoxes>(
                    `/location/${id}/measurementsWithinTimeRange`,
                    { params: { timeRange } }
                );
                return response.data;
            } catch (error) {
                console.error('API call failed, falling back to mock data:', error);
                return mockTimeRangeData(id, timeRange);
            }
        }
    };
}

// Export standalone functions for backward compatibility and direct usage
export async function getSensorData(): Promise<SensorModule[]> {
    if (USE_MOCK_DATA) {
        console.log('Using mock sensor data (old API format)');
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockSensorModules;
    }

    try {
        // For standalone function, use axios directly
        const response = await axios.get<SensorModule[]>('https://marlin-live.com/api/latestmeasurements');
        return response.data;
    } catch (error) {
        console.error('API call failed, falling back to mock data:', error);
        return mockSensorModules;
    }
}

export async function getSensorDataNew(): Promise<LocationWithBoxes[]> {
    if (USE_MOCK_DATA) {
        console.log('Using mock sensor data (new API format)');
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockLocationWithBoxes;
    }

    try {
        const response = await axios.get<LocationWithBoxes[]>('https://marlin-live.com/api/latestmeasurementsNEW');
        return response.data;
    } catch (error) {
        console.error('API call failed, falling back to mock data:', error);
        return mockLocationWithBoxes;
    }
}

export async function getSensorDataTimeRange(id: number, timeRange: string): Promise<LocationWithBoxes | null> {
    if (USE_MOCK_DATA) {
        console.log(`Using mock time range data for location ${id}, range: ${timeRange}`);
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockTimeRangeData(id, timeRange);
    }

    try {
        const response = await axios.get<LocationWithBoxes>(
            `https://marlin-live.com/api/location/${id}/measurementsWithinTimeRange`,
            { params: { timeRange } }
        );
        return response.data;
    } catch (error) {
        console.error('API call failed, falling back to mock data:', error);
        return mockTimeRangeData(id, timeRange);
    }
}

// Export old function names for backward compatibility
export {
    getSensorData as GetGeomarData,
    getSensorDataNew as GetGeomarDataNew,
    getSensorDataTimeRange as GetGeomarDataTimeRange
};