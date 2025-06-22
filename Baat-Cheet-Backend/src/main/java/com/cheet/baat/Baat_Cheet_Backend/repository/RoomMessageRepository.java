package com.cheet.baat.Baat_Cheet_Backend.repository;

import com.cheet.baat.Baat_Cheet_Backend.entity.RoomMessage;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface RoomMessageRepository extends MongoRepository<RoomMessage, String> {
    Page<RoomMessage> findByRoomIdOrderByTimeStampDesc(String roomId, Pageable pageable);
    void deleteByRoomId(String roomId);
}
