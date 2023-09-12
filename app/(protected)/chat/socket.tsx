'use client'
import { useEffect } from 'react'
import { io } from 'socket.io-client'
let socket;

export default function Home () {
  useEffect(() => {
    const socketInitializer = async () => {
      const response = await fetch('/api/socket');
      // socket = io('/api/socket'); // Connect to the specific endpoint
      // Point the client to the custom Socket.io path
      socket = io('http://localhost:3000', {
        path: '/api/socket'  // Set the path to the Socket.io server
      });

      socket.on('connect', () => {
        console.log('connected');
      });

      socket.on('connect_error', (error) => {
        console.log('Connect Error:', error);
    });

    socket.on('connect_timeout', () => {
        console.log('Connection Timeout');
    });

    socket.on('error', (error) => {
        console.log('Error:', error);
    });


    };

    socketInitializer();
  }, []);

  return null;
}