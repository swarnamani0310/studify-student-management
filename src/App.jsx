import { useEffect, useState } from "react";

import {
  Users,
  UserCheck,
  BookOpen,
  UserPlus,
  UserX,
  AlertTriangle,
  CheckCircle2,
  X,
  Trash2
} from "lucide-react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatCard from "./components/StatCard";
import StudentList from "./components/StudentList";
import AddStudentForm from "./components/AddStudentForm";
import Login from "./components/Login";

import "./App.css";

const initialStudents = [
  {
    id: "STU-001",
    name: "Swarna M",
    age: 21,
    course: "CSE - AIML",
    email: "Swan@example.com",
    phone: "9876543210",
    status: "Active"
  },
  {
    id: "STU-002",
    name: "Rupesh Kumar",
    age: 20,
    course: "Computer Science",
    email: "katpadiking@example.com",
    phone: "9876543211",
    status: "Active"
  },
  {
    id: "STU-003",
    name: "Priya S",
    age: 21,
    course: "Information Technology",
    email: "priya@example.com",
    phone: "9876543212",
    status: "Active"
  },
  {
    id: "STU-004",
    name: "Arjun K",
    age: 22,
    course: "Electronics",
    email: "arjun@example.com",
    phone: "9876543213",
    status: "Inactive"
  }
];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [activePage, setActivePage] =
    useState("Dashboard");

  const [students, setStudents] = useState(() => {
    const savedStudents =
      localStorage.getItem("studify_students");

    return savedStudents
      ? JSON.parse(savedStudents)
      : initialStudents;
  });

  const [searchTerm, setSearchTerm] =
    useState("");

  const [filterStatus, setFilterStatus] =
    useState("All");

  const [showNotifications, setShowNotifications] =
    useState(false);

  const [editingStudent, setEditingStudent] =
    useState(null);

  const [selectedStudent, setSelectedStudent] =
    useState(null);

  const [deleteStudentId, setDeleteStudentId] =
    useState(null);

  const [toast, setToast] =
    useState(null);

  useEffect(() => {
    localStorage.setItem(
      "studify_students",
      JSON.stringify(students)
    );
  }, [students]);

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timer = setTimeout(() => {
      setToast(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast]);

  const showToast = (message, type = "success") => {
    setToast({
      message,
      type
    });
  };

  const addStudent = (newStudent) => {
    const student = {
      ...newStudent,
      id: `STU-${String(Date.now()).slice(-6)}`
    };

    setStudents((previousStudents) => [
      ...previousStudents,
      student
    ]);

    showToast(
      `${newStudent.name} was added successfully.`
    );
  };

  const updateStudent = (updatedStudent) => {
    setStudents((previousStudents) =>
      previousStudents.map((student) =>
        student.id === updatedStudent.id
          ? updatedStudent
          : student
      )
    );

    setEditingStudent(null);

    showToast(
      `${updatedStudent.name}'s details were updated.`
    );
  };

  const requestDeleteStudent = (studentId) => {
    setDeleteStudentId(studentId);
  };

  const confirmDeleteStudent = () => {
    if (!deleteStudentId) {
      return;
    }

    const student = students.find(
      (item) => item.id === deleteStudentId
    );

    setStudents((previousStudents) =>
      previousStudents.filter(
        (item) => item.id !== deleteStudentId
      )
    );

    setSelectedStudent(null);
    setDeleteStudentId(null);

    if (student) {
      showToast(
        `${student.name} was removed from STUDIFY.`,
        "success"
      );
    }
  };

  const changeStudentStatus = (studentId) => {
    const student = students.find(
      (item) => item.id === studentId
    );

    if (!student) {
      return;
    }

    const newStatus =
      student.status === "Active"
        ? "Inactive"
        : "Active";

    setStudents((previousStudents) =>
      previousStudents.map((item) =>
        item.id === studentId
          ? {
              ...item,
              status: newStatus
            }
          : item
      )
    );

    showToast(
      `${student.name} is now ${newStatus.toLowerCase()}.`
    );
  };

  const activeStudents = students.filter(
    (student) => student.status === "Active"
  );

  const inactiveStudents = students.filter(
    (student) => student.status === "Inactive"
  );

  const totalCourses = new Set(
    students.map((student) => student.course)
  ).size;

  const filteredStudents = students.filter(
    (student) => {
      const search =
        searchTerm.toLowerCase().trim();

      const matchesSearch =
        student.name
          .toLowerCase()
          .includes(search) ||
        student.id
          .toLowerCase()
          .includes(search) ||
        student.course
          .toLowerCase()
          .includes(search) ||
        student.email
          .toLowerCase()
          .includes(search);

      const matchesStatus =
        filterStatus === "All" ||
        student.status === filterStatus;

      return (
        matchesSearch &&
        matchesStatus
      );
    }
  );

  const selectedDeleteStudent =
    students.find(
      (student) =>
        student.id === deleteStudentId
    );

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActivePage("Dashboard");
  };

  if (!isLoggedIn) {
    return (
      <Login
        onLogin={() => setIsLoggedIn(true)}
      />
    );
  }

  return (
    <div className="app-layout">

      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        onLogout={handleLogout}
      />

      <div className="main-area">

        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
          onLogout={handleLogout}
        />

        <main className="dashboard">

          {activePage === "Dashboard" && (
            <>
              <section className="welcome-section dashboard-hero">

                <div className="hero-content">
                  <span className="section-tag">
                    OVERVIEW
                  </span>

                  <h1>
                    Student Management
                  </h1>

                  <p>
                    Manage student records, courses and
                    academic information from one place.
                  </p>

                  <div className="hero-summary">
                    <div>
                      <strong>
                        {activeStudents.length}
                      </strong>
                      <span>Active students</span>
                    </div>

                    <div className="summary-divider"></div>

                    <div>
                      <strong>
                        {totalCourses}
                      </strong>
                      <span>Courses</span>
                    </div>
                  </div>
                </div>

                <div className="hero-action">
                  <div className="hero-action-icon">
                    <Users size={22} />
                  </div>

                  <span>
                    Keep your student records
                    organized and up to date.
                  </span>

                  <button
                    className="primary-button"
                    onClick={() =>
                      setActivePage("Students")
                    }
                  >
                    <UserPlus size={18} />
                    Add Student
                  </button>
                </div>

              </section>

              <section className="stats-grid">

                <StatCard
                  title="Total Students"
                  value={students.length}
                  description="Students registered"
                  icon={Users}
                />

                <StatCard
                  title="Active Students"
                  value={activeStudents.length}
                  description="Currently active"
                  icon={UserCheck}
                />

                <StatCard
                  title="Inactive Students"
                  value={inactiveStudents.length}
                  description="Currently inactive"
                  icon={UserX}
                />

                <StatCard
                  title="Courses"
                  value={totalCourses}
                  description="Courses represented"
                  icon={BookOpen}
                />

              </section>

              <section className="dashboard-section-heading">
                <div>
                  <span className="section-tag">
                    RECENT RECORDS
                  </span>

                  <h2>
                    Latest Students
                  </h2>

                  <p>
                    Recently registered students in your
                    directory.
                  </p>
                </div>

                <button
                  className="text-button"
                  onClick={() =>
                    setActivePage("Students")
                  }
                >
                  View all students →
                </button>
              </section>

              <section className="content-section">
                <StudentList
                  students={students.slice(0, 5)}
                  onStatusChange={
                    changeStudentStatus
                  }
                  onEdit={setEditingStudent}
                  onDelete={
                    requestDeleteStudent
                  }
                  onView={setSelectedStudent}
                  filterStatus={filterStatus}
                  setFilterStatus={
                    setFilterStatus
                  }
                  hideFilter={true}
                />
              </section>
            </>
          )}

          {activePage === "Students" && (
            <>
              <section className="welcome-section directory-hero">

                <div>
                  <span className="section-tag">
                    DIRECTORY
                  </span>

                  <h1>
                    Student Directory
                  </h1>

                  <p>
                    Add, update, view and manage student
                    records from one workspace.
                  </p>
                </div>

                <AddStudentForm
                  onAddStudent={addStudent}
                />

              </section>

              <section className="directory-toolbar">

                <div className="directory-count">
                  <strong>
                    {filteredStudents.length}
                  </strong>

                  <span>
                    {filteredStudents.length === 1
                      ? "student found"
                      : "students found"}
                  </span>
                </div>

                {searchTerm && (
                  <div className="search-result-label">
                    Results for
                    <strong>
                      "{searchTerm}"
                    </strong>
                  </div>
                )}

              </section>

              <section className="content-section">
                <StudentList
                  students={filteredStudents}
                  onStatusChange={
                    changeStudentStatus
                  }
                  onEdit={setEditingStudent}
                  onDelete={
                    requestDeleteStudent
                  }
                  onView={setSelectedStudent}
                  filterStatus={filterStatus}
                  setFilterStatus={
                    setFilterStatus
                  }
                />
              </section>
            </>
          )}

          {activePage === "Courses" && (
            <section className="page-card">

              <div className="page-title">
                <span className="section-tag">
                  ACADEMICS
                </span>

                <h1>
                  Courses
                </h1>

                <p>
                  Courses currently represented in STUDIFY.
                </p>
              </div>

              <div className="course-grid">

                {[...new Set(
                  students.map(
                    (student) => student.course
                  )
                )].map((course) => (

                  <div
                    className="course-card"
                    key={course}
                  >
                    <div className="course-icon">
                      <BookOpen size={20} />
                    </div>

                    <h3>
                      {course}
                    </h3>

                    <p>
                      {
                        students.filter(
                          (student) =>
                            student.course ===
                            course
                        ).length
                      } students
                    </p>
                  </div>

                ))}

              </div>
            </section>
          )}

          {activePage === "Analytics" && (
            <section className="page-card">

              <div className="page-title">
                <span className="section-tag">
                  REPORTS
                </span>

                <h1>
                  Analytics
                </h1>

                <p>
                  Overview of student activity.
                </p>
              </div>

              <div className="analytics-grid">

                <StatCard
                  title="Total Students"
                  value={students.length}
                  description="All registered students"
                  icon={Users}
                />

                <StatCard
                  title="Active"
                  value={activeStudents.length}
                  description="Active students"
                  icon={UserCheck}
                />

                <StatCard
                  title="Inactive"
                  value={inactiveStudents.length}
                  description="Inactive students"
                  icon={UserX}
                />

              </div>

              <div className="analytics-summary">

                <div className="analytics-summary-header">
                  <div>
                    <span className="section-tag">
                      STATUS DISTRIBUTION
                    </span>

                    <h3>
                      Student activity
                    </h3>
                  </div>
                </div>

                <div className="progress-row">
                  <div className="progress-label">
                    <span>Active</span>
                    <strong>
                      {students.length
                        ? Math.round(
                            (activeStudents.length /
                              students.length) *
                              100
                          )
                        : 0}
                      %
                    </strong>
                  </div>

                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${
                          students.length
                            ? (activeStudents.length /
                                students.length) *
                              100
                            : 0
                        }%`
                      }}
                    ></div>
                  </div>
                </div>

                <div className="progress-row">
                  <div className="progress-label">
                    <span>Inactive</span>
                    <strong>
                      {students.length
                        ? Math.round(
                            (inactiveStudents.length /
                              students.length) *
                              100
                          )
                        : 0}
                      %
                    </strong>
                  </div>

                  <div className="progress-track">
                    <div
                      className="progress-fill inactive-fill"
                      style={{
                        width: `${
                          students.length
                            ? (inactiveStudents.length /
                                students.length) *
                              100
                            : 0
                        }%`
                      }}
                    ></div>
                  </div>
                </div>

              </div>

            </section>
          )}

          {activePage === "Settings" && (
            <section className="page-card">

              <div className="page-title">
                <span className="section-tag">
                  SYSTEM
                </span>

                <h1>
                  Settings
                </h1>

                <p>
                  Manage your STUDIFY preferences.
                </p>
              </div>

              <div className="settings-card">

                <div className="settings-icon">
                  <Users size={20} />
                </div>

                <div>
                  <h3>
                    Administrator Account
                  </h3>

                  <p>
                    Signed in as Swarna M
                  </p>
                </div>

                <button
                  className="secondary-button"
                  onClick={handleLogout}
                >
                  Sign Out
                </button>

              </div>

            </section>
          )}

          {activePage === "Help & Support" && (
            <section className="page-card">

              <div className="page-title">
                <span className="section-tag">
                  SUPPORT
                </span>

                <h1>
                  Help & Support
                </h1>

                <p>
                  Information about using STUDIFY.
                </p>
              </div>

              <div className="help-card">

                <div className="help-icon">
                  ?
                </div>

                <div>
                  <h3>
                    STUDIFY Administration
                  </h3>

                  <p>
                    Use the Students section to create,
                    update and manage student records.
                  </p>

                  <p>
                    Student information is automatically
                    saved in the browser using localStorage.
                  </p>
                </div>

              </div>

            </section>
          )}

        </main>

        <footer className="app-footer">
          <span>
            STUDIFY
          </span>

          <p>
            Student Management System
          </p>
        </footer>

      </div>

      {editingStudent && (
        <EditStudentModal
          student={editingStudent}
          onSave={updateStudent}
          onClose={() =>
            setEditingStudent(null)
          }
        />
      )}

      {selectedStudent && (
        <StudentDetailsModal
          student={selectedStudent}
          onClose={() =>
            setSelectedStudent(null)
          }
          onEdit={() => {
            setEditingStudent(selectedStudent);
            setSelectedStudent(null);
          }}
          onDelete={() =>
            requestDeleteStudent(
              selectedStudent.id
            )
          }
        />
      )}

      {deleteStudentId && (
        <DeleteConfirmModal
          student={selectedDeleteStudent}
          onCancel={() =>
            setDeleteStudentId(null)
          }
          onConfirm={confirmDeleteStudent}
        />
      )}

      {toast && (
        <div
          className={`toast toast-${toast.type}`}
        >
          <div className="toast-icon">
            {toast.type === "success" ? (
              <CheckCircle2 size={18} />
            ) : (
              <AlertTriangle size={18} />
            )}
          </div>

          <div className="toast-content">
            <strong>
              {toast.type === "success"
                ? "Success"
                : "Notice"}
            </strong>

            <span>
              {toast.message}
            </span>
          </div>

          <button
            className="toast-close"
            onClick={() => setToast(null)}
          >
            <X size={15} />
          </button>
        </div>
      )}

    </div>
  );
}

function EditStudentModal({
  student,
  onSave,
  onClose
}) {
  const [formData, setFormData] =
    useState(student);

  const handleChange = (event) => {
    const { name, value } =
      event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.age ||
      !formData.course.trim() ||
      !formData.email.trim()
    ) {
      return;
    }

    onSave({
      ...formData,
      age: Number(formData.age)
    });
  };

  return (
    <div className="modal-overlay">
      <div className="student-modal">

        <div className="modal-header">
          <div>
            <span className="section-tag">
              EDIT RECORD
            </span>

            <h2>
              Edit Student
            </h2>

            <p>
              Update the student's information.
            </p>
          </div>

          <button
            className="close-button"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={19} />
          </button>
        </div>

        <form
          className="student-form"
          onSubmit={handleSubmit}
        >

          <div className="form-field">
            <label>
              Student Name *
            </label>

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="form-row">

            <div className="form-field">
              <label>
                Age *
              </label>

              <input
                type="number"
                name="age"
                min="1"
                max="100"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label>
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>
              </select>
            </div>

          </div>

          <div className="form-field">
            <label>
              Course *
            </label>

            <input
              name="course"
              value={formData.course}
              onChange={handleChange}
              placeholder="e.g. CSE - AIML"
              required
            />
          </div>

          <div className="form-field">
            <label>
              Email *
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="student@example.com"
              required
            />
          </div>

          <div className="form-field">
            <label>
              Phone
            </label>

            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="10-digit phone number"
            />
          </div>

          <div className="modal-actions">

            <button
              type="button"
              className="secondary-button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-button"
            >
              Save Changes
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

function StudentDetailsModal({
  student,
  onClose,
  onEdit,
  onDelete
}) {
  const initials = student.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="modal-overlay">
      <div className="student-modal details-modal">

        <div className="modal-header">

          <div>
            <span className="section-tag">
              STUDENT PROFILE
            </span>

            <h2>
              Student Details
            </h2>

            <p>
              Complete student information.
            </p>
          </div>

          <button
            className="close-button"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={19} />
          </button>

        </div>

        <div className="student-details">

          <div className="profile-summary">

            <div className="details-avatar">
              {initials}
            </div>

            <div>
              <h3>
                {student.name}
              </h3>

              <span>
                {student.id}
              </span>
            </div>

            <span
              className={`status ${
                student.status === "Active"
                  ? "active"
                  : "inactive"
              }`}
            >
              {student.status}
            </span>

          </div>

          <div className="details-grid">

            <div>
              <span>
                FULL NAME
              </span>

              <strong>
                {student.name}
              </strong>
            </div>

            <div>
              <span>
                AGE
              </span>

              <strong>
                {student.age} years
              </strong>
            </div>

            <div>
              <span>
                COURSE
              </span>

              <strong>
                {student.course}
              </strong>
            </div>

            <div>
              <span>
                STATUS
              </span>

              <strong>
                {student.status}
              </strong>
            </div>

            <div>
              <span>
                EMAIL
              </span>

              <strong>
                {student.email}
              </strong>
            </div>

            <div>
              <span>
                PHONE
              </span>

              <strong>
                {student.phone ||
                  "Not provided"}
              </strong>
            </div>

          </div>

        </div>

        <div className="modal-actions details-actions">

          <button
            className="danger-button"
            onClick={onDelete}
          >
            <Trash2 size={16} />
            Delete
          </button>

          <button
            className="primary-button"
            onClick={onEdit}
          >
            Edit Student
          </button>

        </div>

      </div>
    </div>
  );
}

function DeleteConfirmModal({
  student,
  onCancel,
  onConfirm
}) {
  return (
    <div className="modal-overlay">

      <div className="confirm-modal">

        <div className="confirm-icon">
          <Trash2 size={22} />
        </div>

        <h2>
          Delete student?
        </h2>

        <p>
          {student
            ? `You're about to permanently remove ${student.name} from the student directory.`
            : "This student will be permanently removed from the directory."}
        </p>

        <div className="confirm-actions">

          <button
            className="secondary-button"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="danger-filled-button"
            onClick={onConfirm}
          >
            Delete Student
          </button>

        </div>

      </div>

    </div>
  );
}

export default App;
