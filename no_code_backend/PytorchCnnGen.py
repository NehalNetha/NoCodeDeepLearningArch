import textwrap

def pytorch_gen_file(config):
    code = f"""
import torch
import torch.nn as nn
import torch.optim as optim

class DynamicCNN(nn.Module):
    def __init__(self):
        super(DynamicCNN, self).__init__()
        self.layers = nn.ModuleList()
        
        # Input layer
        in_channels = {config['inputLayer']['channels']}
        input_height = {config['inputLayer']['height']}
        input_width = {config['inputLayer']['width']}
        
        # Convolutional layers
        {generate_conv_layers(config)}
        
        # Calculate the size of the flattened feature map
        with torch.no_grad():
            x = torch.randn(1, in_channels, input_height, input_width)
            for layer in self.layers:
                x = layer(x)
            flattened_size = x.view(1, -1).size(1)
        
        # Fully connected layers
        {generate_fc_layers(config)}
        
        # Output layer
        self.layers.append(nn.Linear({config['FullyConnectedLayer'][-1]['units']}, {config['outputLayer']['units']}))
        self.layers.append(self.get_activation('{config['outputLayer']['activation']}'))

    def forward(self, x):
        for layer in self.layers:
            x = layer(x)
        return x

    @staticmethod
    def get_activation(name):
        if name.lower() == 'relu':
            return nn.ReLU()
        elif name.lower() == 'softmax':
            return nn.Softmax(dim=1)
        elif name.lower() == 'sigmoid':
            return nn.Sigmoid()
        else:
            raise ValueError(f"Unsupported activation function: {{name}}")

def create_model_from_config():
    model = DynamicCNN()
    
    # Set up optimizer
    optimizer_class = getattr(optim, '{config['optimizer']}')
    optimizer = optimizer_class(model.parameters(), lr={config['modelConf']['learningRate']})
    
    # Set up loss function
    criterion = getattr(nn, '{config['lossFunction']}')()
    
    return model, optimizer, criterion

def train(model, optimizer, criterion, train_loader, epochs):
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model.to(device)
    
    for epoch in range(epochs):
        model.train()
        running_loss = 0.0
        for i, (inputs, labels) in enumerate(train_loader):
            inputs, labels = inputs.to(device), labels.to(device)
            
            optimizer.zero_grad()
            outputs = model(inputs)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()
            
            running_loss += loss.item()
            
        print(f"Epoch {{epoch+1}}/{{epochs}}, Loss: {{running_loss/len(train_loader):.4f}}")

def main():
    model, optimizer, criterion = create_model_from_config()
    epochs = {config['modelConf']['epochs']}
    
    # TODO: Implement your own data loading logic here
    # train_loader = ...
    
    print(model)
    print(f"Optimizer: {{optimizer}}")
    print(f"Loss function: {{criterion}}")
    
    # Uncomment the following line after implementing your data loading logic
    # train(model, optimizer, criterion, train_loader, epochs)

if __name__ == "__main__":
    main()
"""
    return textwrap.dedent(code)

def generate_conv_layers(config):
    conv_code = ""
    in_channels = config['inputLayer']['channels']
    for i, (conv, act, pool) in enumerate(zip(config['convLayers'], config['activationLayers'], config['poolingLayers'])):
        conv_code += f"""
        self.layers.append(nn.Conv2d(in_channels={in_channels}, out_channels={conv['filters']}, 
                                     kernel_size={conv['kernelSize']}, stride={conv['stride']}, 
                                     padding='{conv['padding']}'))
        self.layers.append(self.get_activation('{act}'))
        self.layers.append(nn.MaxPool2d(kernel_size={pool['kernelSize']}, stride={pool['stride']}))
        in_channels = {conv['filters']}
        """
    return textwrap.dedent(conv_code)

def generate_fc_layers(config):
    fc_code = "self.layers.append(nn.Flatten())\n"
    prev_units = "flattened_size"
    for i, fc in enumerate(config['FullyConnectedLayer']):
        fc_code += f"""
        self.layers.append(nn.Linear({prev_units}, {fc['units']}))
        self.layers.append(self.get_activation('{fc.get('activation', 'relu')}'))
        """
        prev_units = fc['units']
    return textwrap.dedent(fc_code)