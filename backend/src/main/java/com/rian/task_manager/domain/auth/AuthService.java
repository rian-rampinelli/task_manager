package com.rian.task_manager.domain.auth;

import com.rian.task_manager.domain.auth.dto.LoginRequest;
import com.rian.task_manager.domain.auth.dto.RegisterRequest;
import com.rian.task_manager.domain.auth.dto.RegisterResponse;
import com.rian.task_manager.domain.auth.dto.TokenResponse;
import com.rian.task_manager.domain.user.User;
import com.rian.task_manager.domain.user.UserRepository;
import com.rian.task_manager.exceptions.EmailAlredyExistsException;
import com.rian.task_manager.security.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RolesRepository rolesRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final TokenProvider tokenProvider;

    @Value("${jwt.expiration}")
    private Long expirationTime;

    public RegisterResponse register(RegisterRequest registerRequest){
        if(userRepository.existsByEmail(registerRequest.email())){
            throw new EmailAlredyExistsException("Email já cadastrado!");
        }

        Roles role = rolesRepository.findByName(RoleType.ROLE_USER.name())
                .orElseGet(() -> rolesRepository.save(Roles.builder()
                        .name(RoleType.ROLE_USER.name())
                        .build()));

        User user = new User();
        user.setName(registerRequest.name());
        user.setEmail(registerRequest.email());
        user.setRoles(Set.of(role));
        user.setPassWord(passwordEncoder.encode(registerRequest.passWord()));
        userRepository.save(user);

        passwordEncoder.matches(registerRequest.passWord(),"0PXzYJrI5wQeQxLh7b1V3dJ0W4Xw3l6b8X+2QvYQ0mQ");


        return RegisterResponse.fromEntity(user);
    }

    public TokenResponse login(LoginRequest loginRequest) throws Exception {
        try {
            //authentication provider -> userDetailsService -> PassWordEncoder.matches -> autenticado!
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.email(),loginRequest.passWord()));
            String token = tokenProvider.gerarToken(authentication);

            return  new TokenResponse(token,expirationTime);
        }catch (BadCredentialsException e){
            throw new BadRequestException("credenciasl invalidas");
        }catch (Exception e){
            throw e;
        }
    }
}
