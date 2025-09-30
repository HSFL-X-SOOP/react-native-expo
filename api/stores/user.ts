import { UpdateProfileRequest, UserProfile } from '@/api/models/profile';
import { useHttpClient } from '@/api/client';

export function useUserStore() {
    const httpClient = useHttpClient();

    return {
        getProfile: async (): Promise<UserProfile | null> => {
            try {
                const response = await httpClient.get<UserProfile>('/user-profile');
                return response.data;
            } catch (error: any) {
                if (error.response?.status === 404) {
                    return null;
                }
                throw error;
            }
        },

        createProfile: (body: UpdateProfileRequest) =>
            httpClient.post<UserProfile>('/user-profile', body).then(r => r.data),

        updateProfile: (body: UpdateProfileRequest) =>
            httpClient.put<UserProfile>('/user-profile', body).then(r => r.data),
    };
}