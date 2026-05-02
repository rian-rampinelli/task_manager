package com.rian.task_manager.category.dto;

import com.rian.task_manager.category.Category;
import com.rian.task_manager.user.User;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record CategoryResponse(
        Long id,
        String name,
        String emoji,
        String description,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        User user
) {
    public static CategoryResponse fromEntity(Category category) {
        return new CategoryResponse(
                category.getId(),
                category.getName(),
                category.getEmoji(),
                category.getDescription(),
                category.getCreatedAt(),
                category.getUpdatedAt(),
                category.getUser()
        );
    }
}
