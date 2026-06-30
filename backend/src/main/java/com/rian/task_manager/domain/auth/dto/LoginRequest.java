package com.rian.task_manager.domain.auth.dto;

public record LoginRequest(
        String email,
        String passWord
){
}
