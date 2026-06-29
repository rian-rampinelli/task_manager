package com.rian.task_manager.domain.category.dto;

import com.rian.task_manager.domain.category.Category;

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
