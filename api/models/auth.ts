export interface LoginRequest {
    email: string;
    password: string;
    rememberMe: boolean;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string | null;
}

export interface MagicLinkLoginRequest {
    token: string;
}

export interface MagicLinkRequest {
    email: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    rememberMe: boolean;
}

export interface VerifyEmailRequest {
    token: string;
}