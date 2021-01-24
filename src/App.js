import { useState, useEffect } from "react";
import { HashRouter, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Reminders from "./components/Reminders";
import AddReminder from "./components/AddReminder";
import About from "./components/About";

const App = () => {
  const [showAddReminder, setShowAddReminder] = useState(false);
  const [reminders, setReminders] = useState([]);
  const REMINDER_API = "https://h-rem-tracker-service.herokuapp.com";

  useEffect(() => {
    // const getReminders = async () => {
    //   const remindersFromServer = await fetchReminders();
    //   setReminders(remindersFromServer);
    // };

    fetchReminders();
  }, []);

  // Fetch Reminders
  const fetchReminders = async () => {
    const res = await fetch(`${REMINDER_API}/reminders`);
    const data = await res.json();
    setReminders(data);
  };

  // Fetch Reminder
  const fetchReminder = async (id) => {
    const res = await fetch(`${REMINDER_API}/reminders/${id}`);
    const data = await res.json();

    return data;
  };

  // Add Reminder
  const addReminder = async (reminder) => {
    const res = await fetch(`${REMINDER_API}/reminders`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(reminder),
    });

    const data = await res.json();

    setReminders([...reminders, data]);
    setShowAddReminder(false);

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newReminder = { id, ...highlight }
    // setReminders([...reminders, newReminder])
  };

  // Delete Reminder
  const deleteReminder = async (id) => {
    await fetch(`${REMINDER_API}/reminders/${id}`, {
      method: "DELETE",
    });

    setReminders(reminders.filter((reminder) => reminder.id !== id));
  };

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const reminderToToggle = await fetchReminder(id);
    const updReminder = {
      ...reminderToToggle,
      highlight: !reminderToToggle.highlight,
    };

    const res = await fetch(`${REMINDER_API}/reminders/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updReminder),
    });

    const data = await res.json();

    setReminders(
      reminders.map((reminder) =>
        reminder.id === id
          ? { ...reminder, highlight: data.highlight }
          : reminder
      )
    );
  };

  return (
    <HashRouter basename="/">
      <div className="container">
        <Header
          onAdd={() => setShowAddReminder(!showAddReminder)}
          showAdd={showAddReminder}
        />
        <Route
          path="/"
          exact
          render={(props) => (
            <>
              {showAddReminder && <AddReminder onAdd={addReminder} />}
              {reminders.length > 0 ? (
                <Reminders
                  reminders={reminders}
                  onDelete={deleteReminder}
                  onToggle={toggleReminder}
                />
              ) : (
                "No Reminders To Show"
              )}
            </>
          )}
        />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
