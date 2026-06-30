package com.rian.task_manager.domain.auth.dto;

public record TokenResponse(String token, long expiresIn) {
}
