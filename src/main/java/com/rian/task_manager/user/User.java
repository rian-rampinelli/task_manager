package com.rian.task_manager.user;

import com.rian.task_manager.category.Category;
import com.rian.task_manager.config.Auditable;
import com.rian.task_manager.task.Task;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "users")
public class User extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @Column(name = "name",nullable = false)
    private String name;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "password", nullable = false, unique = true, length = 64)
    private String passWord;

    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    private List<Category> categorys = new ArrayList<>();

    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    private List<Task> tasks = new ArrayList<>();

    public void addCategory(Category category){
        categorys.add(category);
        category.setUser(this);
    }

    public void addTask(Task task){
        tasks.add(task);
        task.setUser(this);
    }

}
