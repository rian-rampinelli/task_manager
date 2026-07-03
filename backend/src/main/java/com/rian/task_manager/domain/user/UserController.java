package com.rian.task_manager.domain.user;

import com.rian.task_manager.domain.category.dto.CategoryResponse;
import com.rian.task_manager.domain.task.dto.TaskResponse;
import com.rian.task_manager.domain.user.dto.UserRequest;
import com.rian.task_manager.domain.user.dto.UserResponse;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<UserResponse>> findAll(){
        return ResponseEntity.ok(userService.findAll());
    }


    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> findById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.findById(id));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id){
        userService.deleteById(id);
        return ResponseEntity.ok().build();
    }


    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> update(@PathVariable Long id,@Valid @RequestBody UserRequest userRequest){
        UserResponse response = userService.atualizar(id, userRequest);
        return ResponseEntity.ok(response);
    }


}
