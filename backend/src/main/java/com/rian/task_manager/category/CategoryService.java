package com.rian.task_manager.category;

import com.rian.task_manager.category.dto.CategoryRequest;
import com.rian.task_manager.category.dto.CategoryResponse;
import com.rian.task_manager.exceptions.ResourceNotFoundException;
import com.rian.task_manager.task.Task;
import com.rian.task_manager.task.TaskRepository;
import com.rian.task_manager.task.dto.TaskResponse;
import com.rian.task_manager.user.User;
import com.rian.task_manager.user.UserRepository;
import com.rian.task_manager.user.dto.UserRequest;
import com.rian.task_manager.user.dto.UserResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final TaskRepository taskRepository;

    public CategoryService(CategoryRepository categoryRepository, UserRepository userRepository, TaskRepository taskRepository) {
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
        this.taskRepository = taskRepository;
    }

    public CategoryResponse findById(Long id){
         Category category = categoryRepository.findById(id)
                .orElseThrow(() ->new ResourceNotFoundException("category não encontrado"));
         return CategoryResponse.fromEntity(category);
    }

    public List<CategoryResponse> findAll(){
        return categoryRepository.findAll().stream()
                .map(category -> CategoryResponse.fromEntity(category)).toList();
    }

    public List<TaskResponse> findAllTasksByCategory(Long id){
        Category category = categoryRepository.findById(id)
                .orElseThrow(() ->new ResourceNotFoundException("category não encontrado"));

        List<TaskResponse> tasks = category.getTasks().stream()
                .map(task ->TaskResponse.fromEntity(task)).
                toList();
        return tasks;
    }

    public CategoryResponse createCategory(CategoryRequest categoryRequest){
            User user = userRepository.findById(categoryRequest.idUser())
                    .orElseThrow(() ->new ResourceNotFoundException("user não encontrado"));

            Category category = categoryRequest.toEntity();
            category.setUser(user);
            categoryRepository.save(category);
            return CategoryResponse.fromEntity(category);
        }


    public void deleteById(Long id){
        categoryRepository.deleteById(id);
    }

    public CategoryResponse atualizar(Long id, CategoryRequest categoryRequest) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("category não encontrado"));
        category.setName(categoryRequest.name());
        category.setEmoji(categoryRequest.emoji());
        category.setDescription(categoryRequest.description());
        categoryRepository.save(category);
        return CategoryResponse.fromEntity(category);
    }
}
