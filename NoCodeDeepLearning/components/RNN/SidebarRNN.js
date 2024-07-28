import React from 'react'
import RNN from './RNN'

function SidebarRNN({onSelectedLayersRNN, selectedLayers}) {
  return (
    <div>
        <div className="w-[19rem] min-h-screen border-r-[1px]  border-gray-400 bg-gray-900">
          <RNN  onSelectedLayersRNN={onSelectedLayersRNN} selectedLayers={selectedLayers} />
        </div>
    </div>
  )
}

export default SidebarRNN