package com.rian.task_manager.exceptions;

public class EmailAlredyExistsException extends RuntimeException{

    public EmailAlredyExistsException(String message) {
        super(message);
    }
}
