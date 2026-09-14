import {
  Filter,
  Users,
  SearchX
} from "lucide-react";

import StudentCard from "./StudentCard";

function StudentList({
  students,
  onStatusChange,
  onEdit,
  onDelete,
  onView,
  filterStatus,
  setFilterStatus,
  hideFilter = false
}) {
  return (
    <div className="student-section">

      <div className="section-header">

        <div>
          <span className="section-tag">
            DIRECTORY
          </span>

          <h2>
            Students
          </h2>

          <p>
            View and manage registered students.
          </p>
        </div>

        {!hideFilter && (
          <div className="filter-group">
            <Filter size={16} />

            <select
              value={filterStatus}
              onChange={(event) =>
                setFilterStatus(
                  event.target.value
                )
              }
            >
              <option value="All">
                All Students
              </option>

              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>
            </select>
          </div>
        )}

      </div>

      <div className="student-table">

        <div className="table-header">
          <span>
            STUDENT
          </span>

          <span>
            COURSE
          </span>

          <span>
            AGE
          </span>

          <span>
            STATUS
          </span>

          <span>
            ACTIONS
          </span>
        </div>

        <div className="student-table-body">

          {students.length > 0 ? (
            students.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
                onStatusChange={
                  onStatusChange
                }
                onEdit={onEdit}
                onDelete={onDelete}
                onView={onView}
              />
            ))
          ) : (
            <div className="empty-state">

              <div className="empty-icon">
                <SearchX size={23} />
              </div>

              <strong>
                No students found
              </strong>

              <p>
                Try changing your search or
                status filter.
              </p>

            </div>
          )}

        </div>

      </div>

      {students.length > 0 && (
        <div className="table-footer">

          <div className="table-footer-info">
            <Users size={15} />

            <span>
              Showing
              <strong>
                {students.length}
              </strong>
              student
              {students.length !== 1
                ? "s"
                : ""}
            </span>
          </div>

          <span>
            STUDIFY Student Directory
          </span>

        </div>
      )}

    </div>
  );
}

export default StudentList;