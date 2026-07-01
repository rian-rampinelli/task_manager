package com.rian.task_manager.domain.task.dto;

import jakarta.validation.constraints.NotNull;

public record StatusLevelDto(
        @NotNull
        String statusLevel
) {
}
