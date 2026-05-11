package com.manasa.demo.controller;

import com.manasa.demo.model.User;
import com.manasa.demo.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserRepository repo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // SIGNUP
    @PostMapping("/signup")
    public User signup(@RequestBody User user) {

        // HASH PASSWORD BEFORE SAVING
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return repo.save(user);
    }

    // LOGIN
    @PostMapping("/login")
    public User login(@RequestBody User user) {

        User db = repo.findByEmail(user.getEmail());

        if (db != null &&
                passwordEncoder.matches(user.getPassword(), db.getPassword())) {

            return db;
        }

        return null;
    }

    // GET ALL USERS
    @GetMapping("/users")
    public List<User> getAll() {
        return repo.findAll();
    }

    // UPDATE USER
    @PutMapping("/update/{id}")
    public User update(@PathVariable String id, @RequestBody User user) {

        User existing = repo.findById(id).orElse(null);

        if (existing != null) {

            existing.setName(user.getName());
            existing.setEmail(user.getEmail());

            // HASH UPDATED PASSWORD
            existing.setPassword(
                    passwordEncoder.encode(user.getPassword())
            );

            return repo.save(existing);
        }

        return null;
    }

    // DELETE USER
    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable String id) {

        repo.deleteById(id);

        return "Deleted";
    }
}