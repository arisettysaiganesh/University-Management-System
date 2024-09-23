package com.codegnan.universitymanagement;
import com.codegnan.universitymanagement.Course;

import java.util.ArrayList;
import java.util.List;

// Represents a professor in the university
public class Professor {
    private String name; // Name of the professor
    private List<Course> assignedCourses; // List to hold courses assigned to the professor

    // Constructor to initialize the professor with a name and an empty list of assigned courses
    public Professor(String name) {
        this.name = name; // Set the professor's name
        this.assignedCourses = new ArrayList<>(); // Initialize the list of assigned courses
    }

    // Getter method to retrieve the professor's name
    public String getName() {
        return name; // Return the professor's name
    }

    // Method to assign a course to the professor
    public void assignCourse(Course course) {
        // Check if the course is not already in the list of assigned courses
        if (!assignedCourses.contains(course)) {
            assignedCourses.add(course); // Add the course to the list if not already present
        }
    }

    // Getter method to retrieve the list of courses assigned to the professor
    public List<Course> getAssignedCourses() {
        return assignedCourses; // Return the list of assigned courses
    }

    // Override toString method to provide a string representation of the professor
    @Override
    public String toString() {
        return name; // Return the professor's name as the string representation
    }
}
