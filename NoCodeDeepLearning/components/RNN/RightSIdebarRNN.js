import React, {useState, useEffect} from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import RNNInputs from './Inputs/RNNInputs';
import RnnLayerInputs from './Inputs/RnnLayerInputs';


function RightSIdebarRNN({selectedLayers, dropdownStates}) {

  const [activeApply, setActiveApply] = useState(null)
  const [activeFCN, setActiveFCN] = useState(0);


  const toggleApply = (type, index) => {
      setActiveApply(type)
      if (type.startsWith('Fully Connected Layer')) {
        setActiveFCN(index);
      }
  }

  const getFCNNumber = (layers, currentIndex) => {
    return layers.slice(0, currentIndex + 1).filter(layer => layer.startsWith('Fully Connected Layer')).length;
  };


  return (
    <div className="w-[22rem] min-h-screen  bg-gray-900 border-l-[1px] border-gray-40 pb-9">

        <div className="border-b-[1px] border-gray-400">
                  <Carousel opts={{ align: "start" }} className="w-[22rem] max-w-sm">
                    <CarouselContent>
                      {selectedLayers.map((layer, index) => (
                        <CarouselItem key={`${layer}-${index}`} className="md:basis-1/2 lg:basis-1/3">
                          <div className="pl-3 pt-7 pb-3">
                            <button
                                className={`text-sm ${activeApply === (layer.startsWith('Fully Connected Layer') ? `${layer}-${index}` : layer) ? "text-[#F6E6CB]" : "text-gray-400"}`}
                                onClick={() => toggleApply(layer.startsWith('Fully Connected Layer') ? `${layer}-${index}` : layer, index)}

                            >
                              <p className="text-sm">
                                {layer.startsWith('Fully Connected Layer') 
                                  ? `${layer} ${getFCNNumber(selectedLayers, index)}` 
                                  : layer}
                              </p>
                            </button>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
          </div>
          {dropdownStates["Input Layer"] && <RNNInputs />}
          {dropdownStates["RNN Layer"] && <RnnLayerInputs />}

        </div>
  )
}

export default RightSIdebarRNN