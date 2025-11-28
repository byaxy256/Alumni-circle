import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import type { User } from '../../App';
import { ArrowLeft, MessageSquare, Send } from 'lucide-react';
import { useState } from 'react';

interface MentorshipHubProps {
  user: User;
  onBack: () => void;
}

export function MentorshipHub({ user, onBack }: MentorshipHubProps) {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const mentees = [
    { id: '1', name: 'Sarah Nakato', course: 'Computer Science', lastMessage: 'Thank you for your guidance!', unread: 2 },
    { id: '2', name: 'John Okello', course: 'Business Admin', lastMessage: 'Can we schedule a call?', unread: 1 },
    { id: '3', name: 'Grace Auma', course: 'Engineering', lastMessage: 'I got the internship!', unread: 0 },
  ];

  const messages = selectedStudent ? [
    { id: '1', from: 'them', text: 'Hello! Thank you for being my mentor.', time: '10:30 AM' },
    { id: '2', from: 'me', text: 'Happy to help! How can I assist you today?', time: '10:35 AM' },
    { id: '3', from: 'them', text: 'I\'m struggling with my final year project. Can you give me some advice?', time: '10:40 AM' },
  ] : [];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-primary">Mentorship Hub</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto h-[calc(100vh-80px)] md:h-[calc(100vh-100px)]">
        <div className="grid md:grid-cols-3 h-full">
          {/* Mentees List */}
          <div className="border-r border-gray-200 bg-white overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <h3>Your Mentees ({mentees.length})</h3>
            </div>
            <div>
              {mentees.map((mentee) => (
                <button
                  key={mentee.id}
                  onClick={() => setSelectedStudent(mentee.id)}
                  className={`w-full p-4 border-b border-gray-200 text-left hover:bg-gray-50 transition ${
                    selectedStudent === mentee.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <p className="text-sm">{mentee.name}</p>
                      <p className="text-xs text-gray-600">{mentee.course}</p>
                    </div>
                    {mentee.unread > 0 && (
                      <span className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                        {mentee.unread}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 truncate">{mentee.lastMessage}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="md:col-span-2 flex flex-col bg-white">
            {selectedStudent ? (
              <>
                <div className="p-4 border-b border-gray-200">
                  <p>{mentees.find(m => m.id === selectedStudent)?.name}</p>
                  <p className="text-xs text-gray-600">
                    {mentees.find(m => m.id === selectedStudent)?.course}
                  </p>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-lg ${
                          msg.from === 'me'
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                        <p className={`text-xs mt-1 ${msg.from === 'me' ? 'text-white/70' : 'text-gray-500'}`}>
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t border-gray-200">
                  <div className="flex gap-2">
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && message.trim()) {
                          setMessage('');
                        }
                      }}
                    />
                    <Button>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4" />
                  <p>Select a mentee to start chatting</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
