package com.rian.task_manager;

import com.rian.task_manager.category.Category;
import com.rian.task_manager.task.Task;
import com.rian.task_manager.task.enums.Priority;
import com.rian.task_manager.task.enums.StatusLevel;
import com.rian.task_manager.user.User;
import com.rian.task_manager.user.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;


@SpringBootApplication
public class TaskManagerApplication {

    public static void main(String[] args) {
        SpringApplication.run(TaskManagerApplication.class, args);
    }

    @Bean
    CommandLineRunner init(UserRepository userRepository) {
        return args -> {

            User user = new User();
            user.setName("rian");
            user.setEmail("rian@gmail.com");
            user.setPassWord("1234");

            Category category = new Category();
            category.setName("work");
            category.setDescription("descricao teste para trabalho ....");
            category.setEmoji("💼");

            Task task = new Task();
            task.setTitle("terminar bancada casa rian");
            task.setDescription("uehueeee");
            task.setPriority(Priority.MEDIUM);
            task.setStatusLevel(StatusLevel.IN_PROGRESS);


            user.addCategory(category);
            category.addTask(task);
            user.addTask(task);

            userRepository.save(user);
        };
    }
}