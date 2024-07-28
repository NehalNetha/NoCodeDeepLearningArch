"use client"
import React, { useState, useEffect } from 'react'

import SidebarRNN from './SidebarRNN';
import MainbarRNN from './MainbarRNN';
import RightSIdebarRNN from './RightSIdebarRNN';

export default function NeuralNetworksRNN({}) {
    const [selectedLayers, setSelectedLayers] = useState([]);


  

    const onSelectedLayersRNN = (layer) => {
        if (!selectedLayers.includes(layer)) {
          setSelectedLayers((prev) => {
            // Check if the layer can be added based on the current structure
            if (layer === "Input Layer" && prev.length === 0) {
              return [...prev, layer];
            } else if (layer === "RNN Layer" && prev.includes("Input Layer") && !prev.includes("Fully Connected Layer")) {
              return [...prev, layer];
            } else if (layer === "Fully Connected Layer" && prev.includes("RNN Layer") && !prev.includes("Output Layer")) {
              return [...prev, layer];
            } else if (layer === "Output Layer" && prev.includes("Fully Connected Layer") && !prev.includes("Output Layer")) {
              return [...prev, layer];
            } else if (layer === "Optimizer" && prev.includes("Output Layer") && !prev.includes("Optimizer")) {
              return [...prev, layer];
            } else if (layer === "Loss Function" && prev.includes("Optimizer") && !prev.includes("Loss Function")) {
              return [...prev, layer];
            } else if (layer === "Learning Rate" && prev.includes("Loss Function") && !prev.includes("Learning Rate")) {
              return [...prev, layer];
            } else if (layer === "Num Epochs" && prev.includes("Learning Rate") && !prev.includes("Num Epochs")) {
              return [...prev, layer];
            } else {
              console.log(`Cannot add ${layer} at this position`);
              return prev;
            }
          });
        }
      };

      useEffect(() => {
        console.log(selectedLayers)
      }, [selectedLayers])

      const removeLayer = (layerToRemove) => {
        setSelectedLayers((layers) => layers.filter(layer => layer !== layerToRemove));
        setCNNModel(prevModel => {
          const newModel = { ...prevModel };
          if (layerToRemove === "Conv Layer") {
            newModel.convLayers.pop();
          } else if (layerToRemove === "Fully Connected Layer") { 
    
    
            newModel.FullyConnectedLayer.pop();
          } else if (layerToRemove === "Flatten Layer") {
            newModel.flattenLayer = {};
          }
          return newModel;
        });
      };

      const addFullyConnectedLayer = () => {
        setSelectedLayers((layers) => {
          const lastConvLayerIndex = layers.lastIndexOf("Fully Connected Layer");
          if (lastConvLayerIndex === -1) {
            return [...layers, "Fully Connected Layer"];
          } else {
            const newLayers = [...layers];
            newLayers.splice(lastConvLayerIndex + 1, 0, "Fully Connected Layer");
            return newLayers;
          }
        });
      }

      const addRecurrentLayer = () => {
        setSelectedLayers((layers) => {
          const lastRNNLayer = layers.lastIndexOf("RNN Layer");
          if (lastRNNLayer === -1) {
            return [...layers, "RNN Layer"];
          } else {
            const newLayers = [...layers];
            newLayers.splice(lastRNNLayer + 1, 0, "RNN Layer");
            return newLayers;
          }
        });
      }

      const [dropdownStates, setDropdownStates] = useState({
        "Input Layer": false,
        "RNN Layer": false,
        "Fully Connected Layer": false,
        "Output Layer": false
      });
    
      const toggleDropdown = (dropdownName) => {
        setDropdownStates(prevStates => {
          const newStates = Object.keys(prevStates).reduce((acc, key) => {
            acc[key] = key === dropdownName ? !prevStates[key] : false;
            return acc;
          }, {});
          return newStates;
        });
      };
      
      


 
  return (
    <div className="flex flex-row min-h-screen">
      <SidebarRNN onSelectedLayersRNN={onSelectedLayersRNN} selectedLayers={selectedLayers}  />
      <MainbarRNN 
        selectedLayers={selectedLayers} 
        removeLayer={removeLayer} 
        addFullyConnectedLayer={addFullyConnectedLayer}
        addRecurrentLayer={addRecurrentLayer}
        toggleDropdown={toggleDropdown}
        
      />
      <RightSIdebarRNN selectedLayers={selectedLayers} dropdownStates={dropdownStates} />
    </div>
  )
}