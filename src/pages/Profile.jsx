import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../useFetch";

const initialData = {
    fullName: "",
    phoneNumber: "", 
    houseNumber: "", 
    street: "", 
    city: "", 
    state: "", 
    country: "",
    pincode: "", 
    addressType: "",
  };

function AddressForm({mode, initialFormData, operationOnAddress, onCloseForm}) {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

    function handleChange(event) {
      const {name, value} = event.target;

      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));

      if(name === 'phoneNumber') {
        const isValidPhone = /^[6-9][0-9]{9}$/.test(value);

        if(isValidPhone) {
          setErrors((prevErrors) => {
            const {phoneNumber, ...remainingErrors} = prevErrors;
            return remainingErrors;
          });
        }
      }

      if(name === 'pincode') {
        const isValidPincode = /^[0-9]{6}$/.test(value);

        if(isValidPincode) {
          setErrors((prevErrors) => {
            const {pincode, ...remainingErrors} = prevErrors;

            return remainingErrors;
          })
        }
      }
  }

  function validateForm() {
    const newErrors = {};

    if(!/^[6-9][0-9]{9}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid 10-digit phone number.";
    }

    if(!/^[0-9]{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Pincode must contain exactly 6 digits valid number."
    }

    return newErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // console.log(formData);

    if(mode === 'Add') {
      const newAddress = {
        ...formData,
      };

      const success = await  operationOnAddress(newAddress);

      if(!success) {
        return;
      }
    } else if(mode === 'Edit') {
      const changesInAddress = {
        ...formData,
      };

      const success = await operationOnAddress(initialFormData._id, changesInAddress);

      if(!success) {
        return;
      }
    }

    setErrors({});
    setFormData(initialData);
    onCloseForm();
  }

  return (
    <div className="card bordder mt-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="mb-0">{mode === "Add" ? "Add New Address" : "Edit Address"}</h4>
          <button type="button" className="btn-close" aria-label="Close" onClick={onCloseForm}/>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row g-5">

            <div className="col-md-6">
              <label htmlFor="fullName" className="form-label" >Full Name: </label>
              <input 
                type='text' 
                id="fullName" 
                name="fullName"
                className="form-control"
                value={formData.fullName} 
                onChange={handleChange} 
                required
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="phoneNumber" className="form-label" >Phone Number: </label>
              <input 
                type='tel' 
                id="phoneNumber" 
                name="phoneNumber"
                className="form-control"
                value={formData.phoneNumber} 
                onChange={handleChange} 
                maxLength="10"
                required
              />
              {errors.phoneNumber && (
                <p className="text-danger small mt-1">{errors.phoneNumber}</p>
              )}
            </div>

            <div className="col-md-4">
              <label htmlFor="houseNumber" className="form-label" >House Number: </label>
              <input 
                type='text' 
                id="houseNumber" 
                name="houseNumber"
                className="form-control"
                value={formData.houseNumber} 
                onChange={handleChange} 
                required
              />
            </div>

            <div className="col-md-8">
              <label htmlFor="street" className="form-label">Street: </label>
              <input 
                type="text" 
                id="street" 
                name="street"
                className="form-control"
                value={formData.street} 
                onChange={handleChange} 
                required
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="city" className="form-label" >City: </label>
              <input 
                type="text" 
                id="city" 
                name="city"
                className="form-control"
                value={formData.city} 
                onChange={handleChange} 
                required
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="state" className="form-label">State: </label>
              <input 
                type="text" 
                id="state" 
                name="state"
                className="form-control"
                value={formData.state} 
                onChange={handleChange} 
                required
              />
            </div>
            
            <div className="col-md-4">
              <label htmlFor="country" className="form-label">Country: </label>
              <input 
                type="text" 
                id="country" 
                name="country"
                className="form-control"
                value={formData.country} 
                onChange={handleChange} 
                required
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="pincode" className="form-label">Pincode: </label>
              <input 
                type="text" 
                id="pincode" 
                name="pincode"
                className="form-control"
                value={formData.pincode} 
                onChange={handleChange} 
                maxLength="6"
                required
              />
              {errors.pincode && (
                <p className="text-danger small mt-1">{errors.pincode}</p>
              )}
            </div>

            <div className="col-md-6">
              <label htmlFor="addressType" className="form-label">Address Type: </label>
              <select 
                id="addressType" 
                name="addressType"
                className="form-select"
                value={formData.addressType} 
                onChange={handleChange} 
                required
              >
                <option value="">Select Address Type</option>
                <option value="Home">Home</option>
                <option value="Work">Work</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="d-flex gap-2 mt-4">

            <button type="submit" className="btn btn-dark">
              {mode === "Add" ? "Add Address" : "Update Address"}
            </button>
            <button type="button" className="btn btn-outline-secondary" onClick={onCloseForm}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AddressCard({address, deleteAddress, openAddressForm}) {
  const confirmDeletion = (id) => {
    const userConfirmed = window.confirm("Are you sure you want to delete this address.")
    if(userConfirmed) {
      deleteAddress(id);
    }
  };

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title fw-bold mb-0">{address.fullName}</h5>
          <span className="badge text-bg-secondary">{address.addressType}</span>
        </div>
          
          <p className="mb-2"><strong>Phone: </strong>{address.phoneNumber}</p>
          <p className="mb-2 text-muted">{address.houseNumber}, {address.street}</p>
          <p className="mb-2 text-muted">{address.city}, {address.state}</p>
          <p className="mb-3 text-muted">{address.country} - {address.pincode}</p>
          
          <div className="d-flex gap-2">
            <button type="button" className="btn btn-outline-dark btn-sm" onClick={() => openAddressForm(address)}>Edit</button>
            <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => confirmDeletion(address._id)}>Delete</button>
          </div>

      </div>
    </div>
  );
}

function AddressList({ addresses, onAddAddress, deleteAddress, onEditAddress }) {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  function handleCloseForm() {
    setShowAddressForm(false);
    setEditingAddress(null);
  }

  function handleOpenForm(address) {
    setEditingAddress(address);
    setShowAddressForm(true);
  }

  function openAddAddressForm() {
    setShowAddressForm(true);
    setEditingAddress(null);
  }

  return (
    <div className="card bg-light border-0 mb-4">
      <div className="card-body">
        <h3 className="mb-0">Saved Addresses</h3>
        <p className="text-muted small mb-4">Manage your delivery addresses</p>

        {addresses.length === 0 ? (
          <div>
            <p>You haven't added any address yet.</p>
          </div>
        ) : (
          <div className="row g-3 mb-4">
            {addresses.map((address) => (
              <div className="col-md-6" key={address._id}>
                <AddressCard key={address._id} address={address} deleteAddress={deleteAddress} openAddressForm={handleOpenForm} />
              </div>
            ))}
          </div>
        )}

        <button type='button' className="btn btn-dark" onClick={openAddAddressForm}> + Add Address</button>

        {showAddressForm && (
          editingAddress === null 
            ? <AddressForm mode='Add' initialFormData={initialData} operationOnAddress={onAddAddress} onCloseForm={handleCloseForm} />
            : <AddressForm mode='Edit' initialFormData={editingAddress} operationOnAddress={onEditAddress} onCloseForm={handleCloseForm} />
        )}
      </div>
    </div>
  );
}

function UserProfileInfo({profileInfo, addresses, onAddAddress, deleteAddress, onEditAddress}) {
  
  return (
    <div className="card-body">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">My Profile</h2>
          <small className="text-muted mb-0">Manage your personal information and addresses</small>
        </div>
      </div>

      <div className="card bg-light border-0 mb-4">
        <div className="card-body">
          <h3 className="mb-3">Personal Information</h3>
          <div className="row g-3">
            <div className="col-md-6">
              <small className="text-muted d-block">First Name</small>
              <strong>{profileInfo.firstName}</strong>
            </div>

            <div className="col-md-6">
              <small className="text-muted d-block">Last Name</small>
              <strong>{profileInfo.lastName}</strong>
            </div>

            <div className="col-md-6">
              <small className="text-muted d-block">Email</small>
              <strong>{profileInfo.email}</strong>
            </div>

            <div className="col-md-6">
              <small className="text-muted d-block">Phone Number</small>
              <strong>{profileInfo.mobileNumber}</strong>
            </div>

            <div className="col-md-6">
              <small className="text-muted d-block">Date of Birth</small>
              <strong>{profileInfo.dob}</strong>
            </div>

            <div className="col-md-6">
              <small className="text-muted d-block">Gender</small>
              <strong>{profileInfo.gender}</strong>
            </div>

          </div>
        </div>
      </div>

      <AddressList addresses={addresses} onAddAddress={onAddAddress} deleteAddress={deleteAddress} onEditAddress={onEditAddress} />
    </div>
  );
}

function OrderList() {
  return (
    <div className="card-body text-center">
      <h2 className="mb-4">Order List</h2>
      <div className="card bg-light border-0 mb-4">
        <div className="card-body">
          <p className="mb-1 small text-muted">You haven't placed any orders yet.</p>
          <p className="mb-1 small text-muted">We can't wait to have you as a customer.</p>
          <br />
          <p className="mb-3 small text-muted">Take a look at our products here</p>
          <Link to="/books" className="btn btn-outline-secondary">View Products</Link>
        </div>
      </div>
    </div>
  );
}

export default function Profile() {
  const [activeSection, setActiveSection] = useState('profile')
  const [addresses, setAddresses] = useState([]);

  const { data, loading, error } = useFetch(`https://book-nest-project1.vercel.app/addresses`);

  console.log(data);

  useEffect(() => {
    if(data?.addresses) {
      setAddresses(data.addresses);
    }
  }, [data]);

  if (loading) {
        return <p className="text-center mt-5">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-danger mt-5">Something went wrong while fetching the book.</p>;
    }

    if (!data) {
        return <p className="text-center mt-5">Address not found.</p>;
    }

  const profileInfo = {
    firstName: "John", 
    lastName: "Doe",
    email: "johndoe@example.com", 
    mobileNumber: "8902341234",
    dob: "27 Sept 1998",
    gender: "Male"
  };

  const initials = `${profileInfo.firstName[0]}${profileInfo.lastName[0]}`.toUpperCase();


  const handleAddAddress = async (newAddress) => {
    try {
      const response = await fetch(
        "https://book-nest-project1.vercel.app/addresses", 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newAddress),
        }
      );

      const data = await response.json();

      if(!response.ok) {
        throw new Error(data.message || "Failed to add address.");
      }

      setAddresses((prevAddresses) => [
        ...prevAddresses,
        data.address,
      ]);

      return true;
    } catch(error) {
      console.error("Error while adding address.", error);
      return false;
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      const response = await fetch(
        `https://book-nest-project1.vercel.app/addresses/${id}`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();

      if(!response.ok) {
        throw new Error(data.message || "Failed to delete the address.");
      }

      setAddresses((prevAddresses) =>
        prevAddresses.filter((address) => address._id !== id)
      );

      return true;
    } catch(error) {
      console.error("Error while deleting address: ", error);
      return false;
    }
  };

  const handleEditAddress = async (id, changesInAddress) => {
    try {
      const response = await fetch(
        `https://book-nest-project1.vercel.app/addresses/${id}`,
        {
          method: "PUT", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(changesInAddress),
        }
      );

      const data = await response.json();

      if(!response.ok) {
        throw new Error(data.message || "Failed to update address");
      }

      setAddresses((prevAddresses) => 
        prevAddresses.map((address) => 
          address._id === id ? data.address : address
        )
      );

      return true;
    } catch(error) {
      console.error("Error while updating address: ", error);
      return false;
    }
  };

  return (
    <div className="container-fluid">
      <div className="row py-4">
        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <div className="d-flex justify-content-center align-items-center gap-3 mb-4">
                <div className="d-flex align-items-center justify-content-center rounded-circle bg-dark text-white fs-3 fw-bold" style={{width: "80px", height: "80px"}}>{initials}</div>
                <div className="mb-1">
                  <h5 className="mb-0">{profileInfo.firstName}</h5>
                  <h5>{profileInfo.lastName}</h5>
                </div>
              </div>
              <div className="d-flex flex-column gap-2">
                <Link to="/" className="btn btn-light text-start">🏚️ Home</Link>
                <button className={`btn text-start ${activeSection === 'profile' ? "btn-dark" : "btn-light"}`} onClick={() => setActiveSection('profile')}>👤 My Profile</button>
                <button className={`btn text-start ${activeSection === 'orders' ? "btn-dark" : "btn-light"}`} onClick={() => setActiveSection('orders')}>👜 My Orders</button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          {activeSection === 'profile' && (
            <div className="card shadow-sm border-0">
              <UserProfileInfo 
                profileInfo={profileInfo} 
                addresses={addresses} 
                onAddAddress={handleAddAddress} 
                deleteAddress={handleDeleteAddress} 
                onEditAddress={handleEditAddress}
              />
            </div>
          )}
          {activeSection === 'orders' && (
            <div className="card"><OrderList /></div>
          )}          
        </div>
      </div>
    </div>
  );
}
