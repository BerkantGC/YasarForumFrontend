package com.birobi.security.model.post;

import com.birobi.security.model.post.Post;
import com.birobi.security.model.user.User;
import com.birobi.security.model.user.UserLikes;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "likes")
public class Likes {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private UserLikes userLikes;

    @OneToOne
    @JoinColumn(name = "post_id", referencedColumnName = "id")
    private Post likedPost;
}
