package com.cheet.baat.Baat_Cheet_Backend.service;

import com.cheet.baat.Baat_Cheet_Backend.entity.Room;
import com.cheet.baat.Baat_Cheet_Backend.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    public Optional<Room> findRoomByRoomId(String roomId)
    {
        return roomRepository.findByRoomId(roomId);
    }
}
