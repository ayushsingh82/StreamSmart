import React, { useState } from 'react';

function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
      <nav className=''>
        <div className='flex flex-row mx-auto px-[40px] py-[25px] justify-between items-center mt-[0px] bg-black'>
          <div className='font-bold text-2xl text-white'>
            <a href='/'>Quicknode</a>
          </div>

          {/* Dropdown button */}
          <div className='relative'>
            <button
              onClick={toggleDropdown}
              className='bg-blue-500 text-white px-4 py-2 rounded-md'>
             Get Started
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg'>
                <a
                  href='/'
                  className='block px-4 py-2 text-black hover:bg-gray-200'>
                Functions
                </a>
                <a
                  href='/'
                  className='block px-4 py-2 text-black hover:bg-gray-200'>
               Streams
                </a>
                <a
                href='/quoteV2'
                className='block px-4 py-2 text-black hover:bg-gray-200'>
             Odos
              </a>
             
              </div>
            )}
          </div>
        </div>
        <hr className='border-t-2 border-black' />
      </nav>
    );
}

export default Navbar;