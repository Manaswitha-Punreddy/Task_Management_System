package com.project.taskmanagementsystem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/task")
public class TaskController {

    @Autowired
    public TaskService taskService;

    @PostMapping("/createTask")
    public String createTask(@RequestBody Map<String, String> taskDetails) {
        return taskService.createTask(taskDetails);
    }

    @PostMapping("/editTask")
    public String editTask(@RequestBody Map<String, String> newTaskDetails) {
        return taskService.editTask(newTaskDetails);
    }

    @DeleteMapping("/deleteTask/{taskId}")
    public String deleteTask(@PathVariable int taskId) {
        return taskService.deleteTask(taskId);
    }

    @PostMapping("/completeTask")
    public String completeTask(@RequestBody int taskId) {
        return taskService.completeTask(taskId);
    }

    @GetMapping("/getAllTasks")
    public Iterable<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    @GetMapping("/getTask/{taskId}")
    public Optional<Task> getTask(@PathVariable int taskId) {
        return taskService.getTask(taskId);
    }
}
