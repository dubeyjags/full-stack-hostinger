import express from 'express';
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
    origin: ['http://localhost:5174', 'http://localhost:5173', 'http://localhost:3000'], // Add prod urls when deploying
    methods: ['GET', 'POST'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
    credentials: true, // Enable cookies and credentials
  }));
app.use(express.json());

app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello RAM!' });
});

app.listen(PORT, '0.0.0.0', () =>  // Port binding issue fixed with "0.0.0.0"
  console.log(`Server is running on port ${PORT}`)
); 

