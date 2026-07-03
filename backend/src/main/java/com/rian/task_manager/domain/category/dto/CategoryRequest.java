package com.rian.task_manager.domain.category.dto;

import com.rian.task_manager.domain.category.Category;
import jakarta.validation.constraints.NotNull;

public record CategoryRequest(
        @NotNull
        String name,
        @NotNull
        String emoji,
        String description
){
    public Category toEntity(){
        Category category = new Category();
        category.setName(name);
        category.setEmoji(emoji);
        category.setDescription(description);
        return category;
    }
}
