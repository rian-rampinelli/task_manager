package com.rian.task_manager.task.dto;

import com.rian.task_manager.task.Task;
import com.rian.task_manager.task.enums.Priority;
import com.rian.task_manager.task.enums.StatusLevel;


public record TaskRequest (
        String title,
        String description,
        Priority priority,
        StatusLevel statusLevel

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
