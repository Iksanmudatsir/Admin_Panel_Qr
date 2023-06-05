import React from "react";

export function Modal({ onClose }) {
  const handleCancel = () => {
    onClose();
  };

  const handleAddNew = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Add New Item</h2>
        {/* Add your form inputs and other content here */}
        <div className="flex justify-end">
          <button
            className="px-4 py-2 text-white bg-[#a64b2a] rounded-lg mr-2"
            onClick={handleAddNew}
          >
            Add
          </button>
          <button
            className="px-4 py-2 text-gray-500 bg-gray-200 rounded-lg"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}