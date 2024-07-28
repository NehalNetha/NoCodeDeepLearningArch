import React, { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import HiddenLayer from './HiddenLayer'
import OutputLayer from './OuputLayer'
import InputApply from './InputLayer'
import OptimizerApply from './Optimizer'
import LossFunctionApply from './LossFunction'

function RightSidebar({
  selectedLayers = [],
  InputParamApply,
  HiddenParamApply,
  OutputParamApply,
  OptimizerParamApply,
  LossFunctionParamApply
}) {
  const [activeApply, setActiveApply] = useState(null);
  const [activeHiddenLayer, setActiveHiddenLayer] = useState(0);

  const toggleApply = (type, index) => {
    setActiveApply(type);
    if (type.startsWith('Hidden Layer')) {
      setActiveHiddenLayer(index);
    }
  };

  const getHiddenLayerNumber = (layers, currentIndex) => {
    return layers.slice(0, currentIndex + 1).filter(layer => layer.startsWith('Hidden Layer')).length;
  };

  return (
    <div className="w-[22rem] min-h-screen bg-gray-900 border-l-[1px] border-gray-400">
      <div>
        <div className="border-b-[1px] border-gray-400">
          <Carousel opts={{ align: "start" }} className="w-[22rem] max-w-sm">
            <CarouselContent>
              {selectedLayers.map((layer, index) => (
                <CarouselItem key={`${layer}-${index}`} className="md:basis-1/2 lg:basis-1/3">
                  <div className="pl-3 pt-7 pb-3">
                    <button
                      className={`text-sm ${activeApply === (layer.startsWith('Hidden Layer') ? `${layer}-${index}` : layer) ? "text-[#F6E6CB]" : "text-gray-400"}`}
                      onClick={() => toggleApply(layer.startsWith('Hidden Layer') ? `${layer}-${index}` : layer, index)}
                    >
                     <p className="text-sm">
                        {layer.startsWith('Hidden Layer') 
                          ? `${layer} ${getHiddenLayerNumber(selectedLayers, index)}` 
                          : layer}
                      </p>
                    </button>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        <div>
          {activeApply === "Input Layer" && <InputApply InputParamApply={InputParamApply} />}
          {activeApply && activeApply.startsWith('Hidden Layer') && (
            <HiddenLayer
              HiddenParamApply={(size, act) => HiddenParamApply(activeHiddenLayer, size, act)}
              layerIndex={activeHiddenLayer}
            />
          )}
          {activeApply === "Output Layer" && <OutputLayer OutputParamApply={OutputParamApply} />}
          {activeApply === "Optimizer" && <OptimizerApply OptimizerParamApply={OptimizerParamApply} />}
          {activeApply === "Loss Function" && <LossFunctionApply LossFunctionParamApply={LossFunctionParamApply} />}
        </div>
      </div>
    </div>
  );
}

export default RightSidebar;


