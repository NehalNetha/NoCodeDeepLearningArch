"use client"
import React, {useState} from 'react'

function Mainbar({selectedLayers, removeLayer, addHiddenLayer}) {

  
    const Blocks = ({block }) => {

        const [selectedOptions, setSelectOptions] = useState(false)

        


        const selectOptionToggle = () => {
            setSelectOptions(prev => !prev)
        }

        const handleClickAddButtonHidden = () => {
            addHiddenLayer()
        }


        return (
            <div className=" relative">

                <div className="w-[16rem] h-[3.5rem] mb-5 py-5 px-2 border-[1px] border-gray-500 rounded-lg items-center flex flex-row justify-between ">
                     <p className="text-white text-[16px] pl-4">
                        {block}
                    </p>
                    <button className="cursor-pointer" onClick={selectOptionToggle}>            
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                        </svg>
                    </button>
                </div>

                {selectedOptions && (
                    <div className={`absolute ${block === "Hidden Layer"? "-top-4" : "top-0"} -right-14  ml-11 mt-2 flex flex-col gap-2 bg-gray-800 p-2 rounded-lg` }>
                        <button onClick={() => removeLayer(block)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="red" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </button>
                        {block === "Hidden Layer" && (
                            <button onClick={handleClickAddButtonHidden }    >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="green" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </button>
                        )}
                    </div>
                )}

            </div>  

        )
    }

  return (
    <div className="dotted-background w-[50rem] min-h-screen  bg-red flex justify-center bg-gray-900 ">

        <div>

            <div className="mt-5 p-5">
                {   


                            selectedLayers.map((block, index) => (
                                    <div className="flex flex-col justify-center items-center ">
                                        <Blocks key={index} block={block}  removeLayer={removeLayer} addHiddenLayer={addHiddenLayer} />

                                         {index < selectedLayers.length - 1 && (
                                            <svg className="w-8 h-8 my-2 mb-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                                <path d="M12 5L12 19M12 19L19 12M12 19L5 12" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        )}
 
                                    </div> 
                            ))

                           

                       
                        
                }
                
            </div>

        </div>

    <style jsx>{`
        .dotted-background {
          background-image: radial-gradient(circle, #5A5A5A 1px, transparent 1px);
          background-size: 16px 16px;
        }
      `}</style>

    </div>
  )
}

export default Mainbar

