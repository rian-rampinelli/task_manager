package com.rian.task_manager.Auth;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;

@Entity
@Table(name = "roles")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Roles implements GrantedAuthority {

    @Id
    private Long id;
    private String name;

    @Override
    public @Nullable String getAuthority() {
        return name;
    }
}
