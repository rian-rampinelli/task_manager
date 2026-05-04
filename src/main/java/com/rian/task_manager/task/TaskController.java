package com.rian.task_manager.task;

import com.rian.task_manager.task.dto.TaskResponse;
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
    public TaskResponse findById(@PathVariable Long id){
        return taskService.findById(id);
    }

    @GetMapping
    public List<TaskResponse> findAll(){
        return taskService.findAll();
    }
}
