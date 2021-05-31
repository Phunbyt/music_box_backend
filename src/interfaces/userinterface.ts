export interface user {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    country?: string;
    gender: string;
    email: string;
    password: string;
    confirmPassword?: string;
}