package com.cheet.baat.Baat_Cheet_Backend.service;

import com.cheet.baat.Baat_Cheet_Backend.entity.User;
import com.cheet.baat.Baat_Cheet_Backend.repository.UserRepository;
import com.cheet.baat.Baat_Cheet_Backend.util.JwtUtil;
import com.mongodb.DuplicateKeyException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class UserService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    public boolean existsUserByUsername(String username)
    {
        return userRepository.existsByUsername(username);
    }

    public List<String> generateUsernameSuggestions(String baseUsername) {
        List<String> suggestions = new ArrayList<>();
        Random random = new Random();
        int suffix = 1;

        // Add sequential suffixes first
        while (suggestions.size() < 3) {
            String suggestion = baseUsername + suffix++;
            if (!userRepository.existsByUsername(suggestion)) {
                suggestions.add(suggestion);
            }
        }

        // Add some random suffix-based suggestions
        while (suggestions.size() < 5) {
            String suggestion = baseUsername + random.nextInt(1000);
            if (!userRepository.existsByUsername(suggestion)) {
                suggestions.add(suggestion);
            }
        }

        return suggestions;
    }

    public User createUser(User user) {
        try {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            return userRepository.save(user);
        } catch (DuplicateKeyException e) {
            throw new RuntimeException("Username already exists");
        }
    }

    public String loginUser(String username, String password) {
        User user = userRepository.findByUsername(username);
        if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        return jwtUtil.generateToken(user.getUserId(),user.getUsername());
    }

}
