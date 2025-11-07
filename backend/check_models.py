import google.generativeai as genai
import os

# Your API key
YOUR_API_KEY = "AIzaSyB5i1L4zpA2j46MUvu0dJPHwi65Z0golK4"
genai.configure(api_key=YOUR_API_KEY)

print("--- Checking for available models... ---")

try:
    # Ask Google to list all models for your key
    for model in genai.list_models():
        # We only care about models that can 'generateContent'
        if 'generateContent' in model.supported_generation_methods:
            print(f"Found model: {model.name}")

except Exception as e:
    print(f"An error occurred: {e}")
    print("This probably means the API is still not enabled correctly in your Google Cloud project.")

print("--- Check complete. ---")