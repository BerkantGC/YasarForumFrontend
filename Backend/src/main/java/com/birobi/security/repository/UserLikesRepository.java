package com.birobi.security.repository;

import com.birobi.security.model.user.UserLikes;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserLikesRepository extends JpaRepository<UserLikes, Long> {
    UserLikes findUserLikesByUserEmail(String email);
}
