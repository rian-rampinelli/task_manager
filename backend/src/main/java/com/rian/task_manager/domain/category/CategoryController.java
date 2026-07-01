package com.rian.task_manager.domain.category;

import com.rian.task_manager.domain.category.dto.CategoryRequest;
import com.rian.task_manager.domain.category.dto.CategoryResponse;
import com.rian.task_manager.domain.task.dto.TaskResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/categorys")
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping
    public ResponseEntity<CategoryResponse> createCategory(@RequestBody CategoryRequest categoryRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(categoryService.createCategory(categoryRequest));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryResponse> findById(@PathVariable Long id){
        return ResponseEntity.ok(categoryService.findById(id));
    }

    @Transactional
    @GetMapping("/{id}/tasks")
    public ResponseEntity<List<TaskResponse>> findAllTasksByCategory(@PathVariable Long id){
        return ResponseEntity.ok(categoryService.findAllTasksByCategory(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id){
        categoryService.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryResponse> atualizarCategoria(@PathVariable Long id,@RequestBody CategoryRequest categoryRequest){
        return ResponseEntity.ok(categoryService.atualizar(id,categoryRequest));
    }

}
