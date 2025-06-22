import {httpClient} from "../config/AxiosHelper";
import axios from 'axios';

export const createRoomApi = async (roomId) => {
    const response = await httpClient.post(`http://localhost:8080/api/v1/rooms/create?roomId=${encodeURIComponent(roomId)}`);
    return response.data;
};

export const joinRoomApi = async (roomId,username) => {
    const response = await httpClient.post(`http://localhost:8080/api/v1/rooms/${roomId}?username=${username}`);
    console.log(response)
    return response.data;
}

export const getAllRoomsSortedByMemberStrength = (page = 0, size = 20) => {
  console.log("Fetching rooms...");
  return axios
    .get(`http://localhost:8080/api/v1/rooms/all?page=${page}&size=${size}`)
    .then((res) => {
      console.log(res.data); // Logs rooms data
      return res.data;
    })
    .catch((error) => {
      console.error("Error fetching rooms:", error);
      throw error;
    });
};