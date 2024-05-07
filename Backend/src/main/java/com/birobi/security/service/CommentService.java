package com.birobi.security.service;

import com.birobi.security.model.comment.Comment;
import com.birobi.security.model.comment.PostComments;
import com.birobi.security.model.post.Post;
import com.birobi.security.model.user.User;
import com.birobi.security.repository.CommentRepository;
import com.birobi.security.repository.PostCommentsRepository;
import com.birobi.security.repository.PostRepository;
import com.birobi.security.repository.UserRepository;
import com.birobi.security.response.CommentResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    private CommentRepository commentRepository;
    private UserRepository userRepository;
    private PostRepository postRepository;
    private PostCommentsRepository postCommentsRepository;

    public CommentService(CommentRepository commentRepository, UserRepository userRepository, PostRepository postRepository, PostCommentsRepository postCommentsRepository) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.postRepository = postRepository;
        this.postCommentsRepository = postCommentsRepository;
    }
    public CommentResponse saveComment(@RequestBody PostComments postComments)
    {
        List<Comment> commentList = new ArrayList<>();
        Comment comment = postComments.getComments().get(0);
        Comment commentToSave = new Comment();
        CommentResponse commentResponse = new CommentResponse();
        Comment saved;

        Optional<User> user = userRepository.findByEmail(comment.getEmail());
        Post post = postRepository.findPostById(postComments.getPost().getId());
        post.setNumOfComments(Long.valueOf(post.getNumOfComments() + 1));
        postRepository.save(post);
        PostComments checkedPostComments = postCommentsRepository.findByPostId(postComments.getPost().getId());

        if(checkedPostComments == null)
        {
            PostComments postCommentsToSave = new PostComments();
            postCommentsToSave.setPost(post);

            commentToSave.setContent(comment.getContent());
            commentToSave.setEmail(comment.getEmail());

            postCommentsToSave.setComments(new ArrayList<Comment>());
            PostComments savedPostComment = postCommentsRepository.save(postCommentsToSave);

            commentToSave.setPostComments(savedPostComment);
            saved = commentRepository.save(commentToSave);
            commentList.add(saved);

            savedPostComment.setComments(commentList);
            postCommentsRepository.save(savedPostComment);
        }else{
            commentToSave.setContent(comment.getContent());
            commentToSave.setEmail(comment.getEmail());
            commentToSave.setPostComments(checkedPostComments);

            saved = commentRepository.save(commentToSave);
            commentList.addAll(checkedPostComments.getComments());
            commentList.add(saved);

            checkedPostComments.setComments(commentList);

            postCommentsRepository.save(checkedPostComments);
        }

        commentResponse.setComment_id(saved.getId());
        commentResponse.setPost_id(post.getId());
        commentResponse.setUserEmail(user.get().getEmail());
        commentResponse.setContent(saved.getContent());


        return commentResponse;
    }

    public List<CommentResponse> getPostComments(@RequestBody Long postId)
    {
        PostComments postComments = postCommentsRepository.findByPostId(Long.valueOf(postId));

        List<CommentResponse> commentResponses = new ArrayList<>();
        postComments.getComments().forEach(it-> {
            Optional<User> user = userRepository.findByEmail(it.getEmail());
            commentResponses.add(CommentResponse.builder()
                    .comment_id(it.getId())
                    .post_id(postId)
                    .content(it.getContent())
                    .userName(user.get().getFirstName() + " " + user.get().getLastName())
                    .userEmail(it.getEmail())
                    .build());
        });

        return commentResponses;
    }
}
