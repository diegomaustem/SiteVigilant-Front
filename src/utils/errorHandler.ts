// src/utils/errorHandler.ts
export const getErrorMessage = (error: any): string => {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  
  if (error?.response?.data?.error) {
    return error.response.data.error;
  }
  
  if (error?.response?.data?.errors) {
    const errors = error.response.data.errors;
    const firstError = Object.values(errors)[0];
    if (Array.isArray(firstError) && firstError.length > 0) {
      return firstError[0];
    }
    if (typeof firstError === 'string') {
      return firstError;
    }
  }
  
  if (typeof error?.response?.data === 'string') {
    return error.response.data;
  }
  
  if (Array.isArray(error?.response?.data)) {
    const firstError = error.response.data[0];
    if (firstError?.message) {
      return firstError.message;
    }
  }
  
  return error?.message || 'Ocorreu um erro. Tente novamente.';
};