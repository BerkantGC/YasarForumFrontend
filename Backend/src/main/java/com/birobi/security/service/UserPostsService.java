package com.birobi.security.service;

import com.birobi.security.model.post.Post;
import com.birobi.security.model.post.UserPosts;
import com.birobi.security.model.post.Likes;
import com.birobi.security.model.user.UserLikes;
import com.birobi.security.repository.*;
import com.birobi.security.response.LikeResponse;
import com.birobi.security.response.UserPostsResponse;
import com.birobi.security.model.user.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserPostsService {
    UserPostsRepository userPostsRepository;
    UserRepository userRepository;
    PostRepository postRepository;
    LikesRepository likesRepository;

    public UserPostsService(UserPostsRepository userPostsRepository, UserRepository userRepository, PostRepository postRepository, LikesRepository likesRepository, UserLikesRepository userLikesRepository) {
        this.userPostsRepository = userPostsRepository;
        this.userRepository = userRepository;
        this.postRepository = postRepository;
        this.likesRepository = likesRepository;
        this.userLikesRepository = userLikesRepository;
    }

    UserLikesRepository userLikesRepository;

    public List<UserPostsResponse> savePost(@RequestBody UserPosts userPosts)
    {
        Optional<User> user = userRepository.findByEmail(userPosts.getUser().getEmail());
        UserPosts userPostsToUpdate = userPostsRepository.findUserPostsByUser(user.get());

        List<UserPostsResponse> userPostsResponsesList = new ArrayList<>();
        List<Post> postList = new ArrayList<>();
        Post postToSave = new Post();
        Post post= userPosts.getPosts().get(0);

        if(userPostsToUpdate == null)
        {
            UserPosts userPostsToSave = new UserPosts();
            userPostsToSave.setUser(user.get());
            userPostsToSave.setPosts(new ArrayList<Post>());

            UserPosts saved = userPostsRepository.save(userPostsToSave);
            postToSave.setContent(post.getContent());
            postToSave.setCreatedAt(post.getCreatedAt());
            postToSave.setAnonymous(post.getAnonymous());
            postToSave.setNumOfLikes(0L);
            postToSave.setIsChecked(post.getIsChecked());
            postToSave.setActivated(post.getActivated());
            postToSave.setNumOfComments(0L);
            postToSave.setUserPost(saved);

            Post savedPost= postRepository.save(postToSave);
            postList.add(savedPost);
            saved.setPosts(postList);

            userPostsRepository.save(saved);

            UserPostsResponse response = new UserPostsResponse();

            response.setPost_id(savedPost.getId());
            response.setContent(savedPost.getContent());
            response.setCreatedAt(savedPost.getCreatedAt());
            response.setAnonymous(savedPost.getAnonymous());
            response.setLikes(savedPost.getNumOfLikes());
            response.setIsChecked(savedPost.getIsChecked());
            response.setActivated(savedPost.getActivated());
            response.setComments(savedPost.getNumOfComments());
            User tmpUser = savedPost.getUserPost().getUser();
            response.setUserName(tmpUser.getFirstName() + " " + tmpUser.getLastName());
            response.setUser_id(Long.valueOf(tmpUser.getId()));

            userPostsResponsesList.add(response);
        } else {
            postToSave.setContent(post.getContent());
            postToSave.setCreatedAt(post.getCreatedAt());
            postToSave.setAnonymous(post.getAnonymous());
            postToSave.setNumOfLikes(0L);
            postToSave.setIsChecked(post.getIsChecked());
            postToSave.setActivated(post.getActivated());
            postToSave.setNumOfComments(0L);
            postToSave.setUserPost(userPostsToUpdate);
            Post savedPost = postRepository.save(postToSave);

            userPostsToUpdate.getPosts().add(savedPost);
            userPostsRepository.save(userPostsToUpdate);

            userPostsToUpdate.getPosts().forEach(it ->{
                UserPostsResponse response = new UserPostsResponse();

                response.setPost_id(it.getId());
                response.setContent(it.getContent());
                response.setCreatedAt(it.getCreatedAt());
                response.setAnonymous(it.getAnonymous());
                response.setLikes(it.getNumOfLikes());
                response.setIsChecked(it.getIsChecked());
                response.setActivated(it.getActivated());
                response.setComments(it.getNumOfComments());
                User tmpUser = it.getUserPost().getUser();
                response.setUserName(tmpUser.getFirstName() + " " + tmpUser.getLastName());
                response.setUser_id(Long.valueOf(tmpUser.getId()));

                userPostsResponsesList.add(response);
            });
        }

        return userPostsResponsesList;
    }

    public List<UserPostsResponse> getUserPosts(@RequestBody String email){
        Optional<User> userFound = userRepository.findByEmail(email);

        UserPosts userPosts = userPostsRepository.findUserPostsByUser(userFound.get());

        List<UserPostsResponse> userPostsResponsesList = new ArrayList<>();

        userPosts.getPosts().forEach(it -> {
            UserPostsResponse response = new UserPostsResponse();

            response.setPost_id(it.getId());
            response.setContent(it.getContent());
            response.setCreatedAt(it.getCreatedAt());
            response.setAnonymous(it.getAnonymous());
            response.setLikes(it.getNumOfLikes());
            response.setIsChecked(it.getIsChecked());
            response.setActivated(it.getActivated());
            response.setComments(it.getNumOfComments());
            User tmpUser = it.getUserPost().getUser();
            response.setUserName(tmpUser.getFirstName() + " " + tmpUser.getLastName());
            response.setUser_id(Long.valueOf(tmpUser.getId()));

            userPostsResponsesList.add(response);
        });

        return userPostsResponsesList;
    }
    public List<UserPostsResponse> getAllPosts(){
        List<Post> postList = postRepository.findAll();

        List<UserPostsResponse> responsesList = new ArrayList<>();

        postList.forEach(it -> {
            UserPostsResponse response = new UserPostsResponse();

            response.setPost_id(it.getId());
            response.setContent(it.getContent());
            response.setCreatedAt(it.getCreatedAt());
            response.setAnonymous(it.getAnonymous());
            response.setLikes(it.getNumOfLikes());
            response.setIsChecked(it.getIsChecked());
            response.setActivated(it.getActivated());
            response.setComments(it.getNumOfComments());
            User tmpUser = it.getUserPost().getUser();
            response.setUserName(tmpUser.getFirstName() + " " + tmpUser.getLastName());
            response.setUser_id(Long.valueOf(tmpUser.getId()));

            responsesList.add(response);
        });

        return responsesList;
    }

    public LikeResponse likePost(Post post)
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();

        List<Likes> likesList = new ArrayList<>();
        Likes likes = new Likes();

        Post fetchedPost = postRepository.findPostById(post.getId());
        fetchedPost.setNumOfLikes(Long.valueOf(fetchedPost.getNumOfLikes()+1));
        postRepository.save(fetchedPost);

        UserLikes fetchedUserLikes = userLikesRepository.findUserLikesByUserEmail(user.getEmail());
        if(fetchedUserLikes == null)
        {
            UserLikes userLikes = new UserLikes();

            userLikes.setUser(user);
            userLikes.setLikes(new ArrayList<>());

            UserLikes savedUserLikes = userLikesRepository.save(userLikes);

            likes.setLikedPost(fetchedPost);
            likes.setUserLikes(savedUserLikes);
            Likes saved = likesRepository.save(likes);

            likesList.add(saved);
            savedUserLikes.setLikes(likesList);

            userLikesRepository.save(savedUserLikes);

            fetchedPost.setLikes(saved);
            saved.setLikedPost(fetchedPost);
            saved.setUserLikes(savedUserLikes);
            likesRepository.save(saved);
        } else {
            likes.setUserLikes(fetchedUserLikes);
            likes.setLikedPost(fetchedPost);

            Likes saved =likesRepository.save(likes);
            fetchedUserLikes.getLikes().add(saved);

            userLikesRepository.save(fetchedUserLikes);
        }

        LikeResponse likeResponse = new LikeResponse();
        likeResponse.setLikes(fetchedPost.getNumOfLikes());
        likeResponse.setUser_id(Long.valueOf(user.getId()));
        likeResponse.setPost_id(post.getId());

       return likeResponse;
    }
    public List<LikeResponse> getUserLikes() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        UserLikes userLikes = userLikesRepository.findUserLikesByUserEmail(currentUser.getEmail());

        List<LikeResponse> responseList = new ArrayList<>();

        userLikes.getLikes().forEach(it->{
            LikeResponse likeResponse = new LikeResponse();
            likeResponse.setLikes(it.getLikedPost().getNumOfLikes());
            likeResponse.setUser_id(Long.valueOf(currentUser.getId()));
            likeResponse.setPost_id(it.getLikedPost().getId());

            responseList.add(likeResponse);
        });


        return responseList;
    }

}
