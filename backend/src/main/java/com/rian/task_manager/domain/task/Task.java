package com.rian.task_manager.domain.task;

import com.rian.task_manager.domain.category.Category;
import com.rian.task_manager.config.Auditable;
import com.rian.task_manager.domain.task.enums.Priority;
import com.rian.task_manager.domain.task.enums.StatusLevel;
import com.rian.task_manager.domain.user.User;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "task")
public class Task extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @Column(name = "title", nullable = false, length = 64)
    private String title;

    @Column(name = "description",length = 512)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private StatusLevel statusLevel;

    @Enumerated(EnumType.STRING)
    @Column(name = "priority",nullable = false)
    private Priority priority;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private User user;

    @ManyToOne
    @JoinColumn(name = "id_category",nullable = true)
    private Category category;
}
