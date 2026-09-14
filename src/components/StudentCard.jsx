import {
  ToggleLeft,
  ToggleRight,
  Eye,
  Pencil,
  Trash2,
  Mail,
  Phone
} from "lucide-react";

function StudentCard({
  student,
  onStatusChange,
  onEdit,
  onDelete,
  onView
}) {
  const initials = student.name
    .split(" ")
    .map((name) => name[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const isActive =
    student.status === "Active";

  return (
    <div className="student-row">

      <div
        className="student-profile clickable"
        onClick={() => onView(student)}
      >
        <div className="student-avatar">
          {initials}
        </div>

        <div className="student-name">
          <strong>
            {student.name}
          </strong>

          <span>
            {student.id}
          </span>
        </div>
      </div>

      <div className="student-course">
        <strong>
          {student.course}
        </strong>

        <span>
          <Mail size={12} />
          {student.email}
        </span>
      </div>

      <div className="student-age">
        {student.age}
      </div>

      <div>
        <button
          className={`status status-button ${
            isActive
              ? "active"
              : "inactive"
          }`}
          onClick={() =>
            onStatusChange(student.id)
          }
          title="Change student status"
        >
          {isActive ? (
            <ToggleRight size={15} />
          ) : (
            <ToggleLeft size={15} />
          )}

          {student.status}
        </button>
      </div>

      <div className="student-actions">

        <button
          className="row-action"
          title="View student"
          onClick={() =>
            onView(student)
          }
        >
          <Eye size={16} />
        </button>

        <button
          className="row-action"
          title="Edit student"
          onClick={() =>
            onEdit(student)
          }
        >
          <Pencil size={16} />
        </button>

        <button
          className="row-action delete-action"
          title="Delete student"
          onClick={() =>
            onDelete(student.id)
          }
        >
          <Trash2 size={16} />
        </button>

      </div>

    </div>
  );
}

export default StudentCard;