const apiUrl = "http://localhost:8080/api"; // Adjust this URL based on your backend configuration

async function addStudent() {
  const name = document.getElementById("studentName").value;
  await fetch(`${apiUrl}/students`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
}

async function addProfessor() {
  const name = document.getElementById("professorName").value;
  await fetch(`${apiUrl}/professors`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
}

async function addCourse() {
  const title = document.getElementById("courseTitle").value;
  await fetch(`${apiUrl}/courses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
}

async function enrollStudent() {
  const studentName = document.getElementById("enrollStudentName").value;
  const courseTitle = document.getElementById("enrollCourseTitle").value;
  await fetch(`${apiUrl}/enroll`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ studentName, courseTitle }),
  });
}

async function assignCourse() {
  const professorName = document.getElementById("assignProfessorName").value;
  const courseTitle = document.getElementById("assignCourseTitle").value;
  await fetch(`${apiUrl}/assign`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ professorName, courseTitle }),
  });
}

async function listStudents() {
  const response = await fetch(`${apiUrl}/students`);
  const students = await response.json();
  document.getElementById("studentList").innerText = JSON.stringify(students);
}

async function listProfessors() {
  const response = await fetch(`${apiUrl}/professors`);
  const professors = await response.json();
  document.getElementById("professorList").innerText =
    JSON.stringify(professors);
}

async function listCourses() {
  const response = await fetch(`${apiUrl}/courses`);
  const courses = await response.json();
  document.getElementById("courseList").innerText = JSON.stringify(courses);
}
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
    } else {
      alert(
        "Student or course not found, or student already enrolled in this course."
      );
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
    } else {
      alert(
        "Professor or course not found, or professor already assigned to this course."
      );
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
  alert(`Student ${name} added.`);
}

function addProfessor() {
  const name = document.getElementById("professorName").value;
  uniManagement.addProfessor(name);
  alert(`Professor ${name} added.`);
}

function addCourse() {
  const title = document.getElementById("courseTitle").value;
  uniManagement.addCourse(title);
  alert(`Course ${title} added.`);
}

function enrollStudent() {
  const studentName = document.getElementById("enrollStudentName").value;
  const courseTitle = document.getElementById("enrollCourseTitle").value;
  uniManagement.enrollStudentInCourse(studentName, courseTitle);
  alert(`Enrolled ${studentName} in ${courseTitle}.`);
}

function assignCourse() {
  const professorName = document.getElementById("assignProfessorName").value;
  const courseTitle = document.getElementById("assignCourseTitle").value;
  uniManagement.assignCourseToProfessor(professorName, courseTitle);
  alert(`Assigned ${courseTitle} to ${professorName}.`);
}

function listStudents() {
  alert("Students: \n" + uniManagement.listStudents().join("\n"));
}

function listProfessors() {
  alert("Professors: \n" + uniManagement.listProfessors().join("\n"));
}

function listCourses() {
  alert("Courses: \n" + uniManagement.listCourses().join("\n"));
}

function displayStudentCourses() {
  const studentName = document.getElementById("displayStudentName").value;
  const courses = uniManagement.getStudentCourses(studentName);
  alert(`Courses for ${studentName}: \n` + courses.join("\n"));
}

function displayProfessorCourses() {
  const professorName = document.getElementById("displayProfessorName").value;
  const courses = uniManagement.getProfessorCourses(professorName);
  alert(`Courses assigned to ${professorName}: \n` + courses.join("\n"));
}
