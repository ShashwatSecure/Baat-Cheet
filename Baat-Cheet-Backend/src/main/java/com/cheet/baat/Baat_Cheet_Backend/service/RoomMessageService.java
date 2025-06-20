package com.cheet.baat.Baat_Cheet_Backend.service;

import com.cheet.baat.Baat_Cheet_Backend.entity.RoomMessage;
import com.cheet.baat.Baat_Cheet_Backend.repository.RoomMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomMessageService {
    @Autowired
    private RoomMessageRepository roomMessageRepository;

    public void saveMessage(RoomMessage msg)
    {
        roomMessageRepository.save(msg);
    }

    public Page<RoomMessage> getMessagesByRoom(String roomId, int page, int size) {
        return roomMessageRepository.findByRoomIdOrderByTimeStampDesc(roomId, PageRequest.of(page, size));
    }

}
