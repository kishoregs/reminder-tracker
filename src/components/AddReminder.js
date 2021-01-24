import { useState } from "react";

const AddReminder = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [day, setDay] = useState("");
  const [highlight, setHighlight] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      alert("Please add a reminder");
      return;
    }

    onAdd({ text, day, highlight });

    setText("");
    setDay("");
    setHighlight(false);
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Reminder</label>
        <input
          type="text"
          placeholder="Add Reminder"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Day & Time</label>
        <input
          type="text"
          placeholder="Add Day & Time"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </div>
      <div className="form-control form-control-check">
        <label>Highlight</label>
        <input
          type="checkbox"
          checked={highlight}
          value={highlight}
          onChange={(e) => setHighlight(e.currentTarget.checked)}
        />
      </div>

      <input type="submit" value="Save Reminder" className="btn btn-block" />
    </form>
  );
};

export default AddReminder;
