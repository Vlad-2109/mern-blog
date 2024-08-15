import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';

export const CallToAction: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className='text-2xl'>Want to learn more about JavaScript?</h2>
        <p className='text-gray-5000 my-2'>Checkout these resources with 100 JavaScript Projects</p>
        <Button
          gradientDuoTone="purpleToPink"
          className="rounded-tl-xl rounded-bl-none"
        >
          <Link
            target="_blank"
            rel="noopener noreferrer"
            to={'https://www.100jsprojects.com'}
          >
            100 JavaScript Projects
          </Link>
        </Button>
      </div>
      <div className="p-7 flex-1">
        <img
          src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg"
          alt="javascript"
        />
      </div>
    </div>
  );
};
