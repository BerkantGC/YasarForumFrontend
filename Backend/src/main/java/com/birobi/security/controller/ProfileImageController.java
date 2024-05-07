package com.birobi.security.controller;

import com.birobi.security.model.image.ProfileImage;
import com.birobi.security.service.ProfileImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/image")
public class ProfileImageController {
    @Autowired
    private ProfileImageService imageDataService;

    @PostMapping
    public ResponseEntity<?> uploadImage(@RequestParam("image") MultipartFile file) throws IOException {
        String response= imageDataService.uploadImage(file);

        return ResponseEntity.status(HttpStatus.OK)
                .body(response);
    }

    @GetMapping("/info/{user}")
    public ResponseEntity<?>  getImageInfoByName(@PathVariable("user") String email){
        ProfileImage image = imageDataService.getInfoByImageByUser(email);

        return ResponseEntity.status(HttpStatus.OK)
                .body(image);
    }

    @GetMapping("/{user}")
    public ResponseEntity<?>  getImageByName(@PathVariable("user") String email){
        byte[] image = imageDataService.getImage(email);

        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(image);
    }
}
