"use client"
import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import Mainbar from './Mainbar'
import RightSidebar from './RightSidebar'

export default function NeuralNet() {
  const [selectedLayers, setSelectedLayers] = useState([]);

  
  const onSelectedLayers = (layer) => {
    if (!selectedLayers.includes(layer)) {
      setSelectedLayers((prev) => {
        // Check if the layer can be added based on the current structure
        if (layer === "Input Layer" && prev.length === 0) {
          return [...prev, layer];
        } else if (layer === "Hidden Layer" && prev.includes("Input Layer") && !prev.includes("Output Layer")) {
          return [...prev, layer];
        } else if (layer === "Output Layer" && prev.includes("Input Layer") && !prev.includes("Output Layer")) {
          return [...prev, layer];
        } else if ((layer === "Optimizer" || layer === "Loss Function") && prev.includes("Output Layer")) {
          return [...prev, layer];
        } else {
          // If the layer can't be added, return the previous state unchanged
          console.log(`Cannot add ${layer} at this position`);
          return prev;
        }
      });
    }
  };

 


  const removeLayer = (layerToRemove) => {
    setSelectedLayers((layers) => {
      const index = layers.indexOf(layerToRemove);
      if (index !== -1) {
        if (layerToRemove === "Input Layer") {
          return [];
        }
        else if (layerToRemove === "Output Layer") {
          return layers.slice(0, index);
        }
        return layers.filter((_, i) => i !== index);
      }
      return layers;
    });
  };
  
  const addHiddenLayer = () => {
    setSelectedLayers((layers) => {
      const lastHiddenLayerIndex = layers.lastIndexOf("Hidden Layer");
      if (lastHiddenLayerIndex === -1) {
        return [...layers, "Hidden Layer"];
      } else {
        const newLayers = [...layers];
        newLayers.splice(lastHiddenLayerIndex + 1, 0, "Hidden Layer");
        return newLayers;
      }
    });
  }

  const [FFNeuralnet, setFFNeuralNet] = useState({
    "inputLayerSize": 0,
    "hiddenLayers": [],
    "OutputlayerSize": 0,
    "OutputAct": "",
    "Optimizer" : "",
    "LossFunction" : ""
  })


  const InputParamApply = (inputs) => {
    setFFNeuralNet(prevState => ({
      ...prevState,
      inputLayerSize: inputs
    }))
  }

  const HiddenParamApply = (index, size, act) => {
    setFFNeuralNet(prevState => {
      const newHiddenLayers = [...prevState.hiddenLayers];
      newHiddenLayers[index] = { size, act };
      return {
        ...prevState,
        hiddenLayers: newHiddenLayers
      };
    })
  }

  const OutputParamApply = (size, act) => {
    setFFNeuralNet(prevState => ({
      ...prevState,
      OutputlayerSize: size,
      OutputAct: act
    }))
  }

  const OptimizerParamApply = (opt) => {
    setFFNeuralNet(prevState => ({
      ...prevState,
      Optimizer: opt
    }))
  }

  const LossFunctionParamApply = (lf) => {
    setFFNeuralNet(prevState => ({
      ...prevState,
      LossFunction: lf
    }))
  }


  useEffect(() => {
    console.log(FFNeuralnet)
  }, [FFNeuralnet])



  

  return (
    <div className="flex flex-row mb-[10rem]">
      <Sidebar onSelectedLayers={onSelectedLayers} selectedLayers={selectedLayers} />
      <Mainbar selectedLayers={selectedLayers} removeLayer ={removeLayer} addHiddenLayer={addHiddenLayer} />
      <RightSidebar selectedLayers={selectedLayers}
        InputParamApply={InputParamApply}
        OutputParamApply={OutputParamApply} 
        HiddenParamApply={HiddenParamApply}
        OptimizerParamApply={OptimizerParamApply}
        LossFunctionParamApply={LossFunctionParamApply}
       />
    </div>
  )
}