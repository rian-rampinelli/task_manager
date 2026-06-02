package com.rian.task_manager.category.dto;

import com.rian.task_manager.category.Category;


import java.time.LocalDateTime;

public record CategoryTask(
        Long id,
        String name
) {
    public static CategoryTask fromEntity(Category category) {
        return new CategoryTask(
                category.getId(),
                category.getName()

        );
    }
}
