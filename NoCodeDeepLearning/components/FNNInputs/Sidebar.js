"use client"
import React, {useState} from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import FNN from './FNN'

function Sidebar({selectedLayers, onSelectedLayers }) {

    const NeuralNets = ["FNN", "CNN", "RNN", "LSTM", "Transformers"]
    
    const [isFNN, setFNN] = useState(false)

    const onFNN = () => {
        setFNN(true)
    }

  return (
    <div className="w-[19rem] min-h-screen border-r-[1px] border-gray-400 bg-gray-900">
{/* 
    <div className="border-b-[1px] border-gray-400">
            <Carousel
        opts={{
            align: "start",
        }}
        className="w-[16rem] max-w-sm"
        >
      <CarouselContent  >
        {NeuralNets.map((nn) => (
          <CarouselItem key={nn} className="md:basis-1/2 lg:basis-1/3">
            <div className="px-7 pt-7 pb-3">
                <button className="text-white text-sm">
                    {nn}
                </button>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
        </Carousel>
     </div> */}

        
    <FNN  onSelectedLayers={onSelectedLayers} selectedLayers={selectedLayers}/>


    </div>
  )
}

export default Sidebar