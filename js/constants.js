// ============================================
// CONSTANTS
// ============================================

export const COLORS = {
    primary: '#667eea',
    secondary: '#764ba2',
    accent: '#00d4ff',
    success: '#00ff88',
    warning: '#ffd700',
    error: '#ff6b6b',
    dark: '#0a0e27',
    light: '#f8f9fa'
};

export const BREAKPOINTS = {
    xs: 320,
    sm: 480,
    md: 768,
    lg: 1024,
    xl: 1280,
    xxl: 1536
};

export const ANIMATION_DURATION = {
    fast: 150,
    normal: 300,
    slow: 500
};

export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
};

export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Network error occurred',
    VALIDATION_ERROR: 'Validation failed',
    NOT_FOUND: 'Resource not found',
    SERVER_ERROR: 'Server error occurred'
};

export const SUCCESS_MESSAGES = {
    SAVED: 'Changes saved successfully',
    DELETED: 'Item deleted successfully',
    CREATED: 'Item created successfully'
};

export default {
    COLORS,
    BREAKPOINTS,
    ANIMATION_DURATION,
    HTTP_STATUS,
    ERROR_MESSAGES,
    SUCCESS_MESSAGES
};
