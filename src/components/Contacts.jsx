import React, { useEffect, useState } from "react";
import axios from "axios";

function Contacts() {
  const [edit, setEdit] = useState(1);
  const [cid, setCid] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [add, setAdd] = useState("");
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    (async () => await Load())();
  }, []);

  const Load = async () => {
    const result = await axios.get("https://localhost:7218/api/Contacts");
    setContacts(result.data);
  };

  const addContact = async (event) => {
    event.preventDefault();

    try {
      await axios.post("https://localhost:7218/api/Contacts", {
        fullName: name,
        email: email,
        phone: phone,
        address: add,
      });
      alert("Contact Added");
      setName("");
      setEmail("");
      setPhone("");
      setAdd("");
    } catch (err) {
      alert(err);
    }
  };

  const editContact = async (id) => {
    var result = await axios.get("https://localhost:7218/api/Contacts/" + id);
    result = result.data;
    setCid(result.id);
    setName(result.fullName);
    setPhone(result.phone);
    setEmail(result.email);
    setAdd(result.address);

    setEdit(0);
  };

  const updateContact = async (id) => {
    await axios.put("https://localhost:7218/api/Contacts/" + id, {
      fullName: name,
      email: email,
      phone: phone,
      address: add,
    });
    alert("Contact Updated");
    setEdit(0);
  };

  const deleteContact = async (id) => {
    await axios.delete("https://localhost:7218/api/Contacts/" + id)
    alert("Contact Deleted");
    Load();
  };

  return (
    <>
      <main>
        <div className="container mt-3">
          <form action="" className="form">
            <h1>Contacts</h1>
            <label htmlFor="" className="form-label mt-3">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />

            <label htmlFor="" className="form-label mt-3">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />

            <label htmlFor="" className="form-label mt-3">
              Phone
            </label>
            <input
              type="text"
              className="form-control"
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
              }}
            />

            <label htmlFor="" className="form-label mt-3">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              value={add}
              onChange={(event) => {
                setAdd(event.target.value);
              }}
            />

            {edit ? (
              <button className="btn btn-primary mt-3" onClick={addContact}>
                Save
              </button>
            ) : (
              <button
                className="btn btn-primary mt-3"
                onClick={updateContact(cid)}
              >
                Update
              </button>
            )}
          </form>
        </div>

        <table className="table table-dark m-4" align="center">
          <thead>
            <tr>
              <th scope="col">Full Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>

              <th scope="col">Option</th>
            </tr>
          </thead>
          {contacts.map((contact) => {
            return (
              <tbody>
                <tr>
                  <td>{contact.fullName}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.address}</td>

                  <td>
                    <button
                      type="button"
                      className="btn btn-warning mx-3"
                      onClick={() => editContact(contact.id)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => deleteContact(contact.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </main>
    </>
  );
}

export default Contacts;
