// Simulating a simple in-memory database using local storage
class UniversityManagement {
  constructor() {
    this.students = JSON.parse(localStorage.getItem("students")) || [];
    this.professors = JSON.parse(localStorage.getItem("professors")) || [];
    this.courses = JSON.parse(localStorage.getItem("courses")) || [];
  }

  addStudent(name) {
    this.students.push({ name, enrolledCourses: [] });
    this.saveData("students", this.students);
  }

  addProfessor(name) {
    this.professors.push({ name, assignedCourses: [] });
    this.saveData("professors", this.professors);
  }

  addCourse(title) {
    this.courses.push({ title });
    this.saveData("courses", this.courses);
  }

  enrollStudentInCourse(studentName, courseTitle) {
    const student = this.findStudentByName(studentName);
    const course = this.findCourseByTitle(courseTitle);
    if (student && course && !student.enrolledCourses.includes(courseTitle)) {
      student.enrolledCourses.push(courseTitle);
      this.saveData("students", this.students);
      return `${studentName} has been enrolled in ${courseTitle}.`;
    } else {
      return "Student or course not found, or student already enrolled in this course.";
    }
  }

  assignCourseToProfessor(professorName, courseTitle) {
    const professor = this.findProfessorByName(professorName);
    const course = this.findCourseByTitle(courseTitle);
    if (
      professor &&
      course &&
      !professor.assignedCourses.includes(courseTitle)
    ) {
      professor.assignedCourses.push(courseTitle);
      this.saveData("professors", this.professors);
      return `${courseTitle} has been assigned to ${professorName}.`;
    } else {
      return "Professor or course not found, or professor already assigned to this course.";
    }
  }

  findStudentByName(name) {
    return this.students.find(
      (student) => student.name.toLowerCase() === name.toLowerCase()
    );
  }

  findProfessorByName(name) {
    return this.professors.find(
      (professor) => professor.name.toLowerCase() === name.toLowerCase()
    );
  }

  findCourseByTitle(title) {
    return this.courses.find(
      (course) => course.title.toLowerCase() === title.toLowerCase()
    );
  }

  saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  listStudents() {
    return this.students.map((student) => student.name);
  }

  listProfessors() {
    return this.professors.map((professor) => professor.name);
  }

  listCourses() {
    return this.courses.map((course) => course.title);
  }

  getStudentCourses(studentName) {
    const student = this.findStudentByName(studentName);
    return student ? student.enrolledCourses : [];
  }

  getProfessorCourses(professorName) {
    const professor = this.findProfessorByName(professorName);
    return professor ? professor.assignedCourses : [];
  }
}

const uniManagement = new UniversityManagement();

// UI Functions
function addStudent() {
  const name = document.getElementById("studentName").value;
  uniManagement.addStudent(name);
  showResponse(`Student ${name} added.`);
  document.getElementById("studentName").value = "";
}

function addProfessor() {
  const name = document.getElementById("professorName").value;
  uniManagement.addProfessor(name);
  showResponse(`Professor ${name} added.`);
  document.getElementById("professorName").value = "";
}

function addCourse() {
  const title = document.getElementById("courseTitle").value;
  uniManagement.addCourse(title);
  showResponse(`Course ${title} added.`);
  document.getElementById("courseTitle").value = "";
}

function enrollStudent() {
  const studentName = document.getElementById("enrollStudentName").value;
  const courseTitle = document.getElementById("enrollCourseTitle").value;
  const message = uniManagement.enrollStudentInCourse(studentName, courseTitle);
  showResponse(message);
  document.getElementById("enrollStudentName").value = "";
  document.getElementById("enrollCourseTitle").value = "";
}

function assignCourse() {
  const professorName = document.getElementById("assignProfessorName").value;
  const courseTitle = document.getElementById("assignCourseTitle").value;
  const message = uniManagement.assignCourseToProfessor(
    professorName,
    courseTitle
  );
  showResponse(message);
  document.getElementById("assignProfessorName").value = "";
  document.getElementById("assignCourseTitle").value = "";
}

function listStudents() {
  const students =
    uniManagement.listStudents().join(", ") || "No students available.";
  showResponse(`Students: ${students}`);
}

function listProfessors() {
  const professors =
    uniManagement.listProfessors().join(", ") || "No professors available.";
  showResponse(`Professors: ${professors}`);
}

function listCourses() {
  const courses =
    uniManagement.listCourses().join(", ") || "No courses available.";
  showResponse(`Courses: ${courses}`);
}

function displayStudentCourses() {
  const studentName = document.getElementById("displayStudentName").value;
  const courses = uniManagement.getStudentCourses(studentName);
  showResponse(
    `Courses for ${studentName}: ${courses.join(", ") || "No courses found."}`
  );
}

function displayProfessorCourses() {
  const professorName = document.getElementById("displayProfessorName").value;
  const courses = uniManagement.getProfessorCourses(professorName);
  showResponse(
    `Courses assigned to ${professorName}: ${
      courses.join(", ") || "No courses found."
    }`
  );
}

function showResponse(message) {
  const responseDiv = document.getElementById("response");
  responseDiv.innerText = message;
  responseDiv.style.display = "block";
  setTimeout(() => {
    responseDiv.style.display = "none";
  }, 3000); // Hide after 3 seconds
}
