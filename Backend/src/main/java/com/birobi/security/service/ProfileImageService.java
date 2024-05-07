package com.birobi.security.service;

import com.birobi.security.model.image.ImageUtil;
import com.birobi.security.model.image.ProfileImage;
import com.birobi.security.repository.ProfileImageRepository;
import com.birobi.security.repository.UserRepository;
import com.birobi.security.model.user.User;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
public class ProfileImageService {
    @Autowired
    private ProfileImageRepository imageDataRepository;
    private UserRepository userRepository;

    public String uploadImage(MultipartFile file) throws IOException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();

        ProfileImage dbImage = (imageDataRepository.findByUserEmail(user.getEmail()));

        if(dbImage == null)
        {
            imageDataRepository.save(ProfileImage.builder()
                    .name(file.getOriginalFilename())
                    .type(file.getContentType())
                    .user(user)
                    .imageData(ImageUtil.compressImage(file.getBytes())).build());
        }else {
            imageDataRepository.save(ProfileImage.builder().
                    id(dbImage.getId())
                    .name(file.getName())
                    .type(file.getContentType())
                    .user(dbImage.getUser())
                    .imageData(ImageUtil.compressImage(file.getBytes()))
                    .build());
        }

        return ("Image uploaded successfully: " +
                file.getOriginalFilename());
    }

    @Transactional
    public ProfileImage getInfoByImageByUser(String email) {
        Optional<ProfileImage> dbImage = Optional.ofNullable(imageDataRepository.findByUserEmail(email));

        return ProfileImage.builder()
                .name(dbImage.get().getName())
                .type(dbImage.get().getType())
                .imageData(ImageUtil.decompressImage(dbImage.get().getImageData())).build();

    }

    @Transactional
    public byte[] getImage(String email) {
        Optional<ProfileImage> dbImage = Optional.ofNullable(imageDataRepository.findByUserEmail(email));
        byte[] image = ImageUtil.decompressImage(dbImage.get().getImageData());
        return image;
    }
}
