package com.rian.task_manager.task.dto;

import com.rian.task_manager.category.Category;
import com.rian.task_manager.category.dto.CategoryResponse;
import com.rian.task_manager.task.Task;
import com.rian.task_manager.task.enums.Priority;
import com.rian.task_manager.task.enums.StatusLevel;
import com.rian.task_manager.user.User;

import java.time.LocalDateTime;

public record TaskResponse(
        Long id,
        String name,
        String description,
        Priority priority,
        StatusLevel statusLevel,
        User user,
        Category category,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
){
    public static TaskResponse fromEntity(Task task){
        return new TaskResponse(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getPriority(),
                task.getStatusLevel(),
                task.getUser(),
                task.getCategory(),
                task.getCreatedAt(),
                task.getUpdatedAt()
        );
        
    }
}
