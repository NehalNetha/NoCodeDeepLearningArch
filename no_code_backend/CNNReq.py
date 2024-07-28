from flask import Flask, request, jsonify, send_file
import uuid
import io
import textwrap
from PytorchCnnGen import pytorch_gen_file

cnn_configs = {}
def get_convolutional_neural_net():
    try:
        data = request.json
        
        required_keys = [
            "inputLayer", "convLayers", "activationLayers", "poolingLayers",
            "FullyConnectedLayer", "outputLayer", "optimizer", "lossFunction",
            "modelConf"
        ]
        
        if not all(key in data for key in required_keys):
            return jsonify({"error": "Invalid data format"}), 400

        # Validate nested structures
        if not all(key in data["inputLayer"] for key in ["width", "height", "channels", "batchSize"]):
            return jsonify({"error": "Invalid input layer format"}), 400

        if not all(key in data["outputLayer"] for key in ["units", "activation"]):
            return jsonify({"error": "Invalid output layer format"}), 400

        # Generate a unique ID for this configuration
        config_id = str(uuid.uuid4())
        
        # Store the configuration
        cnn_configs[config_id] = data
        
        response_data = {
            "id": config_id,
            "config": data
        }
        
        print(f"Stored CNN configuration: {response_data}")
        
        return jsonify(response_data), 200
    except Exception as e:
        # Handle errors
        return jsonify({"error": str(e)}), 500
    

def download_cnn_file(config_id):
    if config_id not in cnn_configs:
        return jsonify({"error": "Configuration not found"}), 404
    
    config = cnn_configs[config_id]
    pytorch_code = pytorch_gen_file(config)
    
    # Create an in-memory file-like object
    buffer = io.BytesIO()
    buffer.write(pytorch_code.encode('utf-8'))
    buffer.seek(0)
    
    return send_file(
        buffer,
        as_attachment=True,
        download_name='dynamic_cnn.py',
        mimetype='text/x-python'
    )
    

