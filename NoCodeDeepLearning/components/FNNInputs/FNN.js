import React, {useState} from 'react'


function FNN({onSelectedLayers, selectedLayers}) {

    const buildingBlock = ["Input Layer", "Hidden Layer", "Output Layer", "Optimizer", "Loss Function"]

    const Blocks = ({block, onSelectedLayers}) => {
        

        return (
            <div className={`w-[16rem] h-[3.5rem] mb-5 py-5 px-2 border-[1px] border-gray-500 flex flex-row justify-between rounded-lg items-center ${ selectedLayers.includes(block) ? 'bg-[#F6E6CB] text-black' : 'text-white'}`} onClick={() => onSelectedLayers(block)}>
                <p className={` text-[16px] pl-4 ${ selectedLayers.includes(block) ? ' text-black' : 'text-white'}` }>{block}</p>

                
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke={`${ selectedLayers.includes(block) ? ' black' : 'white'}` } class="size-6"  >
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                    </svg>

               

            </div>  
        )
    }


//     selectedLayers.includes(layer) ? 'bg-[#F7DCB9]' : ''
// }`}
  return (
    <div>
        <div className="mt-5 p-5">
            {

                buildingBlock.map((block, index) => (
                        <div className="flex flex-col ">
                            <Blocks key={index} block={block} onSelectedLayers={onSelectedLayers}  /> 
                        </div> 
                 ))
        }
        </div>
    </div>
  )
}

export default FNN