export const handleRequest = async <T>(promise: Promise<T>) => {
  try {
    const data = await promise;
    return data;
  } catch (error) {
    throw error;
  }
};
