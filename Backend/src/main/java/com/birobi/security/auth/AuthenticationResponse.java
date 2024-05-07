package com.birobi.security.auth;

import com.birobi.security.response.UserPostsResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticationResponse {
    private Long id;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private UserPostsResponse userPosts;
    private String token;
}
