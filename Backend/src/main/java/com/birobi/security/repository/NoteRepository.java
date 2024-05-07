package com.birobi.security.repository;

import com.birobi.security.model.note.Note;
import com.birobi.security.model.note.UserNotes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteRepository extends JpaRepository<Note, Long> {
    Note findNotesById(Long id);
    Note findNotesByUserNotes(UserNotes userNotes);
}
