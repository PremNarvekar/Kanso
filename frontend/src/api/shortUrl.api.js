import axiosInstance from "../../utils/axiosInstance";

export const createShortUrl = async ({ url, slug }) => {
    const { data } = await axiosInstance.post("/api", { url, slug });
    return data;
}

export const getHistory = async () => {
    const { data } = await axiosInstance.get("/api/history");
    return data
}