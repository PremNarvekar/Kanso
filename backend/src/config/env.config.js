// Centralized configuration for the application
// All environment-dependent values should be accessed through this module

export const config = {
    // Base URL for generated short links - uses Render production URL as default
    appUrl: process.env.APP_URL || 'https://url-shortner-x857.onrender.com/',

    // JWT configuration
    jwtSecret: process.env.JWT_SECRET || 'default-dev-secret',

    // MongoDB configuration  
    mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/urlshortener',

    // Server configuration
    port: process.env.PORT || 3000,

    // Frontend URL for CORS and redirects - use production URL as default
    frontendUrl: process.env.FRONTEND_URL || 'https://url-shortner-x857.onrender.com',

    // Google OAuth
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    googleCallbackUrl: process.env.GOOGLE_CALLBACK_URL || '/auth/google/callback',
};

// Ensure APP_URL has trailing slash
if (config.appUrl && !config.appUrl.endsWith('/')) {
    config.appUrl += '/';
}

export default config;
