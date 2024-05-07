package com.birobi.security.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserNotesResponse {
    private Long note_id;
    private Long user_id;
    private String userName;
    private String title;
    private String description;
    private Date date;
    private Boolean isPublic;
}
