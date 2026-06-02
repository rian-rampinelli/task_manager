package com.rian.task_manager.task.dto;


import com.rian.task_manager.task.Task;
import com.rian.task_manager.task.enums.Priority;
import com.rian.task_manager.task.enums.StatusLevel;
import com.rian.task_manager.category.dto.CategoryResponse


import java.time.LocalDateTime;

public record TaskResponse(
        Long id,
        String title,
        String description,
        Priority priority,
        StatusLevel statusLevel,
        Long userId,
        CategoryResponse category,
        String categoryName,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
){
    public static TaskResponse fromEntity(Task task){
        CategoryResponse category = null;
        if(task.getCategory() != null){
            category = new CategoryResponse(
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
