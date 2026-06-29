package com.rian.task_manager.task;

import com.rian.task_manager.category.Category;
import com.rian.task_manager.category.CategoryRepository;
import com.rian.task_manager.exceptions.ResourceNotFoundException;
import com.rian.task_manager.task.dto.TaskRequest;
import com.rian.task_manager.task.dto.TaskResponse;
import com.rian.task_manager.task.enums.StatusLevel;
import com.rian.task_manager.user.User;
import com.rian.task_manager.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    public TaskResponse findById(Long id){
        Task task = findTaskById(id);
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
            Category category = findCategoriaById(taskRequest.idCategory());
            verificaSeCategoriaPertenceAoUser(user,category);
            task.setCategory(category);
        }
        taskRepository.save(task);
        return TaskResponse.fromEntity(task);
    }

    public void deleteById(Long id){
        Task task = findTaskById(id);
        taskRepository.deleteById(id);
    }


    public TaskResponse atualizar(Long id, TaskRequest taskRequest) {

        Task task = findTaskById(id);
        Category category = findCategoriaById(taskRequest.idCategory());
        verificaSeCategoriaPertenceAoUser(task.getUser(),category);

        task.setTitle(taskRequest.title());
        task.setDescription(taskRequest.description());
        task.setPriority(taskRequest.priority());
        task.setStatusLevel(taskRequest.statusLevel());
        task.setCategory(category);
        taskRepository.save(task);

        return TaskResponse.fromEntity(task);

    }

    public TaskResponse atualizaStatus(Long id, String statusLevel){
        Task task = findTaskById(id);
        try {
            task.setStatusLevel(StatusLevel.valueOf(statusLevel.toUpperCase()));
        }catch (IllegalArgumentException Exception){
            throw new IllegalArgumentException("Status inválido");
        }
        taskRepository.save(task);

        return TaskResponse.fromEntity(task);

    }

    public Task findTaskById(Long id){
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("task não encontrada!"));
        return task;
    }

    public Category findCategoriaById(Long id){
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("category não encontrado"));
        return category;
    }

    public void verificaSeCategoriaPertenceAoUser(User user,Category category){
        if (!user.getId().equals(category.getUser().getId())){
            throw new  IllegalArgumentException("id do user diferente!");
        }
    }
}
