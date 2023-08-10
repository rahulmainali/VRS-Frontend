import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const VehicleSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div className='container-fluid'>
        <div className=" bg-white w-9/12 mx-auto mt-4 flex flex-col h-auto">
          <div className="header float-left">
            <h1 className="text-2xl text-left p-2 font-semibold">
              <Skeleton width={250} />
            </h1>
          </div>

          <div className="body h-4/5 flex justify-between">
            <div
              className="image w-8/12 h-3/4 rounded-sm drop-shadow-sm bg-rounded"
              style={{
                maxWidth: '100%',
                height: '60vh'
              }}
            >
              <Skeleton height={500} />
            </div>
            <div className="booking w-3/12 h-3/4 rounded-xl bg-white drop-shadow-lg ">
                <Skeleton height={351} />
            </div>
          </div>

          <div className=" bg-white w-7/12 h-auto ">
            <div className="general-info w-3/4 flex justify-between py-2">
              <div className="flex flex-col text-left">
                <h3 className=" text-xl font-semibold">Milage</h3>
                <p className=" text-sm ">
                  <Skeleton />
                </p>
              </div>
              <div className="flex flex-col text-left">
                <h3 className=" text-xl font-semibold">Price</h3>
                <p className=" text-sm ">
                  <Skeleton />
                </p>
              </div>

              <div className="flex flex-col text-left">
                <h3 className=" text-xl font-semibold">Location</h3>
                <p className=" text-sm ">
                  <Skeleton />
                </p>
              </div>

              <div className="flex flex-col text-left">
                <h3 className=" text-xl font-semibold">Vehicle Number</h3>
                <p className=" text-sm ">
                  <Skeleton />
                </p>
              </div>
            </div>
            <div className="description">
              <h2 className="text-xl py-4 text-left">Description</h2>
              <Skeleton count={20} />
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  )
}

export default VehicleSkeleton
