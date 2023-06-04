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

export function Item() {
  const [items, setItems] = useState([]);

  const fetchItem = async () => {
    await AxiosInstance.get('/item').then((res) => {
      setItems([...res.data]);
    });
  }
  
  const [openTab, setOpenTab] = useState('makanan');

  const [showModal, setShowModal] = useState(false);

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

  const handleRemoveButtonClick = (itemId) => {
    const updatedTableData = tableData.filter(item => item.id !== itemId);
    setTableData(updatedTableData);
  };

  const [isModalopenRemoved, setIsModalOpenRemoved] = useState(false);

  const handleRemoveButtonClicks = () => {
    if (selectedItemIds.length === 0) {
      return;
    }

    setIsModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    setIsModalOpen(false);
  };

  const handleDeleteCancel = () => {
    setIsModalOpen(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);
  
  const handleEditButtonClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  }

  // const handleEditButtonClick = (itemId) => {
  //   fetchItemById(itemId);
  //   setIsModalOpen(true);
  // };

  // const fetchItemById = async (itemId) => {
  //   try {
  //     const response = await AxiosInstance.get(`/item/:id`);
  //     setSelectedItem(response.data);
  //   } catch (error) {
  //     console.log('Error fetching item:', error);
  //   }
  // };

  const handleSaveChanges = () => {
    setIsModalOpen(false)
  }

  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    const updatedItems = items.map((item) => ({
      ...item,
      selected: isChecked,
    }));
    setItems(updatedItems);
  };

  const handleCategoryChange = (event) => {
  const selectedCategory = event.target.value};

  const [selectedItemId, setSelectedItemId] = useState(null);

  const [selectedItemIds, setSelectedItemIds] = useState([]);

  const handleCheckboxChange = (id) => {
    const updatedSelectedItems = [...selectedItemIds];
    const itemIndex = updatedSelectedItems.indexOf(id);
    
    if (itemIndex === -1) {
      // Add the item ID to selected items
      updatedSelectedItems.push(id);
    } else {
      // Remove the item ID from selected items
      updatedSelectedItems.splice(itemIndex, 1);
    }
    
    setSelectedItemIds(updatedSelectedItems);
    
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item, index) => {
        if (index === id && item.category === openTab) {
          return { ...item, selected: !item.selected };
        } else {
          return item;
        }
      });
      return updatedItems;
    });
  };

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
                  <input type="checkbox" onChange={handleSelectAll} />
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
                      <input
                        type="checkbox"
                        checked={selectedItemIds.includes(id)}
                        onChange={() => handleCheckboxChange(id)}
                      />
                      </td>
                      <td className="px-4 py-2 text-[#c50d11] font-semibold w-2/5">{item.title}</td>
                      <td className="px-4 py-2">Rp{item.price}</td>
                      <td className="px-4 py-2 w-56">
                        <Button 
                          className="px-4 py-2 text-black bg-transparent"
                          onClick={handleEditButtonClick}
                        >
                          Edit
                        </Button>
                        <Button
                          className="px-4 py-2 text-white ml-2 bg-transparent bg-[#a64b2a]"
                          onClick={handleRemoveButtonClick}
                          disabled={selectedItemIds.length === 0}
                        >
                          Delete Item
                        </Button>
                        {isModalopenRemoved && (
                          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-4 rounded-lg">
                              <h2 className="text-lg font-semibold mb-4">Confirmation</h2>
                              <p className="text-sm mb-4">Are you sure you want to delete the selected items?</p>
                              <div className="flex justify-end">
                                <button
                                  className="px-4 py-2 text-white bg-red-500 rounded-lg mr-2"
                                  onClick={handleDeleteConfirm}
                                >
                                  Delete
                                </button>
                                <button
                                  className="px-4 py-2 text-gray-500 bg-gray-200 rounded-lg"
                                  onClick={handleDeleteCancel}
                                >
                                  Cancel
                                </button>
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
                    <h3>Product Name  {selectedItem.title}</h3>
                    <p className="mr-40">Category {selectedItem.category}</p>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <input type="text" id="product-name" className="px-2 py-1 border border-gray-300 rounded-md mr-4" placeholder= {selectedItem.title} />
                    <select
                      id="Category"
                      className="px-2 pr-32 py-1 border border-gray-300 rounded-md w-full"
                      value={selectedItem.category}
                      onChange={handleCategoryChange}
                    >
                      <option value="makanan">Makanan</option>
                      <option value="cemilan">Cemilan</option>
                      <option value="minuman">Minuman</option>
                    </select>
                    {/* <input type="text" id="Category" className="px-2 py-1 border border-gray-300 rounded-md" placeholder={selectedItem.category} /> */}
                  </div>
                  <p>Price {selectedItem.price}</p>
                    <input type="number" id="price" className="px-2 py-1 border border-gray-300 rounded-md mb-4" placeholder={selectedItem.price} />
                  <p>Product Details {selectedItem.description}</p>
                    <div>
                      <textarea id="description" name="description" placeholder={selectedItem.description} rows="3" className="px-2 py-1 w-full rounded-[5px] pl-2 border border-gray-300"></textarea>
                    </div>

                  <div className="my-4">
                    <div className="relative inline-block">
                      <img className="w-auto h-28 rounded" src="/public/img/bg_page.jpg" alt="Preview" />
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
                    {/* {selectedItem.item.map((image, index) => (
                      <img
                        key={index}
                        src={items?.imageURL}
                        alt={`Product Image ${index + 1}`}
                        className="w-20 h-20 object-cover rounded-lg mt-2"
                      />
                    ))} */}
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
                  {/* Add close button */}
                  <Button
                    className="px-4 py-2 bg-[#a64b2a] text-white rounded-lg mt-4"
                    onClick={handleSaveChanges}
                  >
                    Save All
                  </Button>
                </div>
              </div>
            )}
          </div>
          <div className="mt-5 mx-auto w-96 h-1.5 rounded-[15px] bg-[#a64b2a]"/>
            <div>
              <div className="flex w-max space-x-52 mx-auto mt-5 items-center justify-center">
                <Button className="bg-[#a64b2a] font-medium w-36 rounded-[20px] shadow" onClick={() => setShowModal(true)}>+ add new</Button>
                 {showModal && (
                   <Modal onClose={() => setShowModal(false)} />
                 )}
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