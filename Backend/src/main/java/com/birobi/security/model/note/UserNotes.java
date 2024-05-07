package com.birobi.security.model.note;

import com.birobi.security.model.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "user_notes")
public class UserNotes {

        @Id
        @GeneratedValue
        private Long id;

        @OneToOne
        @JoinColumn(name = "user_id", referencedColumnName = "id")
        private User user;

        @OneToMany(fetch = FetchType.EAGER, mappedBy = "userNotes")
        private List<Note> notes;

}
