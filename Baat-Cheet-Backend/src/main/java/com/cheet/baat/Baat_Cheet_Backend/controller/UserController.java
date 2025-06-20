package com.cheet.baat.Baat_Cheet_Backend.controller;

import com.cheet.baat.Baat_Cheet_Backend.entity.User;
import com.cheet.baat.Baat_Cheet_Backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
@CrossOrigin("http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        if (userService.existsUserByUsername(user.getUsername())) {
            return ResponseEntity.status(409).body(
                    Map.of(
                            "message", "Username already taken",
                            "suggestions", userService.generateUsernameSuggestions(user.getUsername())
                    )
            );
        } else {
            User createdUser = userService.createUser(user);
            return ResponseEntity.ok("User Created!");
        }
    }

    @PostMapping("/enter")
    public ResponseEntity<?> loginUser(@RequestBody User user)
    {
        String token = userService.loginUser(user.getUsername(),user.getPassword());
        return ResponseEntity.ok(Map.of(
                "token", token,
                "username", user.getUsername()
        ));
    }
}
