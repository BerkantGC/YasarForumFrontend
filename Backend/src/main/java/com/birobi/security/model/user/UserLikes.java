package com.birobi.security.model.user;

import com.birobi.security.model.comment.Comment;
import com.birobi.security.model.post.Likes;
import com.birobi.security.model.post.Post;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user_likes")
public class UserLikes {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @OneToMany(fetch = FetchType.EAGER,mappedBy = "userLikes")
    private List<Likes> likes;
}
