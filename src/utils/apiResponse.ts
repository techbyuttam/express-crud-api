export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
    error?: any;
    errorCode?: string;
}

export const successResponse = <T>(message: string, data?: T): ApiResponse<T> => ({
    success: true,
    message,
    data,
});

export const errorResponse = (message: string, errorCode: string, error?: any): ApiResponse => ({
    success: false,
    message,
    errorCode, // Unique error code
    error: Array.isArray(error) ? error : JSON.stringify(error, null, 2)
});
