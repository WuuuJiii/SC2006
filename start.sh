#!/bin/bash

# Install backend dependencies
cd backend
npm install
# Start backend
npm run start &

# Install frontend dependencies
cd ../frontend/client
npm install
# Start frontend
npm start