package com.rian.task_manager.domain.user.dto;

import com.rian.task_manager.domain.user.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UserRequest (

        @NotNull
        String name,
        @NotBlank
        String email,
        @NotBlank
        String passWord
){
    public User toEntity(){
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassWord(passWord);
        return user;
    }
}
