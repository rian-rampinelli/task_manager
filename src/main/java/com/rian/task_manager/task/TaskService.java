package com.rian.task_manager.task;

import com.rian.task_manager.category.Category;
import com.rian.task_manager.category.CategoryRepository;
import com.rian.task_manager.task.dto.TaskRequest;
import com.rian.task_manager.task.dto.TaskResponse;
import com.rian.task_manager.user.User;
import com.rian.task_manager.user.UserRepository;
import com.rian.task_manager.user.dto.UserResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    public TaskService(TaskRepository taskRepository, UserRepository userRepository, CategoryRepository categoryRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
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

    public TaskResponse createTask(TaskRequest taskRequest){
        User user = userRepository.findById(taskRequest.idUser())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Category category = categoryRepository.findById(taskRequest.idCategory())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Task task = taskRequest.toEntity();
        task.setUser(user);
        task.setCategory(category);
        taskRepository.save(task);
        return TaskResponse.fromEntity(task);
    }
}
