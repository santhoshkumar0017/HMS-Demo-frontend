import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createTenant, updateTenant, getTenantById } from '../Service/TenantService';

function Tenantco() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setnumber] = useState("");
  const [type, settype] = useState("");
  const [room, setroom] = useState("");
  const [floor, setFloor] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    number: "",
    type: "",
    room: "",
    floor: ""
  });

  // Load data when id exists (update mode)
  useEffect(() => {
    if (id) {
      getTenantById(id)
        .then(response => {
          setName(response.data.name);
          setEmail(response.data.email);
          setnumber(response.data.number);
          settype(response.data.type);
          setroom(String(response.data.room));
          setFloor(String(response.data.floor));
        })
        .catch(error => console.error(error));
    }
  }, [id]);

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };

    if (name.trim()) errorsCopy.name = "";
    else { errorsCopy.name = "Name is required"; valid = false; }

    if (email.trim()) errorsCopy.email = "";
    else { errorsCopy.email = "Email is required"; valid = false; }

    if (number.trim()) errorsCopy.number = "";
    else { errorsCopy.number = "Phone Number is required"; valid = false; }

    if (type.trim()) errorsCopy.type = "";
    else { errorsCopy.type = "Room type is required"; valid = false; }

    if (room.trim()) errorsCopy.room = "";
    else { errorsCopy.room = "Room number is required"; valid = false; }

    if (floor.trim()) errorsCopy.floor = "";
    else { errorsCopy.floor = "Floor is required"; valid = false; }

    setErrors(errorsCopy);
    return valid;
  }

  function saveOrUpdateTenant(e) {
    e.preventDefault();

    if (!validateForm()) return;

    const tenant = {
      name,
      email,
      number,
      type,
      room: Number(room),
      floor: Number(floor)
    };

    if (id) {
      updateTenant(id, tenant)
        .then(() => navigate('/'))
        .catch(error => console.error(error));
    } else {
        console.log(tenant)
      createTenant(tenant)
        .then(() => 
            
            navigate('/')) 
        .catch(error => console.error(error));
    }
  }

  function pageTitle() {
    return id ?
      <h2 className="text-center">Update Tenant</h2> :
      <h2 className="text-center">Add Tenant</h2>;
  }

  return (
    <div className="container">
      <br /><br />
      <div className="row">

        <div className="card col-md-6 offset-md-3 offset-md-3">
          {pageTitle()}

          <div className="card-body">

            <form>

              <div className="form-group mb-2">
                <label>Name:</label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>

              <div className="form-group mb-2">
                <label>Email:</label>
                <input
                  type="text"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              <div className="form-group mb-2">
                <label>Phone Number:</label>
                <input
                  type="text"
                  className={`form-control ${errors.number ? 'is-invalid' : ''}`}
                  value={number}
                  onChange={(e) => setnumber(e.target.value)}
                />
                {errors.number && <div className="invalid-feedback">{errors.number}</div>}
              </div>

              <div className="form-group mb-2">
                <label>Room Type:</label>
                <select
                  className={`form-control ${errors.type ? 'is-invalid' : ''}`}
                  value={type}
                  onChange={(e) => settype(e.target.value)}
                >
                  <option value="">-- Select Room Type --</option>
                  <option value="AC">AC</option>
                  <option value="NON AC">NON AC</option>
                </select>
                {errors.type && <div className="invalid-feedback">{errors.type}</div>}
              </div>

              <div className="form-group mb-2">
                <label>Room No:</label>
                <select
                  className={`form-control ${errors.room ? 'is-invalid' : ''}`}
                  value={room}
                  onChange={(e) => setroom(e.target.value)}
                >
                  <option value="">-- Select Room No --</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                {errors.room && <div className="invalid-feedback">{errors.room}</div>}
              </div>

              <div className="form-group mb-2">
                <label>Floor:</label>
                <select
                  className={`form-control ${errors.floor ? 'is-invalid' : ''}`}
                  value={floor}
                  onChange={(e) => setFloor(e.target.value)}
                >
                  <option value="">-- Select Floor --</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
                {errors.floor && <div className="invalid-feedback">{errors.floor}</div>}
              </div>

              <button className="btn btn-success w-100" onClick={saveOrUpdateTenant}>
                Submit
              </button>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Tenantco;