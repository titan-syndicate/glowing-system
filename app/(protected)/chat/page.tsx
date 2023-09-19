"use client"
import { useState } from 'react';

export default MessagesPage;

const sampleEvents: EventType[] = [];
const participants = ["John", "Jane", "Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Hannah"];

for (let i = 0; i < 150; i++) {
    const randomParticipant = participants[Math.floor(Math.random() * participants.length)];
    const hour = Math.floor(i / 60) + 10; // Starts at 10:00
    const minute = i % 60;
    const formattedTime = `${hour}:${String(minute).padStart(2, '0')}`;

    // Alternate between message and participant events
    if (i % 2 === 0) {
        sampleEvents.push({
            timeStamp: formattedTime,
            type: 'message',
            kind: 'ParticipantMessage',
            content: `Hello, ${randomParticipant}!`
        });
    } else {
        sampleEvents.push({
            timeStamp: formattedTime,
            type: 'participant',
            content: `${randomParticipant} has joined the chat.`
        });
    }
}

function MessagesPage() {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex-grow overflow-y-auto pb-4">
        <EventList />
      </div>
      <div className="h-14">
        <MessageInput />
      </div>
    </div>
  );
}

type EventType = {
  timeStamp: string;
  type: 'message' | 'participant';
  kind?: 'ParticipantMessage';
  content: string;
};

// const sampleEvents: EventType[] = [
//   { timeStamp: '10:00', type: 'message', kind: 'ParticipantMessage', content: 'Hello, John!' },
//   { timeStamp: '10:01', type: 'participant', content: 'Jane has joined the chat.' },
// ];

function EventList() {
  const sortedEvents = [...sampleEvents].sort((a, b) => a.timeStamp.localeCompare(b.timeStamp));

  return (
    // <div className="h-full w-full p-4">
    <>
      {sortedEvents.map((event, idx) => (
        <div key={idx} className="mb-2">
          <span className="text-gray-500">{event.timeStamp}</span>
          <span className="ml-2">
            {event.type === 'message' && event.kind === 'ParticipantMessage' && (
              <span>{event.content}</span>
            )}
            {event.type === 'participant' && <span className="text-blue-500">{event.content}</span>}
          </span>
        </div>
      ))}
    {/* </div> */}
      </>
  );
}

function MessageInput() {
  const [message, setMessage] = useState('');

  return (
    <div className="h-full w-full flex items-center px-4">
      <input
        type="text"
        placeholder="Type a message..."
        className="flex-grow border rounded px-2 py-1"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="ml-2 px-4 py-1 bg-blue-500 text-white rounded">Send</button>
    </div>
  );
}