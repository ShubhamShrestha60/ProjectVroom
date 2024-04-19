import React, { useState } from "react";
import "../styles/addCar.css";

const AddCar = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create FormData object to append form data
    const formData = new FormData();
    formData.append('make', e.target.make.value);
    formData.append('model', e.target.model.value);
    formData.append('year', e.target.year.value);
    formData.append('color', e.target.color.value);
    formData.append('licensePlate', e.target.licensePlate.value);
    formData.append('image', image); // Append image file
    
    try {
      const response = await fetch('http://localhost:3001/addCar', { 
          method: 'POST',
          body: formData,
      });

      if (response.ok) {
          const data = await response.json();
          console.log('Car added successfully:', data.car);
      } else {
          console.error('Failed to add car:', response.statusText);
      }
  } catch (error) {
      console.error('Failed to add car:', error.message);
  }
};

  return (
    <div className="add-car">
      <h3 className="add-car__title">Add a New Car</h3>
      <form className="add-car__form" onSubmit={handleSubmit}>
        <div className="add-car__form-group">
          <label htmlFor="make">Make:</label>
          <input type="text" id="make" name="make" />
        </div>
        <div className="add-car__form-group">
          <label htmlFor="model">Model:</label>
          <input type="text" id="model" name="model" />
        </div>
        <div className="add-car__form-group">
          <label htmlFor="year">Year:</label>
          <input type="number" id="year" name="year" />
        </div>
        <div className="add-car__form-group">
          <label htmlFor="color">Color:</label>
          <input type="text" id="color" name="color" />
        </div>
        <div className="add-car__form-group">
          <label htmlFor="licensePlate">License Plate:</label>
          <input type="text" id="licensePlate" name="licensePlate" />
        </div>
        <div className="add-car__form-group">
          <label htmlFor="image">Image:</label>
          <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} />
        </div>
        <button type="submit" className="add-car__submit-btn">
          Add Car
        </button>
      </form>
    </div>
  );
};
 
export default AddCar;
