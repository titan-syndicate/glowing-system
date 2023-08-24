import { NextApiRequest, NextApiResponse } from "next";

import { Server } from 'socket.io';


const SocketHandler = (req, res) => {
  try {
    if (res.socket.server.io) {
      console.log('Socket is already running')
    } else {
      console.log('Socket is initializing')
      const io = new Server(res.socket.server)


      io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);
      });

      io.on('error', (error) => {
        console.log('Socket.io Server Error:', error);
      });


      io.engine.on("connection_error", (err) => {
        console.log(err.req);      // the request object
        console.log(err.code);     // the error code, for example 1
        console.log(err.message);  // the error message, for example "Session ID unknown"
        console.log(err.context);  // some additional error context
      });



      res.socket.server.io = io
    }
    res.end()
  } catch (error) {
    console.error('API Route Error:', error);
    res.status(500).send(error.message);
  }
}

export default SocketHandler