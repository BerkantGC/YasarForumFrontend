package com.birobi.security.repository;

import com.birobi.security.model.post.Likes;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LikesRepository extends JpaRepository<Likes, Long> {
    Likes findLikesByLikedPostId(Long id);
}
