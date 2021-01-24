import { FaTimes } from "react-icons/fa";

const Reminder = ({ reminder, onDelete, onToggle }) => {
  return (
    <div
      title="Double tap to turn highlight on/off."
      className={`reminder ${reminder.highlight ? "highlight" : ""}`}
      onDoubleClick={() => onToggle(reminder.id)}
    >
      <h3>
        {reminder.text}{" "}
        <FaTimes
          title="Delete"
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => onDelete(reminder.id)}
        />
      </h3>
      <p>{reminder.day}</p>
    </div>
  );
};

export default Reminder;
