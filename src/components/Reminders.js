import Reminder from "./Reminder";

const Reminders = ({ reminders, onDelete, onToggle }) => {
  return (
    <>
      {reminders.map((reminder, index) => (
        <Reminder
          key={index}
          reminder={reminder}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </>
  );
};

export default Reminders;
