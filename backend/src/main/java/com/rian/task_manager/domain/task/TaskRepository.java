package com.rian.task_manager.domain.task;

import com.rian.task_manager.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {
    boolean existsByTitleAndUser(String title, User user);
    Optional<Task> findByIdAndUser(Long id, User user);
}