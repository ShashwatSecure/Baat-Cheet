import {httpClient} from "../config/AxiosHelper";

export const createRoomApi = async (roomId) => {
    const response = await httpClient.post(`/api/v1/rooms/create?roomId=${encodeURIComponent(roomId)}`);
    return response.data;
};

export const joinRoomApi = async (roomId) => {
    const response = await httpClient.post(`/api/v1/rooms/${roomId}`);
    return response.data;
}

export const sendMessageApi = async (roomId, senderUsername, content) => {
  const response = await httpClient.post(`/api/v1/rooms/${roomId}/message`, {
    sender: senderUsername,
    content: content,
  });
  return response.data;
};
