package com.rian.task_manager.user;


import com.rian.task_manager.user.dto.UserRequest;
import com.rian.task_manager.user.dto.UserResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {


    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void salvar(User user) {
        userRepository.save(user);
    }

    public UserResponse findById(Long id){
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario não encontrado"));
        return UserResponse.fromEntity(user);
    }

    public List<UserResponse> findAll(){
        return userRepository.findAll().stream()
                .map(usuario -> UserResponse.fromEntity(usuario)).toList();
    }

    public UserResponse create(UserRequest userRequest){
        User user = userRequest.toEntity();
        userRepository.save(user);
        return UserResponse.fromEntity(user);

    }

    public void deleteAllUser(){
        userRepository.deleteAll();
    }

    public void deleteById(Long id){
        userRepository.deleteById(id);
    }

}
