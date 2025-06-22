package com.cheet.baat.Baat_Cheet_Backend.service;

import com.cheet.baat.Baat_Cheet_Backend.entity.Room;
import com.cheet.baat.Baat_Cheet_Backend.repository.RoomMessageRepository;
import com.cheet.baat.Baat_Cheet_Backend.repository.RoomRepository;
import com.cheet.baat.Baat_Cheet_Backend.repository.RoomUserRepository;
import com.cheet.baat.Baat_Cheet_Backend.role.Role;
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

    @Autowired
    private RoomUserRepository roomUserRepository;

    @Autowired
    private RoomMessageRepository roomMessageRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private RoomUserService roomUserService;

    public Optional<Room> findRoomByRoomId(String roomId) {
        return roomRepository.findByRoomId(roomId);
    }

    public Optional<Room> createRoom(String roomId,String username) {
        if (roomRepository.existsById(roomId)) {
            return Optional.empty(); // Room already exists
        }

        Room room = new Room();
        room.setRoomId(roomId);
        room.setMemberCount(1);
        Room savedRoom = roomRepository.save(room);
        roomUserService.addUserToRoom(roomId,username);
        roomUserService.setRole(roomId,username,Role.OWNER);
        return Optional.of(savedRoom);
    }

    public Room joinRoom(String roomId, String username) {
        Optional<Room> room = findRoomByRoomId(roomId);
        if (room.isPresent() && userService.existsUserByUsername(username)) {
            boolean alreadyMember = roomUserService.isUserInRoom(roomId, username);
            if (!alreadyMember) {
                roomUserService.addUserToRoom(roomId, username);
                updateMemberCount(room.get(), 1);
            }
            return room.get();
        }
        return new Room();
    }

    public Room exitRoom(String roomId,String username)
    {
        Optional<Room> room = findRoomByRoomId(roomId);
        if(room.isPresent() && userService.existsUserByUsername(username))
        {
            updateMemberCount(room.get(),-1);
            System.out.println(room.get().getMemberCount());
            return room.get();
        }
        return new Room();
    }

    private void updateMemberCount(Room room, int val)
    {
        room.setMemberCount(room.getMemberCount()+val);
        roomRepository.save(room);
    }

    public Page<Room> getAllRooms(int page,int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "memberCount"));
        return roomRepository.findAll(pageable);
    }

    public boolean deleteRoom(String roomId)
    {
        Optional<Room> roomOpt = roomRepository.findByRoomId(roomId);

        if(roomOpt.isPresent()) {
            roomRepository.deleteById(roomId);
            roomUserRepository.deleteByRoomId(roomId);
            roomMessageRepository.deleteByRoomId(roomId);
            return true;
        }
        return false;
    }
}
