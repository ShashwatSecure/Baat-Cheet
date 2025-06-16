package com.cheet.baat.Baat_Cheet_Backend.repository;

import com.cheet.baat.Baat_Cheet_Backend.entity.Room;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RoomRepository extends MongoRepository<Room,String> {

    //get room using roomID
    Optional<Room> findByRoomId(String roomId);
}
