package com.rian.task_manager.domain.category;

import com.rian.task_manager.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    boolean existsByName(String email);
    boolean existsByNameAndUser(String name, User user);
    Optional<Category> findByIdAndUser(Long id, User user);
}