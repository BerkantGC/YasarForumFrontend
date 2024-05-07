package com.birobi.security.repository;

import com.birobi.security.model.note.UserNotes;
import com.birobi.security.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserNotesRepository extends JpaRepository<UserNotes, Long> {
    UserNotes findByUser(User user);
}