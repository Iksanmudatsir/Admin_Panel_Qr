import {
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { foods, snack, drinks } from "../../data/dataFood"

export function Profile() {
  const [openTab, setOpenTab] = useState(1);

  const [showModal, setShowModal] = useState(false);

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
                className={` ${openTab === 1 ? "bg-[#a64b2a] text-white font-medium text-center" : ""} inline-block font-medium text-center px-4 py-2 w-36 bg-white rounded-[20px] shadow`}
                >
                Foods
              </a>
             </li>
             <li>
              <a
                href="#"
                onClick={() => setOpenTab(2)}
                className={` ${openTab === 2 ? "bg-[#a64b2a] text-white font-medium text-center" : ""} inline-block font-medium text-center px-4 py-2 w-36 bg-white rounded-[20px] rounded shadow`}
              >
                Snack
              </a>
             </li>
             <li>
              <a
                href="#"
                onClick={() => setOpenTab(3)}
                className={` ${openTab === 3 ? "bg-[#a64b2a] text-white font-medium text-center" : ""} inline-block font-medium text-center px-4 py-2 w-36 bg-white rounded-[20px] rounded shadow`}
              >
                Drinks
              </a>
             </li>
          </ul>
          <div className="mt-5 mx-auto w-96 h-1.5 rounded-[15px] bg-[#a64b2a]"/>
          <div className="p-3 mt-6 w-full">
            <div className={openTab === 1 ? "block" : "hidden"}>
              {" "}
              {foods.map(item => (
                <div key={item.foods} className="flex justify-between items-center">
                  <small className="pb-2 flex items-center text-sm text-left gap-1 font-semibold text-[#c50d11]">
                    {item.name}
                  </small>
                  <small className="text-sm font-medium text-left text-[#181818]/50">
                    {item.dish} Dish
                  </small>
                </div>
              ))}
            </div>
            <div className={openTab === 2 ? "block" : "hidden"}>
            {snack.map(item => (
              <div key={item.snack} className="flex justify-between items-center">
                <small className="pb-2 flex items-center text-sm text-left gap-1 font-semibold text-[#c50d11]">
                  {item.name}
                  </small>
                <small className="text-sm font-medium text-left text-[#181818]/50">
                  {item.dish} Dish
                  </small>
              </div>
               ))}
              </div>
            <div className={openTab === 3 ? "block" : "hidden"}>
             {drinks.map(item => (
              <div key={item.drinks} className="flex justify-between item-center">
                <small className="pb-2 flex items-center text-sm text-left gap-1 font-semibold text-[#c50d11]">
                  {item.name}
                </small>
                <small className="text-sm font-medium text-left text-[#181818]/50">
                  {item.dish} Dish
                </small>
                </div>
             ))}
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
                  className="bg-[#a64b2a] font-medium w-36 rounded-[20px] shadow"
                  ripple={true}
                >
                  - Remove
                </Button>
              </div>
            </div>
      </div>
    </>
  );
}

export default Profile;

function Modal({ onClose }) {
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

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex mx-auto items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="bg-[#F3F3F3] rounded-[5px] w-6/12 p-6 relative">
          <h2 className="text-xl font-medium mb-3">Add New</h2>
           <form className="space-y-3">
          <div>
              <div className="flex items-center justify-center w-full">
                <label
                  className="relative flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                    
                      {image && (
                        <img src={image} alt="preview" className="absolute w-full h-full object-cover" />
                      )}
                    
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
            <label htmlFor="snackName" className="block font-medium">Snack Name</label>
            <input type="text" id="snackName" name="snackName" className="w-full" />
          </div>
          <div>
            <label htmlFor="category" className="block font-medium">Category</label>
            <select id="category" name="category" className="w-full">
              <option value="">Select a category</option>
              <option value="appetizers">Appetizers</option>
              <option value="entrees">Entrees</option>
              <option value="desserts">Desserts</option>
            </select>
          </div>
          <div>
            <label htmlFor="price" className="block font-medium">Price</label>
            <input type="number" id="price" name="price" className="w-full" />
          </div>
          <div>
            <label htmlFor="description" className="block font-medium">Description</label>
            <textarea id="description" name="description" rows="3" className="w-full"></textarea>
          </div>
          <div className="mt-6">
            <Button type="submit" className="bg-[#a64b2a] text-white rounded-md py-2 px-4 font-medium" ripple={true}>Add Food</Button>
            <Button onClick={onClose} className="bg-gray-400 text-white rounded-md py-2 px-4 font-medium ml-2" ripple={true}>Close Modal</Button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}