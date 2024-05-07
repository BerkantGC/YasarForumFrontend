package com.birobi.security.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserPostsResponse {
    private Long post_id;
    private Long user_id;
    private String userName;
    private String content;
    private Date createdAt;
    private Long likes;
    private Long comments;
    private Boolean anonymous;
    private Boolean activated;
    private Boolean isChecked;
}
