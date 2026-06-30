package com.rian.task_manager.domain.auth.dto;

import com.rian.task_manager.domain.user.User;

public record LoginResponse(
        Long id,
        String name,
        String email


) {
    public static LoginResponse fromEntity(User user){
        return new LoginResponse(user.getId(),
                user.getName(),
                user.getEmail()
        );
    }
}
