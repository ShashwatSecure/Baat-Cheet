package com.cheet.baat.Baat_Cheet_Backend.repository;

import com.cheet.baat.Baat_Cheet_Backend.entity.RoomUser;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RoomUserRepository extends MongoRepository<RoomUser, String> {
    Optional<RoomUser> findByRoomIdAndUsername(String roomId, String username);
    boolean existsByRoomIdAndUsername(String roomId, String username);
    void deleteByRoomId(String roomId);
}
