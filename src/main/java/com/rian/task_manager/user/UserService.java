package com.rian.task_manager.user;


import org.springframework.stereotype.Service;

@Service
public class UserService {


    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void salvar(User user) {
        userRepository.save(user);
    }

}
