package com.rian.task_manager.infra;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;



@AllArgsConstructor
@Getter
@Setter
public class RestErrorMessage {
    private int status;
    private String statusMessage;
    private String message;

}
