import React, { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import InputLayerCNN from './Inputs/InputLayerCnn';
import ConvLayerInput from './Inputs/ConvLayerInput';
import FullyConnectedLayer from './Inputs/FullyConnectedLayer';
import OutputLayerCNN from './Inputs/OutputLayerCNN';

function RightBarCnn({
  selectedLayers,
  InputParamApply, 
  ConvParamApply, 
  dropdownState, 
  FullyConnectedLayerParamApply, 
  ActivationParamApply, 
  PoolingParamApply,
  OutputParamsApply,
  OptimizerParamApply,
  LossFunctionParamApply,
  ModelConfParamsApply,
  dropdownInputApply,
  dropDownFCN,
  dropDownCNNBlock,
  dropDownOutput
}) {
  const [activeLayer, setActiveLayer] = useState(null);

  const toggleLayer = (layer, index) => {
    setActiveLayer(activeLayer === `${layer}-${index}` ? null : `${layer}-${index}`);
  };

  const getLayerNumber = (layerType, currentIndex) => {
    return selectedLayers.slice(0, currentIndex + 1).filter(layer => layer === layerType).length;
  };

  return (
    <div className="w-[22rem] min-h-screen bg-gray-900 border-l-[1px] border-gray-40 pb-9">
      <div className="border-b-[1px] border-gray-400">
        <Carousel opts={{ align: "start" }} className="w-[22rem] max-w-sm">
          <CarouselContent>
            {selectedLayers.map((layer, index) => (
              <CarouselItem key={`${layer}-${index}`} className="md:basis-1/2 lg:basis-1/3">
                <div className="pl-3 pt-7 pb-3">
                  <button
                    className={`text-sm ${
                      activeLayer === `${layer}-${index}` ? "text-[#F6E6CB]" : "text-gray-400"
                    }`}
                    onClick={() => toggleLayer(layer, index)}
                  >
                    <p className="text-sm">
                      {layer === 'Conv Layer' || layer === 'Fully Connected Layer'
                        ? `${layer} ${getLayerNumber(layer, index)}`
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
        {activeLayer === 'Input Layer-0' && <InputLayerCNN InputParamApply={InputParamApply} />}
        
        {activeLayer && activeLayer.startsWith('Conv Layer') && (
          <ConvLayerInput 
            ConvParamApply={ConvParamApply}
            dropdownState={dropdownState} 
            ActivationParamApply={ActivationParamApply} 
            PoolingParamApply={PoolingParamApply}
            convNumber={getLayerNumber('Conv Layer', selectedLayers.indexOf('Conv Layer'))}
          />
        )}

        {activeLayer && activeLayer.startsWith('Fully Connected Layer') && (
          <FullyConnectedLayer
            FullyConnectedLayerParamApply={FullyConnectedLayerParamApply}
            fcnNumber={getLayerNumber('Fully Connected Layer', selectedLayers.indexOf('Fully Connected Layer'))}
          />
        )}

        {activeLayer === `Output Layer-${selectedLayers.length - 1}` && (
          <OutputLayerCNN 
            OutputParamsApply={OutputParamsApply}
            OptimizerParamApply={OptimizerParamApply}
            LossFunctionParamApply={LossFunctionParamApply}
            ModelConfParamsApply={ModelConfParamsApply}
          />
        )}
      </div>
    </div>
  );
}

export default RightBarCnn;