package com.project.taskmanagementsystem;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
public class TaskService {

    Logger log = LoggerFactory.getLogger(TaskService.class);

    @Autowired
    TaskRepository taskRepository;

    public String createTask(Map<String, String> taskDetails) {
        try {
            Task task = new Task();
            task.setName(taskDetails.get("name"));
            task.setDescription(taskDetails.get("description"));
            task.setCategory(taskDetails.get("category"));
            task.setCompleted(false);
            taskRepository.save(task);
            return "A new task has been created!";
        }
        catch (Exception e) {
            log.error("An exception has occurred while creating the task ", e);
            return "Sorry! An issue an occurred while creating the task.";
        }
    }

    public String editTask(Map<String, String> taskDetails) {
        try {
            Task task = taskRepository.findById(Integer.valueOf(taskDetails.get("taskId"))).get();
            task.setName(taskDetails.get("name"));
            task.setDescription(taskDetails.get("description"));
            task.setCategory(taskDetails.get("category"));
            taskRepository.save(task);
            return "The task has been updated!";
        }
        catch (Exception e) {
            log.error("An exception has occurred while updating the task ", e);
            return "Sorry! An issue has occurred while updating the task.";
        }
    }

    public String deleteTask(int taskId) {
        try {
            taskRepository.deleteById(taskId);
            return "The task has been deleted";
        }
        catch(Exception e) {
            log.error("An exception has occurred while deleting the task ", e);
            return "Sorry! An issue has occurred while deleting the task.";
        }
    }

    public String completeTask(int taskId) {
        try {
            Task task = taskRepository.findById(taskId).get();
            task.setCompleted(true);
            taskRepository.save(task);
            return "The task has been completed!";
        }
        catch (Exception e) {
            log.error("An exception has occurred while completing the task ", e);
            return "Sorry! An issue has occurred while completing the task";
        }
    }

    public Iterable<Task> getAllTasks() {
        try {
            return taskRepository.findAll();
        }
        catch (Exception e) {
            log.error("An exception has occurred while retrieving all the tasks ", e);
            return null;
        }
    }

    public Optional<Task> getTask(int taskId) {
        try {
            return taskRepository.findById(taskId);
        }
        catch (Exception e) {
            log.error("An exception has occurred while retrieving the task ", e);
            return null;
        }
    }
}
