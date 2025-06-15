export interface AuthCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    access: string;
    refresh: string;
}

export interface DjangoAuthCredentials {
    email: string;
    password: string;
}