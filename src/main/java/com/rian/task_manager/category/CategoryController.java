package com.rian.task_manager.category;

import com.rian.task_manager.category.dto.CategoryRequest;
import com.rian.task_manager.category.dto.CategoryResponse;
import com.rian.task_manager.task.dto.TaskResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categorys")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public CategoryResponse createCategory(@RequestBody CategoryRequest categoryRequest){
        return categoryService.createCategory(categoryRequest);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{id}")
    public CategoryResponse findById(@PathVariable Long id){
        return categoryService.findById(id);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public List<CategoryResponse> findAll(){
        return categoryService.findAll();
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id){
        categoryService.deleteById(id);
    }

    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/{id}")
    public CategoryResponse atualizarCategoria(@PathVariable Long id,@RequestBody CategoryRequest categoryRequest){
        return categoryService.atualizar(id,categoryRequest);
    }

}
