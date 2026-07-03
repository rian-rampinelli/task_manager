package com.rian.task_manager.domain.category;

import com.rian.task_manager.domain.auth.SecurityService;
import com.rian.task_manager.domain.category.dto.CategoryRequest;
import com.rian.task_manager.domain.category.dto.CategoryResponse;
import com.rian.task_manager.exceptions.ResourceNotFoundException;
import com.rian.task_manager.exceptions.ValidationException;
import com.rian.task_manager.domain.task.dto.TaskResponse;
import com.rian.task_manager.domain.user.User;
import com.rian.task_manager.domain.user.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final SecurityService securityService;



    public CategoryResponse findById(Long id){
        User user = securityService.getAuthenticatedUser();

        Category category = categoryRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new AccessDeniedException("Não autorizado"));

        return CategoryResponse.fromEntity(category);
    }

    public List<CategoryResponse> findAllCategorysByUser(){
        User userLogado = securityService.getAuthenticatedUser();
        return userLogado.getCategorys().stream()
                .map(category -> CategoryResponse.fromEntity(category))
                .toList();
    }

    public List<TaskResponse> findAllTasksByCategory(Long id){
        User user = securityService.getAuthenticatedUser();

        Category category = categoryRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new AccessDeniedException("Não autorizado"));

        List<TaskResponse> tasks = category.getTasks().stream()
                .map(task ->TaskResponse.fromEntity(task)).
                toList();
        return tasks;
    }



    public CategoryResponse createCategory(CategoryRequest request) {
        User user = securityService.getAuthenticatedUser();
        if (categoryRepository.existsByNameAndUser(request.name(), user)) {
            throw new ValidationException("Já existe uma categoria com esse nome.");
        }
        Category category = request.toEntity();
        category.setUser(user);
        categoryRepository.save(category);
        return CategoryResponse.fromEntity(category);
    }



    public void deleteById(Long id){
        User user = securityService.getAuthenticatedUser();
        Category category = categoryRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new AccessDeniedException("Não autorizado"));
        categoryRepository.delete(category);
    }


    public CategoryResponse atualizar(Long id, CategoryRequest categoryRequest) {
        User userLogado = securityService.getAuthenticatedUser();
        Category category = categoryRepository.findByIdAndUser(id, userLogado)
                .orElseThrow(() -> new AccessDeniedException("Não autorizado"));
        category.setName(categoryRequest.name());
        category.setEmoji(categoryRequest.emoji());
        category.setDescription(categoryRequest.description());
        category.setUser(userLogado);
        categoryRepository.save(category);
        return CategoryResponse.fromEntity(category);
    }


    //helpers
    public Category findCategoriaById(Long id){
        return categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("category não encontrado"));

    }


}
