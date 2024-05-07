package com.birobi.security.repository;

import com.birobi.security.model.post.UserPosts;
import com.birobi.security.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserPostsRepository extends JpaRepository<UserPosts, Long> {
    UserPosts findUserPostsByUser(User user);
}
