package com.rian.task_manager.user.dto;

import com.rian.task_manager.user.User;

import java.time.LocalDateTime;
import java.util.List;

public record UserResponse(
        Long id,
        String name,
        String email,
        LocalDateTime createdAt,
        LocalDateTime updatedAt


) {
    public static UserResponse fromEntity(User user){
        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getCreatedAt(),
                user.getUpdatedAt()
        );
    }

}
