require('dotenv').config();
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const OpenAI = require('openai');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// OpenAI API initialise
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const upload = multer({ dest: 'uploads/' });

// Tasks saved in memory
const tasks = {};

app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.post('/api/edit', upload.single('image'), async (req, res) => {
  const imageFilePath = req.file.path;
  const { prompt } = req.body;
  const taskId = uuidv4();

  // Create a new task with the uploaded image and prompt
  tasks[taskId] = {
    imageFilePath,
    prompt,
    clients: [],
    started: false,
  };

  res.json({ taskId });
});

// Stream the generated images to the client using Server-Sent Events (SSE)
app.get('/api/stream/:taskId', (req, res) => {
  const { taskId } = req.params;
  const task = tasks[taskId];

  if (!task) {
    res.status(404).send('Task not found');
    return;
  }

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });

  res.write(': connected\n\n');

  task.clients.push(res);

  if (!task.started) {
    task.started = true;
    processImages(taskId);
  }

  // remove client from task clients array when connection closes
  req.on('close', () => {
    task.clients = task.clients.filter((client) => client !== res);
  });
});

// Generate a detailed prompt based on the user's input
async function generatePrompt(promptText) {
  try {
    const completion = await openai.chat.completions.create({
      model: "chatgpt-4o-latest", 
      messages: [
        { role: "system", content: "You are an assistant who helps create detailed image descriptions for use with text-to-image models such as Stable Diffusion. Based on the user's age, gender, preferences, era and location, you create an accurate but detailed prompt that includes appropriate physical characteristics, clothing and environment, suitable for image generation." },
        { role: "user", content: promptText }
      ]
    });
    let generatedPrompt =  completion.choices[0].message.content.trim();
    console.log("Generated Prompt: ", generatedPrompt);
    
    return generatedPrompt;
  } catch (error) {
    console.error('Error with OpenAI API:', error);
    throw error;
  }
}

// Process the uploaded image and generate images based on the prompt
async function processImages(taskId) {
  const task = tasks[taskId];
  const { imageFilePath, prompt, clients } = task;

  try {
    const generatedPrompt = await generatePrompt(prompt);
    console.log("Received Prompt: ", prompt);
    console.log("Generated Prompt: ", generatedPrompt);

    const requests = [];
    // const controlStrength = [0, 0.5, 1];
    const controlStrength = [0, 0.2, 0.4, 0.6, 0.8, 1];

    for (let i = 0; i < controlStrength.length; i++) {
      const formData = new FormData();
      formData.append('image', fs.createReadStream(imageFilePath));
      formData.append('prompt', generatedPrompt);
      formData.append('control_strength', controlStrength[i]);
      formData.append('output_format', 'png');

      const request = axios
        .post('https://api.stability.ai/v2beta/stable-image/control/structure', formData, {
          headers: {
            Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
            ...formData.getHeaders(),
            Accept: 'image/*',
          },
          responseType: 'arraybuffer',
        })
        .then((response) => {
          if (response.status === 200) {
            const base64Image = Buffer.from(response.data).toString('base64');
            const data = `data:image/webp;base64,${base64Image}`;
            //send image data as an event to the clients
            sendEvent(clients, 'image', data);  
          } else {
            console.error(`API error: ${response.status}: ${response.data.toString()}`);
          }
        })
        .catch((error) => {
          console.error('Error processing image:', error);
        });

      requests.push(request);
    }

    await Promise.all(requests);
    sendEvent(clients, 'end', 'Processing complete');
  } finally {
    fs.unlinkSync(imageFilePath);
    delete tasks[taskId];
  }
}

// funtion to send events to clients using Server-Sent Events (SSE)
function sendEvent(clients, eventName, data) {
  clients.forEach((client) => {
    client.write(`event: ${eventName}\n`);
    client.write(`data: ${data}\n\n`);
  });
}

// Starte den Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
