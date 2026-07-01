package com.rian.task_manager.exceptions;

public class MethodArgumentNotValidException extends RuntimeException{

    public MethodArgumentNotValidException(String message) {
        super(message);
    }
}
