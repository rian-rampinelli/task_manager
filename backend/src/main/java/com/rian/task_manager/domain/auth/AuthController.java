package com.rian.task_manager.domain.auth;

import com.rian.task_manager.domain.auth.dto.LoginRequest;
import com.rian.task_manager.domain.auth.dto.RegisterRequest;
import com.rian.task_manager.domain.auth.dto.TokenResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public void register(@RequestBody @Valid RegisterRequest registerRequest){
        authService.register(registerRequest);
    }

    @PostMapping("/login")
    public TokenResponse login(@RequestBody @Valid LoginRequest loginRequest) throws Exception{
        System.out.println("🔥 LOGIN HIT");
        return authService.login(loginRequest);
    }

}
