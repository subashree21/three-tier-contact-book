import React, { useEffect, useState } from "react";

function App() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const API_URL = "http://52.91.61.37:5000/contacts";

  const loadContacts = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setContacts(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const addContact = () => {
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        phone,
        email,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        loadContacts();
        setName("");
        setPhone("");
        setEmail("");
      });
  };

  const deleteContact = (id) => {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        loadContacts();
      });
  };

  const updateContact = (id) => {
    const newName = prompt("Enter new name");
    const newPhone = prompt("Enter new phone");
    const newEmail = prompt("Enter new email");

    if (!newName || !newPhone || !newEmail) {
      return;
    }

    fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newName,
        phone: newPhone,
        email: newEmail,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        loadContacts();
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Contact Book</h1>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Enter Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <br /><br />

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <button onClick={addContact}>Add Contact</button>

      <hr />

      {contacts.map((contact) => (
        <div key={contact.id}>
          <h3>{contact.name}</h3>

          <p>Phone: {contact.phone}</p>

          <p>Email: {contact.email}</p>

          <button onClick={() => updateContact(contact.id)}>
            Update
          </button>

          {"  "}

          <button onClick={() => deleteContact(contact.id)}>
            Delete
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;
