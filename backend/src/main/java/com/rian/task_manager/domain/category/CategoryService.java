package com.rian.task_manager.domain.category;

import com.rian.task_manager.domain.category.dto.CategoryRequest;
import com.rian.task_manager.domain.category.dto.CategoryResponse;
import com.rian.task_manager.exceptions.ResourceNotFoundException;
import com.rian.task_manager.exceptions.ValidationException;
import com.rian.task_manager.domain.task.dto.TaskResponse;
import com.rian.task_manager.domain.user.User;
import com.rian.task_manager.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    public CategoryResponse findById(Long id){
        Category category = findCategoriaById(id);
        return CategoryResponse.fromEntity(category);
    }

    public List<CategoryResponse> findAll(){
        return categoryRepository.findAll().stream()
                .map(category -> CategoryResponse.fromEntity(category)).toList();
    }

    public List<TaskResponse> findAllTasksByCategory(Long id){
        Category category = findCategoriaById(id);
        List<TaskResponse> tasks = category.getTasks().stream()
                .map(task ->TaskResponse.fromEntity(task)).
                toList();
        return tasks;
    }

    public CategoryResponse createCategory(CategoryRequest categoryRequest){
            User user = userRepository.findById(categoryRequest.idUser())
                    .orElseThrow(() ->new ResourceNotFoundException("user não encontrado"));

            if(categoryRepository.existsByName(categoryRequest.name())){
                throw new ValidationException("Ja existe categoria com esse nome!");
            }

            Category category = categoryRequest.toEntity();
            category.setUser(user);
            categoryRepository.save(category);
            return CategoryResponse.fromEntity(category);
        }


    public void deleteById(Long id){
        Category category = findCategoriaById(id);
        if(category.getName().equals("Todas")){
            throw new ValidationException("Não é possivel excluir!");
        }
        categoryRepository.deleteById(id);
    }

    public CategoryResponse atualizar(Long id, CategoryRequest categoryRequest) {
        Category category = findCategoriaById(id);
        category.setName(categoryRequest.name());
        category.setEmoji(categoryRequest.emoji());
        category.setDescription(categoryRequest.description());
        categoryRepository.save(category);
        return CategoryResponse.fromEntity(category);
    }


    public Category findCategoriaById(Long id){
        return categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("category não encontrado"));

    }
}
