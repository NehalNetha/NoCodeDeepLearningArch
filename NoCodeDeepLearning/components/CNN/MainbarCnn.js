import React, { useState } from 'react';

function MainbarCNN({
   selectedLayers, 
   removeLayer, 
   addConvLayer, 
   addFullyConnectedLayer, 
   toggleDropdownInputApply, 
   toggleDropDownFCN,
   toggleCNNBlock,
   toggleDropDownOutput
   }) {
    const [expandedBlockIndex, setExpandedBlockIndex] = useState(null);
    const [expandedOutput, setExpandedOutput] = useState(false);

    

  const Blocks = ({ block, index, toggleDropdownInputApply, toggleDropDownFCN , toggleCNNBlock}) => {
    const [selectedOptions, setSelectOptions] = useState(false);

    const selectOptionToggle = () => {
      setSelectOptions(prev => !prev);
    };

    const isConvBlock = block === "Conv Block";
    const expandBlock = () => {
        if (isConvBlock) {
            setExpandedBlockIndex(prev => prev === index ? null : index);
        }
    };


    const isOutputBlock = block === "Output Layer";
    const expandOutputBlock = () => {
      if (isOutputBlock) {
        setExpandedOutput(prev => !prev);
      }
    };


    return (
      <div className="relative">
        <div
          className="w-[16rem] h-[3.5rem] mb-5 py-5 px-2 border-[1px] border-gray-500 rounded-lg items-center flex flex-row justify-between cursor-pointer"
          onClick={() => {
            expandBlock();
            if (block === "Input Layer"){
              toggleDropdownInputApply()
            }
            if (block == "Fully Connected Layer"){
              toggleDropDownFCN()
            }
            if (block == "Conv Block"){
              toggleCNNBlock()
            }
            if (block == "Output Layer"){
              toggleDropDownOutput()
              expandOutputBlock()

            }
          }}
        >
          <p className="text-white text-[16px] pl-4">{block}</p>
          <button className="cursor-pointer" onClick={(e) => { e.stopPropagation(); selectOptionToggle(); }}>            
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
            </svg>
          </button>
        </div>

        {selectedOptions && (
          <div className="absolute -top-3 -right-14 ml-11 mt-2 flex flex-col gap-2 bg-gray-800 p-2 rounded-lg">
            <button onClick={() => removeLayer(block)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="red" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </button>
            {["Conv Block" , "Fully Connected Layer" ].includes(block) && (
              <button 
                onClick={() => {
                    if (block === "Conv Block") {
                      addConvLayer();
                    } else if (block === "Fully Connected Layer") {
                      addFullyConnectedLayer();
                    }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="green" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>  
    );
  };

  const ConvBlockExpanded = ({block}) => (
    <div className="absolute left-[21rem] top-17 flex flex-col gap-2">
      <Blocks block="Conv Layer" />
      <Blocks block="Activation Function" />
      <Blocks block="Pooling Layer"    />
    </div>
  );

  const OutputBlockExpanded = ({block}) => (
    <div className="absolute left-[21rem] top-17 flex flex-col gap-2">
      <Blocks block="Output Configurations" />
      <Blocks block="Optimizer Configurations" />
      <Blocks block="Loss Function" />
      <Blocks block="Model Configurations" />
    </div>
  );
  

  

  return (
    <div className="dotted-background w-[50rem] min-h-screen bg-gray-900 flex justify-start relative">
      <div className="ml-11">
        <div className="mt-5 p-5">
          {selectedLayers.map((block, index) => (
            <div key={index} className="flex flex-col justify-center items-center relative">
            <div className=" relative">

                <Blocks block={block === "Conv Layer"  ? "Conv Block" : block} index={index} 
                 toggleDropdownInputApply={toggleDropdownInputApply}
                 toggleDropDownFCN ={toggleDropDownFCN}
                 toggleCNNBlock={toggleCNNBlock}
                 toggleDropDownOutput={toggleDropDownOutput}
                  />

                {
                   ((expandedBlockIndex === index && block === "Conv Layer") || (expandedOutput && block === "Output Layer")) &&(
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" className="w-[2.5rem] h-[2.0rem] absolute top-3 -right-11 ">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                        </svg>

                    )
                }
            </div>

              {expandedBlockIndex === index &&   <ConvBlockExpanded block= {block}  />}
              {expandedOutput && block === "Output Layer" && <OutputBlockExpanded block ={block}/>}

              {index < selectedLayers.length - 1 && (
                <svg className="w-8 h-8 my-2 mb-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5L12 19M12 19L19 12M12 19L5 12" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div> 
          ))}
        </div>
      </div>

      <style jsx>{`
        .dotted-background {
          background-image: radial-gradient(circle, #5A5A5A 1px, transparent 1px);
          background-size: 16px 16px;
        }
      `}</style>
    </div>
  );
}

export default MainbarCNN;