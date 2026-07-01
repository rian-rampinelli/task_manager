package com.rian.task_manager.domain.auth.dto;


public record RegisterRequest(
        String name,
        String email,
        String passWord
){

}
