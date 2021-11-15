from pipelines import pipeline
import gradio as gr

nlp = pipeline("e2e-qg")

# text = "Python is an interpreted, high-level, general-purpose programming language. Created by Guido van Rossum \
# and first released in 1991, Python's design philosophy emphasizes code \
# readability with its notable use of significant whitespace."

# response = nlp(text)

# print("Input Text ➡️", text)
# print("Generated Questions ➡️", response)


def generate(input):
  questions = nlp(input)
  return questions

iface = gr.Interface(
  fn=generate, 
  inputs=gr.inputs.Textbox(lines=2, placeholder="Input Text Here..."), 
  outputs="text")
iface.launch()