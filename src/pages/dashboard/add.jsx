import { useState } from 'react';

function Modal({ isOpen, onClose, children }) {
  const overlayClasses = isOpen ? 'fixed inset-0 bg-black opacity-50 z-40' : 'hidden';
  const modalClasses = isOpen ? 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-lg p-6 z-50' : 'hidden';

  return (
    <>
      <div className={overlayClasses} onClick={onClose}></div>
      <div className={modalClasses}>
        {children}
        <button onClick={onClose} className="mt-4 bg-red-500 text-white rounded-lg py-2 px-4">Close</button>
      </div>
    </>
  );
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleAddFoodClick() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <>
      <div className="mt-5 mx-auto w-96 h-1.5 rounded-[15px] bg-[#a64b2a]"/>
      <div className="flex w-max gap-4">
        <button ripple={true} onClick={handleAddFoodClick}>+ Add Food</button>
        <button ripple={true}>- Remove Food</button>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-xl font-bold mb-2">Add Food</h2>
        <form>
          <label className="block mb-2">
            Food Name:
            <input type="text" className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </label>
          <label className="block mb-2">
            Price:
            <input type="number" className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </label>
          <button className="mt-4 bg-green-500 text-white rounded-lg py-2 px-4">Add</button>
        </form>
      </Modal>
    </>
  );
}
