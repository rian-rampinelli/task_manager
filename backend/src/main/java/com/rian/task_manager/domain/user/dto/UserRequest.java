package com.rian.task_manager.domain.user.dto;

import com.rian.task_manager.domain.user.User;

public record UserRequest (
        String name,
        String email,
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
