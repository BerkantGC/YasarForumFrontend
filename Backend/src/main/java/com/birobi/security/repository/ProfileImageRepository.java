package com.birobi.security.repository;

import com.birobi.security.model.image.ProfileImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileImageRepository extends JpaRepository<ProfileImage, Long> {
    ProfileImage findByUserEmail(String email);
}
