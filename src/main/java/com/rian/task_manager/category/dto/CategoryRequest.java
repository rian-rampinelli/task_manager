package com.rian.task_manager.category.dto;

import com.rian.task_manager.category.Category;

public record CategoryRequest(
        String name,
        String emoji,
        String description,
        Long idUser
){
    public Category toEntity(){
        Category category = new Category();
        category.setName(name);
        category.setEmoji(emoji);
        category.setDescription(description);
        return category;
    }
}
