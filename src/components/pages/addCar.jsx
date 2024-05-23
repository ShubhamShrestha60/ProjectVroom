import React, { useState } from "react";
import "../styles/addCar.css";

const AddCar = () => {
  const [image, setImage] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const availability = e.target.availability.checked;
    const isAvailable = availability ? true : false;
    
    // Create FormData object to append form data
    const formData = new FormData();
    formData.append('brand', e.target.brand.value.toLowerCase());
    formData.append('fuelType', e.target.fuelType.value.toLowerCase());
    formData.append('transitionType', e.target.transitionType.value.toLowerCase());
    formData.append('segment', e.target.segment.value.toLowerCase());
    formData.append('price', e.target.price.value.toLowerCase());
    formData.append('location', e.target.location.value.toLowerCase());
    formData.append('availability', isAvailable);
    formData.append('condition', e.target.condition.value.toLowerCase());
    formData.append('image', image); // Append image file
    
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
          console.log('car added successfully: ' + data.car);
          window.alert('Car added successfully: ' + data.car);
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
          <input type="text" id="brand" name="brand" />
        </div>
        <div className="add-car__form-group">
          <label htmlFor="fuelType">Fuel Type:</label>
          <select id="fuelType" name="fuelType">
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
          </select>
        </div>
        <div className="add-car__form-group">
          <label htmlFor="transitionType">Transition Type:</label>
          <select id="transitionType" name="transitionType">
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>
        </div>
        <div className="add-car__form-group">
          <label htmlFor="segment">Segment:</label>
          <input type="text" id="segment" name="segment" />
        </div>
        <div className="add-car__form-group">
          <label htmlFor="price">Price:</label>
          <input type="number" id="price" name="price" />
        </div>
        <div className="add-car__form-group">
          <label htmlFor="location">Location:</label>
          <input type="text" id="location" name="location" />
        </div>
        <div className="add-car__form-group">
          <label htmlFor="availability">Availability:</label>
          <input type="checkbox" id="availability" name="availability" value="true"/>
        </div>
        <div className="add-car__form-group">
          <label htmlFor="condition">Condition:</label>
          <input type="text" id="condition" name="condition" />
        </div>
        <div className="add-car__form-group">
          <label htmlFor="image">Image:</label>
          <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} />
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
            <button onClick={handleConfirmSubmit}>Confirm</button>
            <button onClick={handleCancelSubmit}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCar;
