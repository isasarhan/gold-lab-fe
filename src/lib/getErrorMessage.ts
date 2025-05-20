import axios from "axios";

export const getAxiosError = (error: any) => {
    let errorMessage = "An unexpected error occurred";

    if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message || errorMessage;
    } else if (error instanceof Error) {
        errorMessage = error.message;
    }

    return errorMessage
} 