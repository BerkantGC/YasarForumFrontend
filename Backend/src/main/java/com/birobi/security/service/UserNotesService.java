package com.birobi.security.service;

import com.birobi.security.model.note.Note;
import com.birobi.security.model.note.UserNotes;
import com.birobi.security.repository.NoteRepository;
import com.birobi.security.repository.UserNotesRepository;
import com.birobi.security.repository.UserRepository;
import com.birobi.security.response.UserNotesResponse;
import com.birobi.security.model.user.User;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserNotesService {
    private UserNotesRepository userNotesRepository;
    private NoteRepository noteRepository;
    private UserRepository userRepository;

    public UserNotesService(UserNotesRepository userNotesRepository, NoteRepository noteRepository, UserRepository userRepository) {
        this.userNotesRepository = userNotesRepository;
        this.noteRepository = noteRepository;
        this.userRepository = userRepository;
    }

    public List<UserNotesResponse> saveUserNote(@RequestBody UserNotes userNotes)
    {
        Optional<User> user = userRepository.findByEmail(userNotes.getUser().getEmail());
        UserNotes userNotesToUpdate = userNotesRepository.findByUser(user.get());

        Note note = userNotes.getNotes().get(0);
        Note noteToSave = new Note();
        List<Note> noteList = new ArrayList<>();
        List<UserNotesResponse> userNotesResponseList = new ArrayList<>();

        if(userNotesToUpdate == null)
        {
            UserNotes userNotesToSave = new UserNotes();

            userNotesToSave.setUser(user.get());
            userNotesToSave.setNotes(new ArrayList<Note>());

            UserNotes saved = userNotesRepository.save(userNotesToSave);

            noteToSave.setTitle(note.getTitle());
            noteToSave.setDescription(note.getDescription());
            noteToSave.setDate(note.getDate());
            noteToSave.setIsPublic(note.getIsPublic());

            noteToSave.setUserNotes(saved);
            Note savedNote = noteRepository.save(noteToSave);
            noteList.add(savedNote);
            saved.setNotes(noteList);
            userNotesRepository.save(saved);

            UserNotesResponse userNotesResponse = new UserNotesResponse();

            userNotesResponse.setNote_id(noteToSave.getId());
            userNotesResponse.setDate(savedNote.getDate());
            userNotesResponse.setTitle(savedNote.getTitle());
            userNotesResponse.setDescription(savedNote.getDescription());
            userNotesResponse.setIsPublic(savedNote.getIsPublic());
            userNotesResponse.setUser_id(Long.valueOf(user.get().getId()));

            userNotesResponseList.add(userNotesResponse);
        }else {
            noteToSave.setTitle(note.getTitle());
            noteToSave.setDescription(note.getDescription());
            noteToSave.setDate(note.getDate());
            noteToSave.setIsPublic(note.getIsPublic());

            noteToSave.setUserNotes(userNotesToUpdate);
            noteList.add(noteRepository.save(noteToSave));

            userNotesToUpdate.getNotes().addAll(noteList);
            userNotesRepository.save(userNotesToUpdate);

            userNotesToUpdate.getNotes().forEach(item->{
                UserNotesResponse userNotesResponse = new UserNotesResponse();

                userNotesResponse.setNote_id(item.getId());
                userNotesResponse.setDate(item.getDate());
                userNotesResponse.setTitle(item.getTitle());
                userNotesResponse.setDescription(item.getDescription());
                userNotesResponse.setIsPublic(item.getIsPublic());
                userNotesResponse.setUser_id(Long.valueOf(item.getUserNotes().getUser().getId()));

                userNotesResponseList.add(userNotesResponse);
            });
        }

        return userNotesResponseList;
    }

    public List<UserNotesResponse> getUserNotes(@RequestBody String email)
    {
        Optional<User> userFound = userRepository.findByEmail(email);

        UserNotes userNotes = userNotesRepository.findByUser(userFound.get());
        List<UserNotesResponse> userNotesResponseList = new ArrayList<>();


        userNotes.getNotes().forEach(item->{
            UserNotesResponse userNotesResponse = new UserNotesResponse();

            userNotesResponse.setNote_id(item.getId());
            userNotesResponse.setDate(item.getDate());
            userNotesResponse.setTitle(item.getTitle());
            userNotesResponse.setDescription(item.getDescription());
            userNotesResponse.setIsPublic(item.getIsPublic());
            userNotesResponse.setUser_id(Long.valueOf(item.getUserNotes().getUser().getId()));

            userNotesResponseList.add(userNotesResponse);
        });
        return userNotesResponseList;
    }

    public List<UserNotesResponse> getAllNotes()
    {
        List<Note> noteList = noteRepository.findAll();

        List<UserNotesResponse> userNotesResponseList = new ArrayList<>();


        noteList.forEach(item->{
            UserNotesResponse userNotesResponse = new UserNotesResponse();

            userNotesResponse.setNote_id(item.getId());
            userNotesResponse.setDate(item.getDate());
            userNotesResponse.setTitle(item.getTitle());
            userNotesResponse.setDescription(item.getDescription());
            userNotesResponse.setIsPublic(item.getIsPublic());
            User user = item.getUserNotes().getUser();
            userNotesResponse.setUser_id(Long.valueOf(user.getId()));
            userNotesResponse.setUserName(user.getFirstName() + " " + user.getLastName());

            userNotesResponseList.add(userNotesResponse);
        });
        return userNotesResponseList;
    }
}
