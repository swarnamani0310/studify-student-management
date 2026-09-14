import { useState } from "react";
import {
  Plus,
  X,
  UserPlus
} from "lucide-react";

function AddStudentForm({
  onAddStudent
}) {
  const [isOpen, setIsOpen] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      age: "",
      course: "",
      email: "",
      phone: "",
      status: "Active"
    });

  const resetForm = () => {
    setFormData({
      name: "",
      age: "",
      course: "",
      email: "",
      phone: "",
      status: "Active"
    });
  };

  const closeModal = () => {
    resetForm();
    setIsOpen(false);
  };

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

    if (
      Number(formData.age) < 1 ||
      Number(formData.age) > 100
    ) {
      return;
    }

    onAddStudent({
      ...formData,
      age: Number(formData.age)
    });

    resetForm();
    setIsOpen(false);
  };

  return (
    <>
      <button
        className="primary-button"
        onClick={() => setIsOpen(true)}
      >
        <Plus size={18} />
        Add Student
      </button>

      {isOpen && (
        <div
          className="modal-overlay"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeModal();
            }
          }}
        >
          <div className="student-modal">

            <div className="modal-header">

              <div>
                <span className="section-tag">
                  NEW RECORD
                </span>

                <h2>
                  Add New Student
                </h2>

                <p>
                  Create a new student record.
                </p>
              </div>

              <button
                className="close-button"
                onClick={closeModal}
                aria-label="Close"
              >
                <X size={19} />
              </button>

            </div>

            <div className="form-intro">
              <div className="form-intro-icon">
                <UserPlus size={18} />
              </div>

              <div>
                <strong>
                  Student information
                </strong>

                <span>
                  Fields marked with * are required.
                </span>
              </div>
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
                  type="text"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">

                <div className="form-field">
                  <label>
                    Age *
                  </label>

                  <input
                    name="age"
                    type="number"
                    min="1"
                    max="100"
                    placeholder="Age"
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
                  type="text"
                  placeholder="e.g. CSE - AIML"
                  value={formData.course}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label>
                  Email *
                </label>

                <input
                  name="email"
                  type="email"
                  placeholder="student@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label>
                  Phone
                </label>

                <input
                  name="phone"
                  type="tel"
                  placeholder="10-digit phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="modal-actions">

                <button
                  type="button"
                  className="secondary-button"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button"
                >
                  <Plus size={17} />
                  Add Student
                </button>

              </div>

            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AddStudentForm;