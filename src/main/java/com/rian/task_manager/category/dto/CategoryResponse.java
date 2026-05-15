package com.rian.task_manager.category.dto;

import com.rian.task_manager.category.Category;


import java.time.LocalDateTime;

public record CategoryResponse(
        Long id,
        String name,
        String emoji,
        String description,
        Long userId,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    public static CategoryResponse fromEntity(Category category) {
        return new CategoryResponse(
                category.getId(),
                category.getName(),
                category.getEmoji(),
                category.getDescription(),
                category.getUser().getId(),
                category.getCreatedAt(),
                category.getUpdatedAt()
        );
    }
}
