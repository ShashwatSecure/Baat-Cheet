package com.cheet.baat.Baat_Cheet_Backend.repository;

import com.cheet.baat.Baat_Cheet_Backend.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {

    boolean existsByUsername(String username);

    // Optionally, if you want to fetch the user too
    User findByUsername(String username);
}
