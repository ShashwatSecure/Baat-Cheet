package com.cheet.baat.Baat_Cheet_Backend.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "room_messages")
public class RoomMessage {

    @Id
    private String messageId;

    @Indexed
    private String roomId;

    @Indexed
    private String senderUsername;

    private String content;

    private LocalDateTime timeStamp;

}
