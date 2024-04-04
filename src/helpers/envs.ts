type Envs = {
    google_id: string;
    google_secret: string;
    jwt_secret: string;
    next_auth_secret: string;
}

export const envs: Envs = {
    google_id: process.env.GOOGLE_ID || '',
    google_secret: process.env.GOOGLE_SECRET || '',
    jwt_secret: process.env.JWT_SECRET_KEY || 'mysecret',
    next_auth_secret: process.env.NEXTAUTH_SECRET || ""
}