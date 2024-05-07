package com.birobi.security.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommentResponse {
    private Long comment_id;
    private Long post_id;
    private String content;
    private String userEmail;
    private String userName;
}
