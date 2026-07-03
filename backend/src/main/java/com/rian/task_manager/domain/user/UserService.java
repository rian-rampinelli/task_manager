package com.rian.task_manager.domain.user;


import com.rian.task_manager.domain.auth.SecurityService;
import org.springframework.security.access.AccessDeniedException;
import com.rian.task_manager.domain.task.dto.TaskResponse;
import com.rian.task_manager.domain.user.dto.UserRequest;
import com.rian.task_manager.domain.user.dto.UserResponse;
import com.rian.task_manager.exceptions.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final SecurityService securityService;

    public void salvar(User user) {
        userRepository.save(user);
    }

    public UserResponse findById(Long id) {
        //compara o id do user com o id autenticado
        checkAccessUser(id);
        User user = findUserById(id);
        return UserResponse.fromEntity(user);
    }

    public List<UserResponse> findAll(){
        return userRepository.findAll().stream()
                .map(usuario -> UserResponse.fromEntity(usuario)).toList();
    }

    public List<TaskResponse> findAllTasksByUser(Long id){
        checkAccessUser(id);
        User user = findUserById(id);
        return user.getTasks().stream()
                .map(task -> TaskResponse.fromEntity(task))
                .toList();
    }

    public Optional<User> findByEmail(String userEmail){
        Optional<User> user = userRepository.findByEmail(userEmail);
        return user;
    }


    public void deleteById(Long id) {
        checkAccessUser(id);
        findUserById(id);
        userRepository.deleteById(id);
    }


    public UserResponse atualizar(Long id,UserRequest usuarioRequest) {
        checkAccessUser(id);
        User user = findUserById(id);
        user.setName(usuarioRequest.name());
        user.setEmail(usuarioRequest.email());
        user.setPassWord(usuarioRequest.passWord());
        userRepository.save(user);
        return UserResponse.fromEntity(user);
    }


    //metodos/funções helpers
    private User findUserById(Long id){
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("user não encontrada!"));
        return user;
    }

    public void checkAccessUser(Long userId) {
        User userLogado = securityService.getAuthenticatedUser();

        boolean isAdmin = userLogado.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        if (!isAdmin && !userLogado.getId().equals(userId)) {
            throw new AccessDeniedException("Acesso negado.");
        }
    }

}
