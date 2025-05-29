export interface LoginDTO {
    username: string;
    password: string
}

export interface RegisterDTO {
    name: string;
    username: string;
    password: string;
    confirmPassword: string;
}

export interface RestorePasswordDTO {
    username: string;
}

export interface ChangePasswordDTO {
    restoreToken: string;
    password: string;
    confirmPassword: string;
}