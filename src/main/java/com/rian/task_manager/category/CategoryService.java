package com.rian.task_manager.category;

import com.rian.task_manager.category.dto.CategoryRequest;
import com.rian.task_manager.category.dto.CategoryResponse;
import com.rian.task_manager.task.Task;
import com.rian.task_manager.task.dto.TaskResponse;
import com.rian.task_manager.user.User;
import com.rian.task_manager.user.UserRepository;
import com.rian.task_manager.user.dto.UserResponse;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    public CategoryService(CategoryRepository categoryRepository, UserRepository userRepository) {
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
    }

    public CategoryResponse findById(Long id){
         Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category não encontrado"));
         return CategoryResponse.fromEntity(category);
    }

    public List<CategoryResponse> findAll(){
        return categoryRepository.findAll().stream()
                .map(category -> CategoryResponse.fromEntity(category)).toList();
    }

    public CategoryResponse createCategory(CategoryRequest categoryRequest){
            User user = userRepository.findById(categoryRequest.idUser())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Category category = categoryRequest.toEntity();
            category.setUser(user);
            categoryRepository.save(category);
            return CategoryResponse.fromEntity(category);
        }
}
