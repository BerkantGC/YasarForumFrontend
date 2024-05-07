package com.birobi.security.controller;

import com.birobi.security.model.comment.Comment;
import com.birobi.security.model.comment.PostComments;
import com.birobi.security.response.CommentResponse;
import com.birobi.security.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/comment/")
public class CommentController {
    @Autowired
    private CommentService commentService;

    @PostMapping
    public ResponseEntity<CommentResponse> saveComments(@RequestBody PostComments postComments)
    {
        return ResponseEntity.ok(commentService.saveComment(postComments));
    }
    @GetMapping("/{post}")
    public ResponseEntity<List<CommentResponse>> getPostComments(@PathVariable("post") Long id)
    {
        return ResponseEntity.ok(commentService.getPostComments(id));
    }
}
