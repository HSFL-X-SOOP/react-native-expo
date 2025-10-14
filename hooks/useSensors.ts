import {useState, useEffect} from 'react';
import {SensorModule, LocationWithBoxes} from '@/api/models/sensor';
import {useSensorStore} from '@/api/stores/sensors';

/**
 * Hook to fetch sensor data (old API format)
 */
export function useSensorData() {
    const [data, setData] = useState<SensorModule[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const sensorStore = useSensorStore();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await sensorStore.getSensorData();
                setData(result);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch sensor data');
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const refetch = async () => {
        try {
            setLoading(true);
            const result = await sensorStore.getSensorData();
            setData(result);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch sensor data');
        } finally {
            setLoading(false);
        }
    };

    return {data, loading, error, refetch};
}

/**
 * Hook to fetch sensor data with location boxes (new API format)
 */
export function useSensorDataNew() {
    const [data, setData] = useState<LocationWithBoxes[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const sensorStore = useSensorStore();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await sensorStore.getSensorDataNew();
                setData(result);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch sensor data');
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const refetch = async () => {
        try {
            setLoading(true);
            const result = await sensorStore.getSensorDataNew();
            setData(result);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch sensor data');
        } finally {
            setLoading(false);
        }
    };

    return {data, loading, error, refetch};
}

/**
 * Hook to fetch sensor data for a specific location within a time range (FAST API)
 * Uses the new FAST endpoint which includes backend-side data aggregation
 */
export function useSensorDataTimeRange(id: number | null, timeRange: string = '24h') {
    const [data, setData] = useState<LocationWithBoxes | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const sensorStore = useSensorStore()

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await sensorStore.getSensorDataTimeRangeFAST(id, timeRange);
                setData(result);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch time range data');
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, timeRange]);

    const refetch = async () => {
        if (!id) return;

        try {
            setLoading(true);
            const result = await sensorStore.getSensorDataTimeRangeFAST(id, timeRange);
            setData(result);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch time range data');
        } finally {
            setLoading(false);
        }
    };

    return {data, loading, error, refetch};
}
