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
