package com.rian.task_manager.domain.task;

import com.rian.task_manager.domain.category.dto.CategoryResponse;
import com.rian.task_manager.domain.task.dto.StatusLevelDto;
import com.rian.task_manager.domain.task.dto.TaskRequest;
import com.rian.task_manager.domain.task.dto.TaskResponse;
import com.rian.task_manager.domain.user.User;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/tasks")
public class TaskController {

    private final TaskService taskService;

    @PreAuthorize("#id == authentication.principal.id")
    @GetMapping("/{id}")
    public ResponseEntity<TaskResponse> findById(@PathVariable Long id){
        return ResponseEntity.ok(taskService.findById(id));
    }

    @Transactional
    @GetMapping
    public ResponseEntity<List<TaskResponse>> findTaskByUser()  {
        return ResponseEntity.ok(taskService.findAllTasksByUser());
    }

    @PostMapping
    public ResponseEntity<TaskResponse> createTask(@Valid @RequestBody TaskRequest taskRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(taskService.createTask(taskRequest));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarTask(@PathVariable Long id){
        taskService.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskResponse> atualizarTask(@PathVariable Long id,@Valid @RequestBody TaskRequest taskRequest){
        return ResponseEntity.ok(taskService.atualizar(id,taskRequest));
    }

    @PatchMapping("/{id}")
    public  ResponseEntity<TaskResponse> atualizarStatus(@PathVariable Long id,@Valid @RequestBody StatusLevelDto statusLevelDto){
        return ResponseEntity.ok(taskService.atualizaStatus(id, statusLevelDto.statusLevel()));
    }
}
