package com.rian.task_manager.infra;

import com.rian.task_manager.exceptions.EmailAlredyExistsException;
import com.rian.task_manager.exceptions.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<RestErrorMessage> resoucesNotFoundHandler(ResourceNotFoundException exception) {
        RestErrorMessage errorResponse = new RestErrorMessage(HttpStatus.NOT_FOUND,exception.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
    }

    @ExceptionHandler(EmailAlredyExistsException.class)
    public ResponseEntity<RestErrorMessage> handleEmailAlreadyExists(EmailAlredyExistsException exception) {
        RestErrorMessage errorResponse = new RestErrorMessage(HttpStatus.CONFLICT,exception.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponse);
    }
}
