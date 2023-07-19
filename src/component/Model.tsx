import { useState, Fragment, useEffect, useRef, LegacyRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Position } from '../common/types';
type ModelProp = {
    isOpen: boolean,
    onClose: (value: boolean) => void;
    title: string | React.ReactElement,
    children: React.ReactElement,
    position? : Position | null
    ,
    closeModel?:()=>void
}

const Model = ({ isOpen, onClose, title, children,position,closeModel }: ModelProp) => {
    const pannelRef = useRef<HTMLDivElement>(null)
    const OnMouseLeave = () => {
        if (closeModel) {
            closeModel();
        }
    }
    // useEffect(() => {

    //     if (pannelRef.current) {
    //         pannelRef.current?.addEventListener('mouseleave', OnMouseLeave)
    //     }
    // }, [])

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterEnter={()=>{
                        pannelRef.current?.addEventListener('mouseleave', OnMouseLeave)
                    }}
                    afterLeave={()=>{
                        pannelRef.current?.removeEventListener('mouseleave', OnMouseLeave)

                    }}
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center  text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                style={position ? {
                                    position:"fixed",
                                    ...position
                                }:{}}
                            className=" transform overflow-hidden rounded-2xl bg-dark text-left h-auto  align-middle shadow-xl transition-all">
                                <div ref={pannelRef}>


                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-white"
                                    >
                                        {title}
                                    </Dialog.Title>
                                    {children}
                                </div>


                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
export default Model