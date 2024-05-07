package com.birobi.security.repository;

import com.birobi.security.model.comment.PostComments;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostCommentsRepository extends JpaRepository<PostComments, Long> {
    PostComments findByPostId(Long id);
}
