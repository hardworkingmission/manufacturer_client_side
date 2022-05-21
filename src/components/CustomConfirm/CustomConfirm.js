import React from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose,faCheck } from '@fortawesome/free-solid-svg-icons'


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)'
      },
  };
Modal.setAppElement(document.getElementById('root'))
const CustomConfirm = ({closeModal,modalIsOpen,handleConfirm}) => {
    return (
        <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        >
            <div className='h-[100px] w-[200px] relvative flex items-center justify-center'>
                <h3>Do you want to delete it?</h3>
                <FontAwesomeIcon role={'button'} onClick={()=>handleConfirm(true)} icon={faCheck} className='absolute bottom-[10%] left-[20%] h-[25px] w-[25px] text-green-600 font-bold hover:bg-gray-200 hover:p-2 hover:rounded'/>
                <FontAwesomeIcon role={'button'} onClick={()=>closeModal()} icon={faClose} className='absolute bottom-[10%] right-[20%] h-[25px] w-[25px] text-red-600 font-bold hover:bg-gray-200 hover:p-2 hover:rounded'/>
            </div>
        </Modal>
    );
};

export default CustomConfirm;