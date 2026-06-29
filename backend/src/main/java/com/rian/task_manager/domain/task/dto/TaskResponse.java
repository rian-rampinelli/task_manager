package com.rian.task_manager.domain.task.dto;

import com.rian.task_manager.domain.category.dto.CategoryTask;
import com.rian.task_manager.domain.task.Task;
import com.rian.task_manager.domain.task.enums.Priority;
import com.rian.task_manager.domain.task.enums.StatusLevel;


import java.time.LocalDateTime;

public record TaskResponse(
        Long id,
        String title,
        String description,
        Priority priority,
        StatusLevel statusLevel,
        Long userId,
        CategoryTask category,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
){
    public static TaskResponse fromEntity(Task task){
        CategoryTask category = null;
        if(task.getCategory() != null){
            category = new CategoryTask(
                    task.getCategory().getId(),
                    task.getCategory().getName()
            );
        }

        return new TaskResponse(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getPriority(),
                task.getStatusLevel(),
                task.getUser().getId(),
                category,
                task.getCreatedAt(),
                task.getUpdatedAt()
        );
        
    }
}
