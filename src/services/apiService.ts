import axiosInstance from "../utils/AxiosInstance";

const API_URL = "https://dummyjson.com";

// Fungsi untuk mengambil data
export const fetchData = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(`${API_URL}/${endpoint}`);
  if (!response.ok) throw new Error("Failed to fetch data");
  return response.json();
};

// Fungsi untuk membuat data baru
export const createData = async <T extends { id?: number }>(endpoint: string, data: object): Promise<T> => {
    try {
      const response = await axiosInstance.post<T>(`${endpoint}?timestamp=${Date.now()}`, data, {
        headers: { "Cache-Control": "no-cache" },
      });
  
      if (response.status !== 201 && response.status !== 200) {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
  
      // Ensure the response includes an id
      if (!response.data.id) {
        console.warn("API did not return an id, generating a temporary one.");
        return { ...response.data, id: Date.now() } as T; // Fallback ID if missing
      }
  
      return response.data;
    } catch (error) {
      console.error("Failed to create data:", error);
      throw new Error("Failed to create data");
    }
  };
  

// Fungsi untuk memperbarui data
export const updateData = async <T>(endpoint: string, id: number, data: object): Promise<T> => {
  const response = await fetch(`${API_URL}/${endpoint}/${id}`, {
    method: "PUT", // Bisa juga "PATCH"
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Failed to update data");
  return response.json();
};

// Fungsi untuk menghapus data
export const deleteData = async (endpoint: string, id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${endpoint}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Failed to delete data");
};