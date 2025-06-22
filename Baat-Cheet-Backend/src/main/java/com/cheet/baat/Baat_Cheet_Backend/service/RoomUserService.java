package com.cheet.baat.Baat_Cheet_Backend.service;

import com.cheet.baat.Baat_Cheet_Backend.entity.RoomUser;
import com.cheet.baat.Baat_Cheet_Backend.repository.RoomUserRepository;
import com.cheet.baat.Baat_Cheet_Backend.role.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;

@Service
public class RoomUserService {

    @Autowired
    private RoomUserRepository roomUserRepository;

    public void setRole(String roomId,String username, Role role)
    {
        Optional<RoomUser> roomUser= roomUserRepository.findByRoomIdAndUsername(roomId,username);

        roomUser.ifPresent(user -> user.setRole(role));
        roomUserRepository.save(roomUser.get());
    }
    public boolean isUserInRoom(String roomId, String username) {
        return roomUserRepository.existsByRoomIdAndUsername(roomId, username);
    }

    public void addUserToRoom(String roomId, String username) {
        RoomUser roomUser = RoomUser.builder()
                .roomId(roomId)
                .username(username)
                .joinedAt(Instant.now())
                
                .build();
        roomUserRepository.save(roomUser);
    }
}
