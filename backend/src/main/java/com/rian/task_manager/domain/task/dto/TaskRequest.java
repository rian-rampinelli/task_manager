package com.rian.task_manager.domain.task.dto;

import com.rian.task_manager.domain.task.Task;
import com.rian.task_manager.domain.task.enums.Priority;
import com.rian.task_manager.domain.task.enums.StatusLevel;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;


public record TaskRequest (
        @NotNull
        String title,
        String description,
        @NotNull
        Priority priority,
        @NotNull
        StatusLevel statusLevel,
        Long idCategory

){
    public Task toEntity(){
        Task task = new Task();
        task.setTitle(title);
        task.setDescription(description);
        task.setPriority(priority);
        task.setStatusLevel(statusLevel);
        return task;
    }
}
