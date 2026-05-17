package com.rian.task_manager.task;

import com.rian.task_manager.category.Category;
import com.rian.task_manager.category.CategoryRepository;
import com.rian.task_manager.exceptions.ResourceNotFoundException;
import com.rian.task_manager.task.dto.TaskRequest;
import com.rian.task_manager.task.dto.TaskResponse;
import com.rian.task_manager.user.User;
import com.rian.task_manager.user.UserRepository;
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
                .orElseThrow(() -> new ResourceNotFoundException("Task não encontrado"));
        return TaskResponse.fromEntity(task);
    }

    public List<TaskResponse> findAll(){
        return taskRepository.findAll().stream()
                .map(task -> TaskResponse.fromEntity(task)).toList();
    }

    public TaskResponse createTask(TaskRequest taskRequest){
        User user = userRepository.findById(taskRequest.idUser())
                .orElseThrow(() -> new ResourceNotFoundException("User não encontrado"));

        Task task = taskRequest.toEntity();
        task.setUser(user);

        if (taskRequest.idCategory() != null){
            Category category = categoryRepository.findById(taskRequest.idCategory())
                    .orElseThrow(() -> new ResourceNotFoundException("category não encontrado"));
            task.setCategory(category);
            if (!user.getId().equals(category.getUser().getId())){
                throw new ResourceNotFoundException("id do user diferente!");
            }
        }



        taskRepository.save(task);
        return TaskResponse.fromEntity(task);
    }

    public void deleteById(Long id){
        taskRepository.deleteById(id);
    }

    public TaskResponse atualizar(Long id, TaskRequest taskRequest) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task não encontrado"));

        Category category = categoryRepository.findById(taskRequest.idCategory())
                .orElseThrow(() -> new ResourceNotFoundException("categoria não encontrado"));
        if (!task.getUser().getId().equals(category.getUser().getId())){
            throw new ResourceNotFoundException("id do user diferente!");
        }


        task.setTitle(taskRequest.title());
        task.setDescription(taskRequest.description());
        task.setPriority(taskRequest.priority());
        task.setStatusLevel(taskRequest.statusLevel());
        task.setCategory(category);
        taskRepository.save(task);
        return TaskResponse.fromEntity(task);

    }
}
