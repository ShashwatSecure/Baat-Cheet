package com.cheet.baat.Baat_Cheet_Backend.entity;

import com.cheet.baat.Baat_Cheet_Backend.role.Role;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "room_users")
@CompoundIndexes({
        @CompoundIndex(name = "room_user_unique_idx", def = "{'roomId': 1, 'username': 1}", unique = true)
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomUser {

    @Id
    private String id;

    @Indexed
    private String roomId;

    @Indexed
    private String username;

    private Role role;

    private Instant joinedAt;
}
