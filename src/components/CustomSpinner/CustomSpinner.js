import React from 'react';

const CustomSpinner = () => {
    return (
        <div className="flex justify-center items-center my-3">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-gray-600" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default CustomSpinner;