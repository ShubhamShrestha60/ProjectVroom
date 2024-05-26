import React, { useState } from "react";
import "../styles/addCar.css";

const AddCar = () => {
  const [image, setImage] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(null);
  const [formFields, setFormFields] = useState({
    brand: "",
    fuelType: "Petrol",
    transitionType: "Manual",
    segment: "",
    price: "",
    location: "",
    availability: false,
    condition: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormFields((prevFields) => ({
      ...prevFields,
      [name]: checked,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const { brand, fuelType, transitionType, segment, price, location, availability, condition } = formFields;

    if (!image) {
      alert("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append('brand', brand.toLowerCase());
    formData.append('fuelType', fuelType.toLowerCase());
    formData.append('transitionType', transitionType.toLowerCase());
    formData.append('segment', segment.toLowerCase());
    formData.append('price', price.toLowerCase());
    formData.append('location', location.toLowerCase());
    formData.append('availability', availability);
    formData.append('condition', condition.toLowerCase());
    formData.append('image', image);

    setFormData(formData);
    setShowModal(true);
  };

  const handleConfirmSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3002/addCar', { 
          method: 'POST',
          body: formData,
      });

      if (response.ok) {
          const data = await response.json();
          setConfirmationMessage('Car added successfully: ' + data.car);
          console.log('Car added successfully: ' + data.car);
          window.alert('Car added successfully: ' + data.car);
          window.location.reload();
      } else {
         setConfirmationMessage('Failed to add car: ' + response.statusText);
         window.alert('Failed to add car: ' + response.statusText);
      }
    } catch (error) {
       setConfirmationMessage('Failed to add car: ' + error.message);
       window.alert('Failed to add car: ' + error.message);
    } finally {
       setShowModal(false);
    }
  };

  const handleCancelSubmit = () => {
    setShowModal(false);
  };

  return (
    <div className="add-car">
      <h3 className="add-car__title">Add a New Car</h3>
      <form className="add-car__form" onSubmit={handleSubmit}>
        <div className="add-car__form-group">
          <label htmlFor="brand">Brand:</label>
          <input type="text" id="brand" name="brand" value={formFields.brand} onChange={handleInputChange} required />
        </div>
        <div className="add-car__form-group">
          <label htmlFor="fuelType">Fuel Type:</label>
          <select id="fuelType" name="fuelType" value={formFields.fuelType} onChange={handleInputChange} required>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
          </select>
        </div>
        <div className="add-car__form-group">
          <label htmlFor="transitionType">Transition Type:</label>
          <select id="transitionType" name="transitionType" value={formFields.transitionType} onChange={handleInputChange} required>
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>
        </div>
        <div className="add-car__form-group">
          <label htmlFor="segment">Segment:</label>
          <input type="text" id="segment" name="segment" value={formFields.segment} onChange={handleInputChange} required />
        </div>
        <div className="add-car__form-group">
          <label htmlFor="price">Price:</label>
          <input type="number" id="price" name="price" value={formFields.price} onChange={handleInputChange} required />
        </div>
        <div className="add-car__form-group">
          <label htmlFor="location">Location:</label>
          <input type="text" id="location" name="location" value={formFields.location} onChange={handleInputChange} required />
        </div>
        <div className="add-car__form-group">
          <label htmlFor="availability">Availability:</label>
          <input type="checkbox" id="availability" name="availability" checked={formFields.availability} onChange={handleCheckboxChange} />
        </div>
        <div className="add-car__form-group">
          <label htmlFor="condition">Condition:</label>
          <input type="text" id="condition" name="condition" value={formFields.condition} onChange={handleInputChange} required />
        </div>
        <div className="add-car__form-group">
          <label htmlFor="image">Image:</label>
          <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} required />
        </div>
        <button type="submit" className="add-car__submit-btn">
          Add Car
        </button>
      </form>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h4>Confirm Car Addition</h4>
            <p>Are you sure you want to add this car?</p>
            <div className="buttons">
              <button className="confirm-btn" onClick={handleConfirmSubmit}>Confirm</button>
              <button className="cancel-btn" onClick={handleCancelSubmit}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCar;
