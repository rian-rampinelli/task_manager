package com.rian.task_manager.task;

import com.rian.task_manager.task.dto.StatusLevelDto;
import com.rian.task_manager.task.dto.TaskRequest;
import com.rian.task_manager.task.dto.TaskResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskResponse> findById(@PathVariable Long id){
        return ResponseEntity.ok(taskService.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<TaskResponse>> findAll(){
        return ResponseEntity.ok(taskService.findAll());
    }

    @PostMapping
    public ResponseEntity<TaskResponse> createTask(@RequestBody TaskRequest taskRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(taskService.createTask(taskRequest));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarTask(@PathVariable Long id){
        taskService.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskResponse> atualizarTask(@PathVariable Long id, @RequestBody TaskRequest taskRequest){
        return ResponseEntity.ok(taskService.atualizar(id,taskRequest));
    }

    @PatchMapping("/{id}")
    public  ResponseEntity<TaskResponse> atualizarStatus(@PathVariable Long id,@RequestBody StatusLevelDto statusLevelDto){
        return ResponseEntity.ok(taskService.atualizaStatus(id, statusLevelDto.statusLevel()));
    }
}
