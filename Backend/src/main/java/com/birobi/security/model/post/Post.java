package com.birobi.security.model.post;

import com.birobi.security.model.comment.PostComments;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "post")
public class Post {
    @Id
    @GeneratedValue
    private Long id;

    @Column(length = 1000)
    private String content;

    private Date createdAt;

    private Boolean anonymous;

    private Long numOfLikes;

    private Long numOfComments;

    private Boolean isChecked;

    private Boolean activated;

    @OneToOne(mappedBy = "post")
    private PostComments postComments;

    @OneToOne
    private Likes likes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(referencedColumnName = "id")
    private UserPosts userPost;
}
