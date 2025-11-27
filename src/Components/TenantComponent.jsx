import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTenant, updateTenant, getTenantById } from "../Service/TenantService";


function TenantComponent() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [roomType, setRoomType] = useState("");
  const [roomNo, setRoomNo] = useState("");
  const [floor, setFloor] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    roomType: "",
    roomNo: "",
    floor: "",
  });

  useEffect(() => {
    if (id) {
      getTenantById(id)
        .then((response) => {
          setName(response.data.name);
          setEmail(response.data.email);
          setPhoneNumber(response.data.phoneNumber);
          setRoomType(response.data.roomType);
          setRoomNo(String(response.data.roomNo));
          setFloor(String(response.data.floor));
        })
        .catch((err) => console.error(err));
    }
  }, [id]);

  
  function saveOrUpdateTenants(e) {
    e.preventDefault();

    if (validateForm()) {
      const tenant = {
        name,
        email,
        phoneNumber,
        roomType,
        roomNo: Number(roomNo),
        floor: Number(floor)
      };

      console.log("Sending to backend:", tenant);

      if (id) {
        updateTenant(id, tenant)
          .then(() => navigate("/"))
          .catch((err) => console.log(err));
      } else {
        createTenant(tenant)
          .then(() => navigate("/"))
          .catch((err) => console.log(err));
      }
    }
  }

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };

    if (name.trim()) {
      errorsCopy.name = "";
    }
    else {
       errorsCopy.name = "Name is required"; valid = false;
       }

    if (email.trim()){
      errorsCopy.email = "";
    } 
    else { 
      errorsCopy.email = "Email is required"; valid = false;
     }

    if (phoneNumber.trim()) {
          errorsCopy.phoneNumber = "";
    }
    else {
       errorsCopy.phoneNumber = "Phone Number is required"; valid = false; 
      }

    if (roomType.trim()){
       errorsCopy.roomType = "";
    }
    else {
       errorsCopy.type = "Room type is required"; valid = false;
       }

    if (roomNo.trim()) {
      errorsCopy.roomNo = "";
    }
    else {
       errorsCopy.roomNo = "Room number is required"; valid = false;
       }

    if (floor.trim()){
     errorsCopy.floor = "";
    } 
    else { 
      errorsCopy.floor = "Floor is required"; valid = false; 
    }

    setErrors(errorsCopy);
    return valid;
  }


  function pageTitle() {
    return id ? (
      <h2 className="text-center">Update Tenant</h2>
    ) : (
      <h2 className="text-center">Add Tenant</h2>
    );
  }

  return (
    <div className="container">
      <br />
      <br />

      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          {pageTitle()}

          <div className="card-body">
            <form>

              <div className="form-group mb-2">
                <label className="form-label">Name:</label>
                <input
                  type="text"
                  value={name}
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Email:</label>
                <input
                  type="text"
                  value={email}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Phone Number:</label>
                <input
                  type="text"
                  value={phoneNumber}
                  className={`form-control ${errors.phoneNumber ? "is-invalid" : ""}`}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Room Type:</label>
                <select
                  value={roomType}
                  className={`form-control ${errors.roomType ? "is-invalid" : ""}`}
                  onChange={(e) => setRoomType(e.target.value)}
                >
                  <option value="">-- Select Room Type</option>
                  <option value="AC">AC</option>
                  <option value="NON AC">NON AC</option>
                </select>
                {errors.roomType && <div className="invalid-feedback">{errors.roomType}</div>}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Room No:</label>
                <select
                  value={roomNo}
                  className={`form-control ${errors.roomNo ? "is-invalid" : ""}`}
                  onChange={(e) => setRoomNo(e.target.value)}
                >
                  <option value="">-- Select Room No</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                {errors.roomNo && <div className="invalid-feedback">{errors.roomNo}</div>}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Floor:</label>
                <select
                  value={floor}
                  className={`form-control ${errors.floor ? "is-invalid" : ""}`}
                  onChange={(e) => setFloor(e.target.value)}
                >
                  <option value="">-- Select Floor</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
                {errors.floor && <div className="invalid-feedback">{errors.floor}</div>}
              </div>

              <button className="btn btn-success" onClick={saveOrUpdateTenants}>
                Submit
              </button>

            </form>
          </div>
        </div>
      </div>

    </div>
  );
}

export default TenantComponent;
