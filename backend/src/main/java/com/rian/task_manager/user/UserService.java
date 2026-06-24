package com.rian.task_manager.user;


import com.rian.task_manager.exceptions.EmailAlredyExistsException;
import com.rian.task_manager.task.dto.TaskResponse;
import com.rian.task_manager.user.dto.UserRequest;
import com.rian.task_manager.user.dto.UserResponse;
import com.rian.task_manager.exceptions.ResourceNotFoundException;
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
                .orElseThrow(() -> new ResourceNotFoundException("User não encontrado"));
        return UserResponse.fromEntity(user);
    }

    public List<UserResponse> findAll(){
        return userRepository.findAll().stream()
                .map(usuario -> UserResponse.fromEntity(usuario)).toList();
    }

    public List<TaskResponse> findAllTasksByUser(Long id){
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User não encontrado"));

        return user.getTasks().stream()
                .map(task -> TaskResponse.fromEntity(task))
                .toList();
    }

    public UserResponse create(UserRequest userRequest){
        if(userRepository.existsByEmail(userRequest.email())){
            throw new EmailAlredyExistsException("Email já cadastrado");
        }
        User user = userRequest.toEntity();
        userRepository.save(user);
        return UserResponse.fromEntity(user);

    }

    public void deleteById(Long id){
        userRepository.deleteById(id);
    }


    public UserResponse atualizar(Long id,UserRequest usuarioRequest) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User não encontrado"));
        user.setName(usuarioRequest.name());
        user.setEmail(usuarioRequest.email());
        user.setPassWord(usuarioRequest.passWord());
        userRepository.save(user);
        return UserResponse.fromEntity(user);
    }

}
