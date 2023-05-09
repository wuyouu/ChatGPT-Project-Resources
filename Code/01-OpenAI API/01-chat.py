import os
import openai
# openai.api_key = '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'
openai.api_key = os.getenv("OPENAI_API_KEY")
response = openai.Completion.create(
    model="text-davinci-003",
    prompt="白日依山尽",
    temperature=0,
    max_tokens=100)
print(response.choices[0].text)
