package com.birobi.security.controller;

import com.birobi.security.model.note.UserNotes;
import com.birobi.security.response.UserNotesResponse;
import com.birobi.security.service.UserNotesService;
import com.birobi.security.model.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/note/")
public class UserNoteController {
    @Autowired
    private UserNotesService userNotesService;

    @PostMapping
    public ResponseEntity<List<UserNotesResponse>> updateUserNotes(@RequestBody UserNotes userNotes)
    {
        return ResponseEntity.ok(userNotesService.saveUserNote(userNotes));
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<UserNotesResponse>> getUserNotes(@PathVariable("id") String email)
    {
        return ResponseEntity.ok(userNotesService.getUserNotes(email));
    }

    @GetMapping("/all-notes")
    public ResponseEntity<List<UserNotesResponse>> getUserNotes()
    {
        return ResponseEntity.ok(userNotesService.getAllNotes());
    }

}
