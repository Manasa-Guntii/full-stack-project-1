package com.manasa.demo.controller;

import com.manasa.demo.model.User;
import com.manasa.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository repo;

    @PostMapping("/signup")
    public User signup(@RequestBody User user) {
        return repo.save(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody User user) {
        User db = repo.findByEmail(user.getEmail());
        if (db != null && db.getPassword().equals(user.getPassword())) {
            return db;
        }
        return null;
    }

    @GetMapping("/users")
    public List<User> getAll() {
        return repo.findAll();
    }

    @PutMapping("/update/{id}")
    public User update(@PathVariable String id, @RequestBody User user) {
        User existing = repo.findById(id).orElse(null);

        if (existing != null) {
            existing.setName(user.getName());
            existing.setEmail(user.getEmail());
            existing.setPassword(user.getPassword());
            return repo.save(existing);
        }
        return null;
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable String id) {
        repo.deleteById(id);
        return "Deleted";
    }
}