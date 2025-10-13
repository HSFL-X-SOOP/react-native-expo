import {useHttpClient} from '@/api/client';
import {mockLocationWithBoxes, mockSensorModules, mockTimeRangeData} from '@/api/mock/mock-sensor-data';
import {LocationWithBoxes, SensorModule} from '@/api/models/sensor';

// ============================================
// MOCK DATA CONFIGURATION
// Set this to true to use mock data instead of API
// Set this to false to use real database
// ============================================
const USE_MOCK_DATA = false;

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
                return [];
            }
        },

        getSensorDataNew: async (timezone: string = 'UTC'): Promise<LocationWithBoxes[]> => {
            if (USE_MOCK_DATA) {
                console.log('Using mock sensor data (new API format)');
                await new Promise(resolve => setTimeout(resolve, 300));
                return mockLocationWithBoxes;
            }

            try {
                const response = await httpClient.get<LocationWithBoxes[]>(`/latestmeasurementsNEW?timezone=${timezone}`);
                console.log('API response received:', response.data?.length, 'locations');
                return response.data;
            } catch (error) {
                console.error('API call failed, returning empty array:', error);
                return [];
            }
        },

        getSensorDataTimeRange: async (id: number, timeRange: string, timezone: string = 'UTC'): Promise<LocationWithBoxes | null> => {
            if (USE_MOCK_DATA) {
                console.log(`Using mock time range data for location ${id}, range: ${timeRange}`);
                await new Promise(resolve => setTimeout(resolve, 300));
                return mockTimeRangeData(id, timeRange);
            }

            try {
                const response = await httpClient.get<LocationWithBoxes>(
                    `/location/${id}/measurementsWithinTimeRange`,
                    {params: {timeRange, timezone}}
                );
                console.log("timezone", timezone)
                return response.data;
            } catch (error) {
                console.error('API call failed, falling back to mock data:', error);
                return null;
            }
        }
    };
}
