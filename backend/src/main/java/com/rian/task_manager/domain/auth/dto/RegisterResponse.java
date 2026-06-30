package com.rian.task_manager.domain.auth.dto;

import com.rian.task_manager.domain.user.User;

import java.time.LocalDateTime;

public record RegisterResponse(
        Long id,
        String name,
        String email


) {
    public static RegisterResponse fromEntity(User user){
        return new RegisterResponse(
                user.getId(),
                user.getName(),
                user.getEmail()
        );
    }
}
