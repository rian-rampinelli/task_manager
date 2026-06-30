package com.rian.task_manager.domain.auth.dto;

import com.rian.task_manager.domain.user.User;

public record RegisterRequest(
        String name,
        String email,
        String passWord
){

}
