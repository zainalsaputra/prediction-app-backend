const cors = require("cors");
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const setupSwagger = require('./docs/swagger');
const path = require('path');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.set("trust proxy", 1);

const helmet = require("helmet");
app.use(helmet());

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const routes = require('./routes/index');
const errorHandler = require('./middleware/errorHandler');
const { requestLimiter } = require('./middleware/rateLimit');

app.use(routes);
app.use(requestLimiter);
app.use(errorHandler);

setupSwagger(app);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});

const db = require('./models');

db.sequelize.authenticate()
  .then(() => console.log('✅ Database connected successfully!'))
  .catch((err) => console.error('❌ Error connecting to database:', err));

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('join_room', (userId) => {
    if (!userId) return;
    socket.join(userId);
    console.log(`User ${socket.id} joined room: ${userId}`);
  });

  socket.on('disconnect', () => {
    console.log(`User Disconnected: ${socket.id}`);
  });
});

app.set('socketio', io);

setInterval(() => {
  console.log('Users connected to socket:', io.sockets.adapter.rooms);
}, 15000);

module.exports = app;
