import React, { useState } from 'react'

function SecondNavbar() {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <>
      <div
        className="h-80 varient-gradient z-999"
        style={{
          background:
            'linear-gradient(0deg, rgba(89,60,240,1) 3%, rgba(255,255,255,0) 100%)'
        }}
      >
        <div className="p-0 px-5">
          <div className="w-full bg-white rounded-lg shadow h-auto flex flex-wrap place-items-center">
            <section className="relative mx-auto w-full">
              {/* navbar */}
              <nav className="flex justify-between w-full text-white ">
                <div className="px-5 xl:px-12 py-6 flex w-full items-center">
                  <a
                    className="text-xl font-semibold font-heading App-sidebar-link"
                    href="#"
                  >
                    {/* <img class="h-9" src="logo.png" alt="logo"> */}
                    Dashboard
                  </a>
                </div>
              </nav>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
export default SecondNavbar
