import React from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'


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
const CustomModal = ({closeModal,modalIsOpen,children}) => {
    return (
        <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        >
            <div className='h-[300px] lg:w-[400px] relvative flex items-center justify-center'>
                <FontAwesomeIcon role={'button'} onClick={()=>closeModal()} icon={faClose} className='absolute top-[2%] right-[2%] h-[20px] w-[20px] text-red-600'/>
                {children}
            </div>
        </Modal>
    );
};

export default CustomModal;