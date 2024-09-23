package com.codegnan.universitymanagement;

public class Course {

	private String title; //title of the course
	
	public Course(String title) {
		this.title=title;
	}
	
	public String getTitle()
	{
		return title;
	}
	//override toString() method to privide the string representation of the course
		public String toString() //******************
		{
			return title;
		}
}
