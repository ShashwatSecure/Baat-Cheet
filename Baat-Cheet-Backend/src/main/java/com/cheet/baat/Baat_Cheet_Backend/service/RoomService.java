package com.cheet.baat.Baat_Cheet_Backend.service;

import com.cheet.baat.Baat_Cheet_Backend.entity.Room;
import com.cheet.baat.Baat_Cheet_Backend.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    public Optional<Room> findRoomByRoomId(String roomId) {
        return roomRepository.findByRoomId(roomId);
    }

    public Optional<Room> createRoom(String roomId) {
        if (roomRepository.existsById(roomId)) {
            return Optional.empty(); // Room already exists
        }

        Room room = new Room();
        room.setRoomId(roomId);
        Room savedRoom = roomRepository.save(room);

        return Optional.of(savedRoom);
    }

    public Page<Room> getAllRooms(int page,int size)
    {
        Pageable pageable = PageRequest.of(page,size,Sort.by(Sort.Direction.DESC, "memberCount"));
        return roomRepository.findAll(pageable);
    }
}
