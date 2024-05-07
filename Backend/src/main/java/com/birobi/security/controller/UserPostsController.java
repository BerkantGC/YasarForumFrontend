package com.birobi.security.controller;

import com.birobi.security.model.post.Post;
import com.birobi.security.model.post.UserPosts;
import com.birobi.security.response.LikeResponse;
import com.birobi.security.response.UserPostsResponse;
import com.birobi.security.service.UserPostsService;
import com.birobi.security.model.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/post/")
public class UserPostsController {
    @Autowired
    private UserPostsService userPostsService;

    @PostMapping ResponseEntity<List<UserPostsResponse>> updateUserPosts(@RequestBody UserPosts userPosts)
    {
        return ResponseEntity.ok(userPostsService.savePost(userPosts));
    }

    @PostMapping("/like")
    ResponseEntity<LikeResponse> likePost(@RequestBody Post post)
    {
        return ResponseEntity.ok(userPostsService.likePost(post));
    }
    @GetMapping("/like")
    ResponseEntity<List<LikeResponse>> getUserLikes()
    {
        return ResponseEntity.ok(userPostsService.getUserLikes());
    }


    @GetMapping ("/user/{id}")
    ResponseEntity<List<UserPostsResponse>> getUserPosts(@PathVariable("id") String email)
    {
        return ResponseEntity.ok(userPostsService.getUserPosts(email));
    }
    @GetMapping("/all-posts")
    ResponseEntity<List<UserPostsResponse>> getAllPosts()
    {
        return ResponseEntity.ok(userPostsService.getAllPosts());
    }
}
