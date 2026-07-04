package com.rian.task_manager.domain.task;

import com.rian.task_manager.domain.auth.SecurityService;
import com.rian.task_manager.domain.category.Category;
import com.rian.task_manager.domain.category.CategoryRepository;
import com.rian.task_manager.exceptions.EmailAlredyExistsException;
import com.rian.task_manager.exceptions.ResourceNotFoundException;
import com.rian.task_manager.domain.task.dto.TaskRequest;
import com.rian.task_manager.domain.task.dto.TaskResponse;
import com.rian.task_manager.domain.task.enums.StatusLevel;
import com.rian.task_manager.domain.user.User;
import com.rian.task_manager.domain.user.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final CategoryRepository categoryRepository;
    private final SecurityService securityService;

    public TaskResponse findById(Long id){
        Task task = TaskPertenceAoUser(id);
        return TaskResponse.fromEntity(task);
    }

    public List<TaskResponse> findAllTasksByUser(){
        User userLogado = securityService.getAuthenticatedUser();
        return userLogado.getTasks().stream()
                .map(task -> TaskResponse.fromEntity(task))
                .toList();
    }

    public TaskResponse createTask(TaskRequest taskRequest){
        User user = securityService.getAuthenticatedUser();
        Task task = taskRequest.toEntity();
        task.setUser(user);
        if(taskRepository.existsByTitleAndUser(taskRequest.title(),user)){
            throw new EmailAlredyExistsException("titulo ja existe!");
        }

        if (taskRequest.idCategory() != null){
            Category category = findCategoriaById(taskRequest.idCategory());
            verificaSeCategoriaPertenceAoUser(user,category);
            task.setCategory(category);
        }
        taskRepository.save(task);
        return TaskResponse.fromEntity(task);
    }

    public void deleteById(Long id){
        Task task = TaskPertenceAoUser(id);
        taskRepository.delete(task);
    }


    public TaskResponse atualizar(Long id, TaskRequest taskRequest) {
        Task task = TaskPertenceAoUser(id);
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
        Task task = TaskPertenceAoUser(id);
        try {
            task.setStatusLevel(StatusLevel.valueOf(statusLevel.toUpperCase()));
        }catch (IllegalArgumentException Exception){
            throw new IllegalArgumentException("Status inválido");
        }
        taskRepository.save(task);

        return TaskResponse.fromEntity(task);

    }


    //helpers
    public Category findCategoriaById(Long id){
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("category não encontrado"));
        return category;
    }

    public void verificaSeCategoriaPertenceAoUser(User user,Category category){
        if (!user.getId().equals(category.getUser().getId())){
            throw new AccessDeniedException("id do user diferente!");
        }
    }

    public Task TaskPertenceAoUser(Long idTask){
        User userLogado = securityService.getAuthenticatedUser();
        Task task = taskRepository.findByIdAndUser(idTask,userLogado)
                .orElseThrow(() -> new AccessDeniedException("Não autorizado"));
        return task;
    }
}
