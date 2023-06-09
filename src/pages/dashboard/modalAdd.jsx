import React, { Fragment, useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import AxiosInstance from "@/utils/AxiosInstance";

export function Modal({ onClose }) {
  const [title, setTitle] = useState();
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState();
  const [desc, setDesc] = useState();
  const [imageURL, setImageURL] = useState();

  const formData = new FormData();

  const handleCancel = () => {
    onClose();
  };

  const handleAddNew = async (e) => {
    e.preventDefault();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('desc', desc);
    formData.append('image', imageURL);
    formData.append('available', 1);

    await AxiosInstance.post('/item',
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        },
      })
      .then((res) => res)
      .then(() => {
        onClose();
      })

  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setImageURL(file);

    const reader = new FileReader();

    reader.onload = function (event) {
      setImage(event.target.result);
    };

    reader.readAsDataURL(file);
  };

  const [image, setImage] = useState(null);

  function handleRemoveImage() {
    setImage(null);
  }

  return (
    <form onSubmit={(e) => handleAddNew(e)} className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex mx-auto items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="bg-[#F3F3F3] rounded-[5px] w-3/5 p-6 relative flex-row">
          <h2 className="text-xl font-medium mb-3 space-y-3">Add New</h2>
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
                    xmlns="http:.w3.org/2000/svg"
                    className={`w-8 h-8 text-gray-400 ${image ? 'hidden' : 'group-hover:text-gray-600'
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
                    className={`pt-1 text-sm tracking-wider text-gray-400 ${image ? 'hidden' : 'group-hover:text-gray-600'
                      }`}
                  >
                    Upload Image
                  </p>
                  <svg
                    xmlns="http:.w3.org/2000/svg"
                    className={`absolute top-0 right-0 w-6 h-6 text-gray-600 ${image ? 'block' : 'hidden'
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
                  required
                />
              </label>
            </div>
          </div>
          <div>
            <label htmlFor="name" className="block font-medium text-sm text-[#181818] pb-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Item Nae"
              // className="w-full rounded-[5px] bg-white pl-2 h-8"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="category" className="block font-medium text-sm text-[#181818] pb-1">Category</label>
            <select id="category" name="category" className="w-full rounded-[5px] bg-white h-8" value={category} onChange={(e) => {
              setCategory(e.target.value)
            }}>
              <option value="" className="text-gray-400">Select a category</option>
              <option value="makanan">Makanan</option>
              <option value="cemilan">Cemilan</option>
              <option value="minuman">Minuman</option>
            </select>
          </div>
          <div>
            <label htmlFor="price" className="block font-medium text-sm text-[#181818] pb-1">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="in Rp"
              className="w-full rounded-[5px] bg-white pl-2 h-8"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          {/* <div>
            <label htmlFor="dish" className="block font-medium text-sm text-[#181818] pb-1">Dish</label>
            <input type="number, text" id="dish" name="dish" placeholder="dish" className="w-full rounded-[5px] bg-white pl-2 h-8"/>
          </div> */}
          <div>
            <label htmlFor="description" className="block font-medium text-sm text-[#181818] pb-1">Description</label>
            <textarea id="description" name="description" placeholder="add description" rows="3" className="w-full rounded-[5px] bg-white pl-2" value={desc} onChange={(e) => setDesc(e.target.value)} />
          </div>
          <div className="mt-6 flex justify-between">
            <Button onClick={() => handleCancel()} className="bg-gray-400 text-white rounded-md py-2 px-4 font-medium ml-2" ripple={true}>Cancel</Button>
            <Button
              type="submit"
              onClick={(e) => handleAddNew(e)}
              className="bg-[#a64b2a] text-white rounded-md py-2 px-4 font-medium"
            // ripple={true}
            >+ Add Item</Button>
          </div>
        </div>
      </div>
    </form >
  );
}