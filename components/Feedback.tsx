import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

interface FeedbackProps {
  visible?: boolean;
  onClose: any;
}

const Feedback: React.FC<FeedbackProps> = ({ visible, onClose }) => {
  const [isVisible, setIsVisible] = useState<boolean>(!!visible);
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  const sendFeedback = useCallback(async () => {
    try {
      await axios.post('/api/feedback', {
        email,
        name,
        feedback
      });
      router.reload()
      console.log("submitted");

    } catch (error) {
      console.log(error);
    }
  }, [email, name, feedback, router]);


  if (!visible) {
    return null;
  }

  return (
    <div className="z-50 transition bg-black bg-opacity-30 duration-300 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 backdrop-blur-sm">
      <div className="relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden">
        <div className={`${isVisible ? 'scale-100' : 'scale-0'} transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}>
          <div className="relative h-20">
            <h2 className='text-white text-center pt-7 font-medium text-4xl'>Feedback</h2>
            <div onClick={handleClose} className="cursor-pointer absolute top-10 right-5 sm:top-10 md:right-9h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center">
              <AiOutlineClose className="text-white w-6" size={20} />
            </div>
          </div>

          <div className="px-12 py-8 text-white flex flex-col gap-5">

            <span className='flex gap-3'>
              Name:
              <input
                autoComplete='true'
                id="name"
                className='form-input w-56 text-sm rounded-lg outline-none bg-zinc-900 border-b-gray-600 focus:border-white focus:duration-50 border-gray-300 border-b-[2px] border-t-0 border-l-0 border-r-0 placeholder:text-gray-500 p-1'
                placeholder='Enter Name'
                type="text"
                value={name}
                onChange={(e: any) => setName(e.target.value)}
              ></input>
            </span>
            <span className='flex gap-4'>
              Email:
              <input
                autoComplete='true'
                id='email'
                className='form-input w-56 text-sm rounded-lg outline-none bg-zinc-900 transition border-b-gray-600 focus:border-white focus:duration-50 border-gray-300 border-b-[2px] border-t-0 border-l-0 border-r-0 placeholder:text-gray-500 p-1'
                placeholder='Enter Email'
                type='email'
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
              ></input></span>
            <div className='flex flex-col gap-2'>
              Enter your Feedback:
              <textarea 
              id='feedback' 
              className='h-44 rounded-md outline-none text-black' 
              value={feedback}
              onChange={(e: any) => setFeedback(e.target.value)}></textarea>
            </div>
            <div className='pb-5 flex justify-end'>
              <button className='text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 transition' onClick={sendFeedback}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feedback;