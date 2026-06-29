package com.rian.task_manager.domain.category;

import com.rian.task_manager.config.Auditable;
import com.rian.task_manager.domain.task.Task;
import com.rian.task_manager.domain.user.User;
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
@Table(name = "category")
public class Category extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "emoji")
    private String emoji;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private User user;

    @OneToMany(mappedBy = "category",cascade = CascadeType.ALL)
    private List<Task> tasks = new ArrayList<>();

    public void addTask(Task task){
        tasks.add(task);
        task.setCategory(this);
    }

    public void removeTask(Task task){
        tasks.remove(task);
        task.setCategory(null);
    }

}
