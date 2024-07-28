
import React, {useState} from 'react'

function Navbar({CNNModel}) {

  const [isDownloadEnabled, setIsDownloadEnabled] = useState(false);


  const sendDataToBackend = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/get-conv-neuralnet', { // URL of your Flask server
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(CNNModel), // Convert the state to JSON
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Response from server:', data);

      localStorage.setItem('currentConfigId', data.id);

      // Enable the download button
      setIsDownloadEnabled(true);

    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };




  const downloadPythonFileConv = async () => {
    const configId = localStorage.getItem('currentConfigId');
    if (!configId) {
      console.error('No configuration ID found');
      return;
    }
    
    

    try {
      const response = await fetch(`http://127.0.0.1:5000/download-conv-neuralnet/${configId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `neural_network_${configId}.py`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('There was a problem downloading the file:', error);
    }
  };

  return (
    <nav  className="flex flex-row justify-between px-11 pt-7 pb-6 border-b-[1px] border-gray-700 ">
        <div className="flex flex-col gap-1 text-white">
            <h1 className="text-sm text-gray-400">No Code</h1>
            <h1>Deep Learning</h1>
        </div>

        <div className="flex flex-row gap-3">
            <button type="button" class="text-black bg-[#F6E6CB] font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
              onClick={sendDataToBackend}
            >Create
            </button>

             <button type="button" class={`text-black bg-[#F6E6CB] font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900 ${!isDownloadEnabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={downloadPythonFileConv}
              disabled={!isDownloadEnabled}

             >Export</button>

        </div>
    </nav>
  )
}

export default Navbar