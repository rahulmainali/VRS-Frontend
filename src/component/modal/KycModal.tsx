import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

interface ModalProps {
  isOpen: boolean
  changeModalState: () => void
}

export default function KycModal({ isOpen, changeModalState }: ModalProps) {
  // use promise
  return (
    <>
      {' '}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 w-full"
          onClose={changeModalState}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all App-icons">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-800"
                  >
                    Verify Kyc to use this feature 
                  </Dialog.Title>
                  <p className="text-sm text-gray-700">
                    You are not a verifed user of Sadhan! Please apply for KYC
                    verification to use all features.
                  </p>
                  <Link to="/dashboard/verifyKyc">Verify</Link>
                  <div className="mt-2 felx flex-col"></div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
