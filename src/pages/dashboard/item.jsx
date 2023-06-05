import {
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Checkbox,
} from "@material-tailwind/react";
import React, { Fragment, useEffect, useState } from "react";
import { foods, snack, drinks } from "../../data/dataFood"
import data from "@/data/dataRemove";
import AxiosInstance from "@/utils/AxiosInstance";
import { Modal } from "./modalAdd";
import { BASE_URL_MENU } from "@/utils/constant";

export function Item() {
  const [items, setItems] = useState([]);

  const fetchItem = async () => {
    await AxiosInstance.get('/item').then((res) => {
      setItems([...res.data]);
    });
  }
  
  const [openTab, setOpenTab] = useState('makanan');

  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const [isModalopenRemoved, setIsModalOpenRemoved] = useState(false);

  const handleDeleteConfirm = () => {
    setIsModalOpenRemoved(false);
  };

  const handleDeleteCancel = () => {
    setIsModalOpenRemoved(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  

  // field data
  const [newTitle, setNewTitle] = useState()
  const [newCategory, setNewCategory] = useState()
  const [newPrice, setNewPrice] = useState()
  const [newDesc, setNewDesc] = useState()
  const [newImageURL, setNewImageURL] = useState()

  const handleEditButtonClick = (item) => {
    setSelectedItem(item);
    setNewTitle(item.title)
    setNewCategory(item.category)
    setNewPrice(item.price)
    setNewDesc(item.desc)
    setNewImageURL(item.imageURL)
    
    setIsModalOpen(true);
  }
  
  const handleSaveChanges = async (id) => {
    await AxiosInstance.post(`/item/update/${id}`,
    {
      title: newTitle,
      category: newCategory,
      price: newPrice,
      desc: newDesc,
      imageURL: newImageURL
    }).then(() => {
      setIsModalOpen(false)
    }).then(() => {
      window.location.reload(false);
    })
  }

  const handleCancelChanges = () => {
    setIsModalOpen(false);
  }

  const [selectedItemId, setSelectedItemId] = useState(null);

  const [selectedItemIds, setSelectedItemIds] = useState([]);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInputChange = (event) => {
    const file = event.target.file[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy'
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
    } else {
      setSelectedfile(null)
    }
  }

  const validateFile = (file) => {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/gif'];
    const maxSize = 100 * 1024 * 1024;
    if (allowedTypes.includes(file.type) && file.size <= maxSize) {
      return true;
    }
    return false;
  };


  useEffect(() => {
    fetchItem();
    console.log('itemsmse', items)
  }, [])
  
  return (
    <>
    <div className="mt-12">
      <Typography className="w-56 h-8 text-2xl font-medium text-left text-black">
        Items
      </Typography>
      </div>
      <div className="container mt-12 justify-center items-center">
        <div className="flex flex-col items-center justify-center">
        <ul className="flex space-x-8">
        <li>
              <a
                href="#"
                onClick={() => setOpenTab('makanan')}
                className={`${
                  openTab === 'makanan' ? "bg-[#a64b2a] text-white font-medium text-center" : ""
                } inline-block font-medium text-center px-4 py-2 w-36 bg-white rounded-[20px] shadow`}
              >
                Makanan
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => setOpenTab('cemilan')}
                className={`${
                  openTab === 'cemilan' ? "bg-[#a64b2a] text-white font-medium text-center" : ""
                } inline-block font-medium text-center px-4 py-2 w-36 bg-white rounded-[20px] rounded shadow`}
              >
                Cemilan
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => setOpenTab('minuman')}
                className={`${
                  openTab === 'minuman' ? "bg-[#a64b2a] text-white font-medium text-center" : ""
                } inline-block font-medium text-center px-4 py-2 w-36 bg-white rounded-[20px] rounded shadow`}
              >
                Minuman
              </a>
            </li>
        </ul>
        </div>
        <div className="mt-5 mx-auto w-96 h-1.5 rounded-[15px] bg-[#a64b2a]" />
          <div className="p-3 mt-6 w-full">
            <table className="table-auto w-full">
              <thead>
                <tr>
                <th className="px-4 py-2 text-left w-0">
                  Image
                </th>
                  <th className="px-4 py-2 text-left">Product Name</th>
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-left"></th>
                </tr>
              </thead>
              <tbody>
                {items.filter((item, id) => item.category === openTab).map((item, id) => {
                  return (
                    <tr key={id}>
                      <td className="px-4 py-2">
                      <img src={BASE_URL_MENU + '/' + item.imageURL} />
                      </td>
                      <td className="px-4 py-2 text-[#c50d11] font-semibold w-2/5">{item.title}</td>
                      <td className="px-4 py-2">Rp{item.price}</td>
                      <td className="px-4 py-2 w-56">
                        <Button 
                          className="px-4 py-2 text-white bg-[#a62b2a]"
                          onClick={() => handleEditButtonClick(item)}
                        >
                          Edit
                        </Button>
                        {isModalopenRemoved && (
                          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20">
                            <div className="bg-white p-4 rounded-lg">
                            <button className="flex items-center justify-center text-gray-500 hover:text-red-500 ml-80" onClick={() => setIsModalOpenRemoved(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current" viewBox="0 0 20 20" fill="currentColor">
                                  <path fill-rule="evenodd" d="M3.646 3.646a.5.5 0 01.708 0L10 9.293l5.646-5.647a.5.5 0 11.708.708L10.707 10l5.647 5.646a.5.5 0 01-.708.708L10 10.707l-5.646 5.647a.5.5 0 01-.708-.708L9.293 10 3.646 4.354a.5.5 0 010-.708z" clip-rule="evenodd" fill="black" />
                                </svg>
                            </button>
                            <div className="flex flex-col items-center">
                              <div className="flex justify-center mb-4">
                                <svg
                                  className="w-10 h-10 text-red-500"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 15a7 7 0 110-14 7 7 0 010 14zm1-11h-2v6h2v-6zm0 8h-2v2h2v-2z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                              <p className="text-sm mb-4 font-medium">Are you sure you want to delete the selected items?</p>
                              <div className="flex justify-center mb-4">
                                <Button
                                  className="px-4 py-2 text-white bg-red-500 rounded-lg mr-2"
                                  onClick={handleDeleteConfirm}
                                >
                                  Delete
                                </Button>
                                <Button
                                  className="px-4 py-2 text-gray-500 border bg-white rounded-lg order-gray-500"
                                  onClick={handleDeleteCancel}
                                >
                                  Cancel
                                </Button>
                              </div>
                              </div>
                            </div>
                          </div>
                        )}      
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {isModalOpen && selectedItem && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-4 rounded-lg p-6">
                  <div className="flex justify-between items-center">
                  <Typography className="text-lg font-bold text-left text-[#181818]">
                    Edit Product
                  </Typography>
                  <button onClick={() => setIsModalOpen(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 relative" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M3.646 3.646a.5.5 0 01.708 0L10 9.293l5.646-5.647a.5.5 0 11.708.708L10.707 10l5.647 5.646a.5.5 0 01-.708.708L10 10.707l-5.646 5.647a.5.5 0 01-.708-.708L9.293 10 3.646 4.354a.5.5 0 010-.708z" clip-rule="evenodd" fill="black" />
                    </svg>
                 </button>
                 </div>
                  <hr className="w-full my-2"/>
                  <div className="flex justify-between items-center">
                    <h3>Product Name</h3>
                    <p className="mr-40">Category</p>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <input type="text" id="product-name" className="px-2 py-1 border border-gray-300 rounded-md mr-4" value={newTitle} onChange={(e) => setNewTitle(e.target.value)}/>
                    <select
                      id="Category"
                      className="px-2 pr-32 py-1 border border-gray-300 rounded-md w-full"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                    >
                      <option value="makanan">Makanan</option>
                      <option value="cemilan">Cemilan</option>
                      <option value="minuman">Minuman</option>
                    </select>
                  </div>
                  <p>Price</p>
                    <input type="number" id="price" className="px-2 py-1 border border-gray-300 rounded-md mb-4" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
                  <p>Product Description</p>
                    <div>
                      <input type="text" id="description" name="description" className="py-2 px-2 w-full rounded-[5px] pl-2 border border-gray-300" value={newDesc} onChange={(e) => setNewDesc(e.target.value)}></input>
                    </div>
                  <div className="my-4">
                    <div className="relative inline-block">
                      <img className="w-auto h-28 rounded" src={BASE_URL_MENU + '/' + newImageURL} alt="Preview" />
                      <button
                        className="absolute right-0 top-0 mb-2 ml-2 text-white hover:text-red-500"
                        onClick={() => setImage(null)}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div>
                  <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer">
                    <label htmlFor="file-input" className="flex items-center cursor-pointer flex-col">
                      <svg
                        className="w-10 h-10 text-gray-500 mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                        ></path>
                      </svg>
                      <span className="text-xs font-thin">Upload a File or drag and drop</span>
                    </label>
                    <span className="text-xs font-medium">PNG, JPG, GIF up to 10MB</span>
                    <input
                      type="file"
                      id="file-input"
                      accept=".png, .jpg, .jpeg, .gif"
                      className="opacity-0"
                      onChange={handleFileInputChange}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    />
                    {selectedFile ? (
                      <div>
                        <p className="text-sm">Selected File: {selectedFile.name}</p>
                        <p className="text-sm">File Size: {selectedFile.size} bytes</p>
                        <img src={URL.createObjectURL(selectedFile)} alt="Preview" className="mt-2 max-h-20" />
                      </div>
                    ) : null}
                  </div>
                  </div>
                  <div className="flex justify-between">
                    <Button
                      className="px-4 py-2 bg-[#fff] text-[#a64b2b] border-2 border-[#a64b2a] rounded-lg mt-4"
                      onClick={() => handleCancelChanges()}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="px-4 py-2 bg-[#a64b2a] text-white rounded-lg mt-4"
                      onClick={() => handleSaveChanges(selectedItem.id)}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="mt-5 mx-auto w-96 h-1.5 rounded-[15px] bg-[#a64b2a]"/>
            <div>
              <div className="flex w-max space-x-52 mx-auto mt-5 items-center justify-center">
                <Button className="bg-[#a64b2a] font-medium w-36 rounded-[20px] shadow" onClick={() => setShowModal(true)}>+ add new</Button>
                  {showModal && <Modal onClose={handleModalClose} />}
              </div>
            </div>
        </div>
    </>
  );
}

export default Item;
        {/*
          <div className="mt-5 mx-auto w-96 h-1.5 rounded-[15px] bg-[#a64b2a]" />
            <div className={openTab === 1 ? "block" : "hidden"}>
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
                      <td className="px-4 py-2">
                        <Button className="px-4 py-2 text-black bg-transparent">Edit</Button>
                      </td>
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
        </div> */}


// function Modal({ onClose, remove }) {
//   const [image, setImage] = useState(null);

//   function handleFileUpload(e) {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onload = function (event) {
//       setImage(event.target.result);
//     };

//     reader.readAsDataURL(file);
//   }
  
//   function handleRemoveImage() {
//     setImage(null);
//   }

//   const [checkedItems, setCheckedItems] = useState([]);

//   const handleCheck = (event) => {
//     const { value, checked } = event.target;
//     if (checked) {
//       setCheckedItems([...checkedItems, parseInt(value)]);
//     } else {
//       setCheckedItems(checkedItems.filter((id) => id !== parseInt(value)));
//     }
//   };

//   const handleSelectAll = (event) => {
//     if (event.target.checked) {
//       setCheckedItems(data.map((item) => item.id));
//     } else {
//       setCheckedItems([]);
//     }
//   };

//   const handleRemove = () => {
//     const updatedData = data.filter(item => !checkedItems.includes(item.id));
//     console.log("Removing Items: ", checkedItems)
//     setData(updatedData);
//     onClose();
//   };


//   if (remove) {
//     return (
//       <div className="fixed z-10 inset-0 overflow-y-auto">
//       <div className="flex mx-auto items-center justify-center min-h-screen">
//         <div className="fixed inset-0 bg-black opacity-50"></div>
//         <div className="bg-[#f3f3f3] rounded-[5px] w-3/5 p-6 relative">
//           <div className="relative flex justify-between">
//           <h2 className="text-xl font-medium mb-3">Select Dishes To Remove</h2>
//             <div className="top-0">
//                 <button onClick={onClose}>
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 relative" viewBox="0 0 20 20" fill="currentColor">
//                     <path fill-rule="evenodd" d="M3.646 3.646a.5.5 0 01.708 0L10 9.293l5.646-5.647a.5.5 0 11.708.708L10.707 10l5.647 5.646a.5.5 0 01-.708.708L10 10.707l-5.646 5.647a.5.5 0 01-.708-.708L9.293 10 3.646 4.354a.5.5 0 010-.708z" clip-rule="evenodd" fill="black" />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           <label className="flex items-center space-x-2">
//             <input
//               type="checkbox"
//               className="form-checkbox h-5 w-5 text-[#a64b2a]"
//               checked={checkedItems.length === data.length}
//               onChange={handleSelectAll}
//               ripple={true}
//             />
//             <span className="text-sm font-medium pt-1 pb-1">Select All</span>
//           </label>
//           {data.map((item) => (
//             <label className="flex items-center space-x-2" key={item.id}>
//               <input
//                 type="checkbox"
//                 className="form-checkbox h-5 w-5 text-[#a64b2a]"
//                 value={item.id}
//                 checked={checkedItems.includes(item.id)}
//                 onChange={handleCheck}
//                 ripple={true}
//               />
//               <span className="text-sm font-medium pt-1 pb-1">{item.label}</span>
//             </label>
//           ))}
//           <div className="mt-6 flex justify-end">
//             <button
//               type="submit"
//               onClick={() => {handleRemove(); onClose();}}
//               className="bg-[#a64b2a] text-white rounded-md py-2 px-4 font-medium"
//               ripple={true}
//             >
//               Remove
//             </button>
//             <button
//               onClick={() => setCheckedItems([])}
//               className="bg-gray-400 text-white rounded-md py-2 px-4 font-medium ml-2"
//               ripple={true}
//             >
//               Clear Selection
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//     );
//   }
//   else {
//     return (
//       <div className="fixed z-10 inset-0 overflow-y-auto">
//         <div className="flex mx-auto items-center justify-center min-h-screen">
//           <div className="fixed inset-0 bg-black opacity-50"></div>
//           <div className="bg-[#F3F3F3] rounded-[5px] w-3/5 p-6 relative">
//             <h2 className="text-xl font-medium mb-3">Add New</h2>
//             <form className="space-y-3">
//               <div>
//                 <div className="flex items-center justify-center w-full">
//                   <label
//                     className="relative flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300 overflow-auto">
//                       <div className="absolute top-0 left-0 w-full h-full">
//                         {image && (
//                           <img src={image} alt="preview" className="absolute w-full h-full object-cover top-0 left-0" />
//                         )}
//                       </div>
//                       <div className="flex flex-col items-center justify-center pt-7">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className={`w-8 h-8 text-gray-400 ${
//                             image ? 'hidden' : 'group-hover:text-gray-600'
//                           }`}
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             stroke-linecap="round"
//                             stroke-linejoint="round"
//                             stroke-width="2"
//                             d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
//                           ></path>
//                         </svg>
//                         <p
//                           className={`pt-1 text-sm tracking-wider text-gray-400 ${
//                             image ? 'hidden' : 'group-hover:text-gray-600'
//                           }`}
//                           >
//                             Upload Image
//                           </p>
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className={`absolute top-0 right-0 w-6 h-6 text-gray-600 ${
//                               image ? 'block' : 'hidden'
//                             }`}
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                             onClick={handleRemoveImage}
//                             >
//                               <path
//                                 stroke-linecap="round"
//                                 stroke-linejoin="round"
//                                 stroke-width="2"
//                                 d="M6 18L18 6M6 6l12 12"
//                               />
//                             </svg>
//                       </div>
//                         <input 
//                           type="file" 
//                           id="image" 
//                           name="image" 
//                           className="opacity-0 absolute top-0 left-0 w-full h-full" 
//                           onChange={handleFileUpload} 
//                           />
//                     </label>
//                 </div>
//               </div>
//             <div>
//               <label htmlFor="snackName" className="block font-medium text-sm text-[#181818] pb-1">Name</label>
//               <input type="text" id="snackName" name="snackName" placeholder="input your food name" className="w-full rounded-[5px] bg-white pl-2 h-8" />
//             </div>
//             <div>
//               <label htmlFor="category" className="block font-medium text-sm text-[#181818] pb-1">Category</label>
//               <select id="category" name="category" className="w-full rounded-[5px] bg-white h-8">
//                 <option value="" className="text-gray-400">Select a category</option>
//                 <option value="appetizers">Foods</option>
//                 <option value="entrees">Snack</option>
//                 <option value="desserts">Drinks</option>
//               </select>
//             </div>
//             <div>
//               <label htmlFor="price" className="block font-medium text-sm text-[#181818] pb-1">Price</label>
//               <input type="number, text" id="price" name="price" placeholder="price" className="w-full rounded-[5px] bg-white pl-2 h-8"/>
//             </div>
//             <div>
//               <label htmlFor="dish" className="block font-medium text-sm text-[#181818] pb-1">Dish</label>
//               <input type="number, text" id="dish" name="dish" placeholder="dish" className="w-full rounded-[5px] bg-white pl-2 h-8"/>
//             </div>
//             <div>
//               <label htmlFor="description" className="block font-medium text-sm text-[#181818] pb-1">Description</label>
//               <textarea id="description" name="description" placeholder="add description" rows="3" className="w-full rounded-[5px] bg-white pl-2"></textarea>
//             </div>
//             <div className="mt-6 flex justify-end">
//               <Button type="submit" className="bg-[#a64b2a] text-white rounded-md py-2 px-4 font-medium" ripple={true}>+ Add To List</Button>
//               <Button onClick={onClose} className="bg-gray-400 text-white rounded-md py-2 px-4 font-medium ml-2" ripple={true}>Close</Button>
//             </div>
//           </form>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }