package com.rian.task_manager.task;

import com.rian.task_manager.task.dto.TaskRequest;
import com.rian.task_manager.task.dto.TaskResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{id}")
    public TaskResponse findById(@PathVariable Long id){
        return taskService.findById(id);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public List<TaskResponse> findAll(){
        return taskService.findAll();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public TaskResponse createTask(@RequestBody TaskRequest taskRequest){
        return taskService.createTask(taskRequest);
    }


    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/{id}")
    public void deletarTask(@PathVariable Long id){
        taskService.deleteById(id);
    }
}
