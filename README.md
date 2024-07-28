
# No Code Deep Learning Visual Editor

Creating deep learning architectures can be challenging, and writing boilerplate code from scratch adds to the difficulty. That's why we've developed a no-code deep learning tool that allows you to design deep learning architectures, set custom hyperparameters, and download the corresponding PyTorch file at the end.

## Features That Work

- **Architecture Design**: Create architectures for Feed Forward Neural Networks (FNN), Convolutional Neural Networks (CNN), and Recurrent Neural Networks (RNN).
- **PyTorch File Download**: Download the PyTorch file after designing the architecture.

## Planned Features

- **Additional Architectures**: Support for Transformers, GANs, LSTMs, and more.
- **Data Transformations**: Ability to design and apply custom data transformations.
- **Enhanced UI**: Improved drag-and-drop functionality for a better user experience.
- **Robust PyTorch Files**: More robust and feature-rich PyTorch file generation.

## Timeline

- **Day One**: Built the UI, implemented architecture design blocks, and created a Flask API for downloading FNN PyTorch files.
- **Day Two**: Focused on designing CNN architectures, improving dynamic PyTorch file generation, and added RNN support.


## How it Works

- Using NextJs, We the users building blocks of any architecture to drop and design the architecture
- Then the user can add the hyper parameters of the the layers, model configurations
- We take the blocks and the data, and send it to the Flask Api, to dynamically generate python file to download

## Demo Video

[![Demo Video](https://github.com/user-attachments/assets/44f164c3-0bfe-42cd-ba19-583ed3f0d3af)](https://youtu.be/PJeJ_SJCfiU)

## Built By

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/NehalNetha">
        <img src="https://avatars.githubusercontent.com/u/84872197?v=4" width="180px;" alt="Nehal Netha"/>
        <br />
        <sub><b>Nehal Netha</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/KhushinVyas">
        <img src="https://avatars.githubusercontent.com/u/120413040?v=4" width="180px;" alt="Khushin Vyas"/>
        <br />
        <sub><b>Khushin Vyas</b></sub>
      </a>
    </td>
  </tr>
</table>


## To run locally

Clone the Repo

#### Frontend

```
cd NoCodeDeepLearning
npm i
npm run dev
```

### Backend

```
cd no_code_deeplearning
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
flask run

```
