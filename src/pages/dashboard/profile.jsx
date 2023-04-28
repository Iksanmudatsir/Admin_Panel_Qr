import {
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Checkbox,
} from "@material-tailwind/react";
import React, { Fragment, useState } from "react";
import { foods, snack, drinks } from "../../data/dataFood"
import data from "@/data/dataRemove";

export function Profile() {
  const [openTab, setOpenTab] = useState(1);

  const [showModal, setShowModal] = useState(false);

  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const EditModal = ({ isOpen, onClose, onSave, defaultValue }) => {
    // Set up local state for the input value
    const [value, setValue] = useState(defaultValue);
  
    // Handle the input value change
    const handleChange = (e) => {
      setValue(e.target.value);
    };
  
    // Handle the save button click
    const handleSave = () => {
      onSave(value);
    };
  }

  return (
    <>
    <div className="mt-12">
      <Typography className="w-56 h-8 text-2xl font-medium text-left text-black">
        Available Dishes
      </Typography>
      </div>
      <div className="container mt-12 justify-center items-center">
        <div className="flex flex-col items-center justify-center">
          <ul className="flex space-x-8">
            <li>
              <a
                href="#"
                onClick={() => setOpenTab(1)}
                className={`${
                  openTab === 1 ? "bg-[#a64b2a] text-white font-medium text-center" : ""
                } inline-block font-medium text-center px-4 py-2 w-36 bg-white rounded-[20px] shadow`}
              >
                Foods
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => setOpenTab(2)}
                className={`${
                  openTab === 2 ? "bg-[#a64b2a] text-white font-medium text-center" : ""
                } inline-block font-medium text-center px-4 py-2 w-36 bg-white rounded-[20px] rounded shadow`}
              >
                Snack
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => setOpenTab(3)}
                className={`${
                  openTab === 3 ? "bg-[#a64b2a] text-white font-medium text-center" : ""
                } inline-block font-medium text-center px-4 py-2 w-36 bg-white rounded-[20px] rounded shadow`}
              >
                Drinks
              </a>
            </li>
          </ul>
          <div className="mt-5 mx-auto w-96 h-1.5 rounded-[15px] bg-[#a64b2a]" />
          <div className="p-3 mt-6 w-full">
            <div className={openTab === 1 ? "block" : "hidden"}>
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Product Name</th>
                    <th className="px-4 py-2">Dish</th>
                    <th className="px-4 py-2">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {foods.map((item) => (
                    <tr key={item.foods}>
                      <td className="px-4 py-2 text-[#c50d11] font-semibold">{item.name}</td>
                      <td className="px-4 py-2 text-[#808080]/[0.87]">{item.dish} Dish</td>
                      <td className="px-4 py-2">{item.price}k</td>
                      <Button className="px-4 py-2 text-black bg-transparent">Edit</Button>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={openTab === 2 ? "block" : "hidden"}>
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Product Name</th>
                    <th className="px-4 py-2">Dish</th>
                    <th className="px-4 py-2">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {snack.map((item) => (
                    <tr key={item.snack}>
                      <td className="px-4 py-2 text-[#c50d11] font-semibold">{item.name}</td>
                      <td className="px-4 py-2 text-[#808080]/[0.87]">{item.dish} Dish</td>
                      <td className="px-4 py-2">{item.price}k</td>
                      <Button className="px-4 py-2 text-black bg-transparent">Edit</Button>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={openTab === 3 ? "block" : "hidden"}>
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Product Name</th>
                    <th className="px-4 py-2">Dish</th>
                    <th className="px-4 py-2">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {drinks.map((item) => (
                    <tr key={item.drinks}>
                      <td className="px-4 py-2 text-[#c50d11] font-semibold">{item.name}</td>
                      <td className="px-4 py-2 text-[#808080]/[0.87]">{item.dish} Dish</td>
                      <td className="px-4 py-2">{item.price}k</td>
                      <Button className="px-4 py-2 text-black bg-transparent">Edit</Button>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </div>
        </div>
        <div className="mt-5 mx-auto w-96 h-1.5 rounded-[15px] bg-[#a64b2a]"/>
            <div>
              <div className="flex w-max space-x-52 mx-auto mt-5 items-center justify-center">
                <Button className="bg-[#a64b2a] font-medium w-36 rounded-[20px] shadow" onClick={() => setShowModal(true)}>+ add new</Button>
                 {showModal && (
                   <Modal onClose={() => setShowModal(false)} />
                 )}
                <Button
                  className="bg-[#a64b2a] font-medium w-36 rounded-[20px] shadow" onClick={() => setShowRemoveModal(true)}> - Remove</Button>
                  {showRemoveModal && (
                    <Modal remove onClose={() => setShowRemoveModal(false)} />
                  )}
              </div>
            </div>
      </div>
    </>
  );
}

export default Profile;


function Modal({ onClose, remove }) {
  const [image, setImage] = useState(null);

  function handleFileUpload(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      setImage(event.target.result);
    };

    reader.readAsDataURL(file);
  }
  
  function handleRemoveImage() {
    setImage(null);
  }

  const [checkedItems, setCheckedItems] = useState([]);

  const handleCheck = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setCheckedItems([...checkedItems, parseInt(value)]);
    } else {
      setCheckedItems(checkedItems.filter((id) => id !== parseInt(value)));
    }
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setCheckedItems(data.map((item) => item.id));
    } else {
      setCheckedItems([]);
    }
  };

  const handleRemove = () => {
    const updatedData = data.filter(item => !checkedItems.includes(item.id));
    console.log("Removing Items: ", checkedItems)
    setData(updatedData);
    onClose();
  };


  if (remove) {
    return (
      <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex mx-auto items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="bg-[#f3f3f3] rounded-[5px] w-3/5 p-6 relative">
          <div className="relative flex justify-between">
          <h2 className="text-xl font-medium mb-3">Select Dishes To Remove</h2>
            <div className="top-0">
                <button onClick={onClose}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 relative" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M3.646 3.646a.5.5 0 01.708 0L10 9.293l5.646-5.647a.5.5 0 11.708.708L10.707 10l5.647 5.646a.5.5 0 01-.708.708L10 10.707l-5.646 5.647a.5.5 0 01-.708-.708L9.293 10 3.646 4.354a.5.5 0 010-.708z" clip-rule="evenodd" fill="black" />
                  </svg>
                </button>
              </div>
            </div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-[#a64b2a]"
              checked={checkedItems.length === data.length}
              onChange={handleSelectAll}
              ripple={true}
            />
            <span className="text-sm font-medium pt-1 pb-1">Select All</span>
          </label>
          {data.map((item) => (
            <label className="flex items-center space-x-2" key={item.id}>
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-[#a64b2a]"
                value={item.id}
                checked={checkedItems.includes(item.id)}
                onChange={handleCheck}
                ripple={true}
              />
              <span className="text-sm font-medium pt-1 pb-1">{item.label}</span>
            </label>
          ))}
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              onClick={() => {handleRemove(); onClose();}}
              className="bg-[#a64b2a] text-white rounded-md py-2 px-4 font-medium"
              ripple={true}
            >
              Remove
            </button>
            <button
              onClick={() => setCheckedItems([])}
              className="bg-gray-400 text-white rounded-md py-2 px-4 font-medium ml-2"
              ripple={true}
            >
              Clear Selection
            </button>
          </div>
        </div>
      </div>
    </div>
    );
  }
  else {
    return (
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex mx-auto items-center justify-center min-h-screen">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-[#F3F3F3] rounded-[5px] w-3/5 p-6 relative">
            <h2 className="text-xl font-medium mb-3">Add New</h2>
            <form className="space-y-3">
              <div>
                <div className="flex items-center justify-center w-full">
                  <label
                    className="relative flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300 overflow-auto">
                      <div className="absolute top-0 left-0 w-full h-full">
                        {image && (
                          <img src={image} alt="preview" className="absolute w-full h-full object-cover top-0 left-0" />
                        )}
                      </div>
                      <div className="flex flex-col items-center justify-center pt-7">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`w-8 h-8 text-gray-400 ${
                            image ? 'hidden' : 'group-hover:text-gray-600'
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoint="round"
                            stroke-width="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          ></path>
                        </svg>
                        <p
                          className={`pt-1 text-sm tracking-wider text-gray-400 ${
                            image ? 'hidden' : 'group-hover:text-gray-600'
                          }`}
                          >
                            Upload Image
                          </p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`absolute top-0 right-0 w-6 h-6 text-gray-600 ${
                              image ? 'block' : 'hidden'
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            onClick={handleRemoveImage}
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                      </div>
                        <input 
                          type="file" 
                          id="image" 
                          name="image" 
                          className="opacity-0 absolute top-0 left-0 w-full h-full" 
                          onChange={handleFileUpload} 
                          />
                    </label>
                </div>
              </div>
            <div>
              <label htmlFor="snackName" className="block font-medium text-sm text-[#181818] pb-1">Name</label>
              <input type="text" id="snackName" name="snackName" placeholder="input your food name" className="w-full rounded-[5px] bg-white pl-2 h-8" />
            </div>
            <div>
              <label htmlFor="category" className="block font-medium text-sm text-[#181818] pb-1">Category</label>
              <select id="category" name="category" className="w-full rounded-[5px] bg-white h-8">
                <option value="" className="text-gray-400">Select a category</option>
                <option value="appetizers">Foods</option>
                <option value="entrees">Snack</option>
                <option value="desserts">Drinks</option>
              </select>
            </div>
            <div>
              <label htmlFor="price" className="block font-medium text-sm text-[#181818] pb-1">Price</label>
              <input type="number, text" id="price" name="price" placeholder="price" className="w-full rounded-[5px] bg-white pl-2 h-8"/>
            </div>
            <div>
              <label htmlFor="dish" className="block font-medium text-sm text-[#181818] pb-1">Dish</label>
              <input type="number, text" id="dish" name="dish" placeholder="dish" className="w-full rounded-[5px] bg-white pl-2 h-8"/>
            </div>
            <div>
              <label htmlFor="description" className="block font-medium text-sm text-[#181818] pb-1">Description</label>
              <textarea id="description" name="description" placeholder="add description" rows="3" className="w-full rounded-[5px] bg-white pl-2"></textarea>
            </div>
            <div className="mt-6 flex justify-end">
              <Button type="submit" className="bg-[#a64b2a] text-white rounded-md py-2 px-4 font-medium" ripple={true}>+ Add To List</Button>
              <Button onClick={onClose} className="bg-gray-400 text-white rounded-md py-2 px-4 font-medium ml-2" ripple={true}>Close</Button>
            </div>
          </form>
          </div>
        </div>
      </div>
    );
  }
}