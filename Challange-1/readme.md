# Banglish to Bangla Transliteration Project

## Overview
This project implements a Banglish-to-Bangla Transliteration Model using a fine-tuned MT5 model on the dataset `SKNahin/bengali-transliteration-data` from Hugging Face. The model takes Banglish text (Bengali written in Roman script) as input and outputs the corresponding Bangla script.

## Tasks

### 1. Load the Dataset
- Used the Hugging Face datasets library to load the dataset
- Split the dataset into training and validation subsets (90/10 split)

### 2. Data Preprocessing
- Tokenized both Banglish and Bangla text using the tokenizer for the MT5 model
- Filtered the dataset to remove overly short or long sequences for better training efficiency

### 3. Model Selection
Selected MT5 (Multilingual T5) for the task:
- **Why MT5?** It is a multilingual model designed for sequence-to-sequence tasks, making it suitable for low-resource languages like Bangla
- **Size:** Used the small variant for faster training and lower resource consumption

### 4. Train the Model
- Fine-tuned the MT5 model using the Hugging Face Trainer API
- Configured training with appropriate hyperparameters:
  - Learning rate: 5e-5
  - Batch size: 8
  - Epochs: 3
- Saved the fine-tuned model and tokenizer for deployment

## Setup and Installation

### Clone the Repository
```bash
git clone https://github.com/your-username/banglish-to-bangla.git
cd banglish-to-bangla
```

### Install Required Libraries
Install the necessary Python libraries using pip:
```bash
pip install transformers datasets torch
```

### Google Colab Environment
1. Open the project in Google Colab
2. Ensure the runtime is set to GPU:
   - Runtime > Change runtime type > Hardware accelerator > GPU

## Training Pipeline

### 1. Load the Dataset
```python
from datasets import load_dataset

# Load dataset
dataset = load_dataset("SKNahin/bengali-transliteration-data")

# Split into training and validation sets
dataset = dataset["train"].train_test_split(test_size=0.1)
```

### 2. Preprocess the Data
```python
from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("google/mt5-small")

# Preprocessing function
def preprocess_function(examples):
    inputs = tokenizer(examples["banglish"], max_length=128, truncation=True, padding="max_length")
    targets = tokenizer(examples["bangla"], max_length=128, truncation=True, padding="max_length")
    inputs["labels"] = targets["input_ids"]
    return inputs

# Apply preprocessing
tokenized_dataset = dataset.map(preprocess_function, batched=True)
```

### 3. Fine-Tune the Model
```python
from transformers import MT5ForConditionalGeneration, TrainingArguments, Trainer

model = MT5ForConditionalGeneration.from_pretrained("google/mt5-small")

# Define training arguments
training_args = TrainingArguments(
    output_dir="./results",
    evaluation_strategy="epoch",
    learning_rate=5e-5,
    per_device_train_batch_size=8,
    num_train_epochs=3,
    save_strategy="epoch"
)

# Trainer instance
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_dataset["train"],
    eval_dataset=tokenized_dataset["test"],
    tokenizer=tokenizer
)

# Train the model
trainer.train()
```

### 4. Save the Model
```python
model.save_pretrained("./banglish-to-bengali-model")
tokenizer.save_pretrained("./banglish-to-bengali-model")
```

## Deployment

### Streamlit App
To deploy the transliteration model as a web app, we use Streamlit.

#### Install Streamlit
```bash
pip install streamlit
```

#### Streamlit Code (app.py)
Save the following code as `app.py`:

```python
import streamlit as st
from transformers import MT5ForConditionalGeneration, AutoTokenizer
import torch

model_path = "./banglish-to-bengali-model"
tokenizer = AutoTokenizer.from_pretrained(model_path)
model = MT5ForConditionalGeneration.from_pretrained(model_path).to("cpu")

st.title("Banglish to Bangla Transliteration")
banglish_text = st.text_area("Enter Banglish Text:", "")

if st.button("Transliterate"):
    if banglish_text.strip():
        inputs = tokenizer(banglish_text, return_tensors="pt", max_length=128, truncation=True, padding="max_length")
        outputs = model.generate(**inputs)
        bangla_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
        st.success(bangla_text)
    else:
        st.warning("Please enter Banglish text.")
```

#### Run the App
```bash
streamlit run app.py
```

## Results
- Input: "amar sonar bangla"
- Output: "আমার সোনার বাংলা"
