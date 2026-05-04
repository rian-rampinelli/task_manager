package com.rian.task_manager.task;

import com.rian.task_manager.task.dto.TaskResponse;
import com.rian.task_manager.user.User;
import com.rian.task_manager.user.dto.UserResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public TaskResponse findById(Long id){
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task não encontrado"));
        return TaskResponse.fromEntity(task);
    }

    public List<TaskResponse> findAll(){
        return taskRepository.findAll().stream()
                .map(task -> TaskResponse.fromEntity(task)).toList();
    }
}
