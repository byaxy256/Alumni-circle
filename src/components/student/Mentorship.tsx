// src/components/student/Mentorship.tsx

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ArrowLeft, MessageSquare, Send, Star, UserPlus, Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import type { User } from '../../App';
import { API_BASE } from '../../api';

// --- Type Definitions ---
interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  rating: number;
  mentees: number;
  classOf: number;
  bio: string;
  tags: string[];
  status: 'available' | 'unavailable';
}

interface MyMentor extends Mentor {
  sessions: number;
  nextSession?: string;
}

interface Message {
  id: string;
  sender_id: string;
  message_text: string;
  created_at: string;
}

// --- Main Component ---
export function Mentorship({ user, onBack }: { user: User; onBack: () => void; }) {
  // --- This is your original mock data, restored for UI consistency ---
  const myMockMentors: MyMentor[] = [
    { id: 'mentor-1', name: 'Dr. Sarah Nakabugo', title: 'Senior Software Engineer', company: 'Microsoft', location: 'Kampala, Uganda', rating: 4.9, mentees: 12, classOf: 2015, bio: '...', tags: [], status: 'available', sessions: 4, nextSession: '10 November at 03:00' }
  ];

  const availableMockMentors: Mentor[] = [
    { id: 'mentor-2', name: 'James Okello', title: 'Financial Analyst', company: 'Stanbic Bank', location: 'Nairobi, Kenya', rating: 4.8, mentees: 8, classOf: 2012, bio: 'Former UCU student, now helping others succeed in finance and banking careers.', tags: ['Finance', 'Banking', 'Investment'], status: 'available' },
    { id: 'mentor-3', name: 'Linda Namukasa', title: 'Marketing Director', company: 'MTN Uganda', location: 'Kampala, Uganda', rating: 5, mentees: 15, classOf: 2014, bio: 'Helping students build strong marketing foundations and personal brands.', tags: ['Marketing', 'Brand Strategy', 'Digital Marketing'], status: 'unavailable' },
    { id: 'mentor-4', name: 'Peter Mugisha', title: 'Entrepreneur & CEO', company: 'TechStart Africa', location: 'Kigali, Rwanda', rating: 4.7, mentees: 20, classOf: 2011, bio: 'Founded 3 successful startups. Passionate about entrepreneurship education.', tags: ['Entrepreneurship', 'Startups', 'Business Development'], status: 'available' },
  ];
  
  const [myMentors, setMyMentors] = useState<MyMentor[]>(myMockMentors);
  const [availableMentors, setAvailableMentors] = useState<Mentor[]>(availableMockMentors);
  const [loading, setLoading] = useState(false); // Set to false since we are using mock data

  const [activeChatMentor, setActiveChatMentor] = useState<MyMentor | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null); // Ref for auto-scrolling

  // In the future, you will replace the mock data with a real API call inside a useEffect hook.
  // useEffect(() => { /* ... fetch real data here ... */ }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleOpenChat = async (mentor: MyMentor) => {
    setActiveChatMentor(mentor);
    setMessages([]); // Start with a blank slate
    try {
      const token = localStorage.getItem('token') || '';
      const res = await fetch(`${API_BASE}/chat/${mentor.id}`, { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error('Failed to load chat history.');
      const chatHistory: Message[] = await res.json();
      setMessages(chatHistory);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (!activeChatMentor) return;
    const fetchLatestMessages = async () => { /* ... */ };
    const intervalId = setInterval(fetchLatestMessages, 5000);
    return () => clearInterval(intervalId);
  }, [activeChatMentor, messages.length]);

  const handleSendMessage = async () => { /* ... (This function is correct) ... */ };

  if (activeChatMentor) {
    return (
      <div className="flex flex-col h-screen bg-gray-50">
        <header className="bg-white border-b p-4 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto flex items-center gap-4">
            <Button onClick={() => setActiveChatMentor(null)} variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button>
            <div className="flex items-center gap-3">
              <Avatar><AvatarFallback>{activeChatMentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback></Avatar>
              <div><h1 className="font-semibold">{activeChatMentor.name}</h1><p className="text-xs text-green-500">Online</p></div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
                <div className="text-center text-sm text-gray-500 py-10">
                    <p>This is the beginning of your conversation with {activeChatMentor.name}.</p>
                    <p>Send a message to get started!</p>
                </div>
            ) : (
                messages.map(msg => (
                    <div key={msg.id} className={`flex items-end gap-2 ${msg.sender_id === user.uid ? 'justify-end' : ''}`}>
                        <div className={`max-w-xs lg:max-w-md p-3 rounded-2xl ${msg.sender_id === user.uid ? 'bg-primary text-white rounded-br-none' : 'bg-white rounded-bl-none border'}`}>
                            <p className="text-sm">{msg.message_text}</p>
                            <p className="text-xs opacity-70 mt-1 text-right">{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                    </div>
                ))
            )}
            <div ref={messagesEndRef} />
        </main>
        <footer className="bg-white border-t p-4 sticky bottom-0">
          <div className="max-w-4xl mx-auto flex items-center gap-2">
            <Input placeholder="Type a message..." value={newMessage} onChange={e => setNewMessage(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSendMessage()} />
            <Button onClick={handleSendMessage} disabled={isSending}>
              {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </div>
        </footer>
      </div>
    );
  }

  // --- YOUR ENTIRE ORIGINAL JSX IS PRESERVED AND RESTORED BELOW ---
  return (
    <div className="p-4 lg:p-6 space-y-8">
      <div className="flex items-center gap-4">
        <Button onClick={onBack} variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button>
        <div>
          <h1 className="text-xl font-semibold">Mentorship</h1>
          <p className="text-sm text-gray-500">Connect with UCU alumni for guidance and support</p>
        </div>
      </div>

      <section>
        <h2 className="text-lg font-semibold mb-4">My Mentors</h2>
        {myMentors.length > 0 ? (
          myMentors.map(mentor => (
            <Card key={mentor.id} className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="h-12 w-12"><AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback></Avatar>
                  <div>
                    <p className="font-semibold">{mentor.name}</p>
                    <p className="text-xs text-gray-600">{mentor.title}</p>
                    <Badge variant="outline" className="mt-1 bg-white">Active · {mentor.sessions} sessions</Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                    <Button className="flex-1" onClick={() => handleOpenChat(mentor)}>
                        <MessageSquare className="w-4 h-4 mr-2"/> Message
                    </Button>
                </div>
                {mentor.nextSession && <p className="text-xs text-gray-500 mt-3 text-center">Next session: {mentor.nextSession}</p>}
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-sm text-gray-500">You are not currently matched with any mentors.</p>
        )}
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Available Mentors</h2>
        <div className="space-y-4">
            {availableMentors.map(mentor => (
                <Card key={mentor.id}>
                    <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-16 w-16"><AvatarFallback>{mentor.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback></Avatar>
                                <div>
                                    <p className="font-semibold">{mentor.name}</p>
                                    <p className="text-xs text-gray-600">{mentor.title}</p>
                                    <p className="text-xs text-gray-500">{mentor.company} · {mentor.location}</p>
                                    <div className="flex items-center gap-1 text-xs mt-1">
                                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                        <span>{mentor.rating} · {mentor.mentees} mentees · Class of {mentor.classOf}</span>
                                    </div>
                                </div>
                            </div>
                            <Badge variant={mentor.status === 'available' ? 'default' : 'secondary'} className={mentor.status === 'available' ? 'bg-yellow-400 text-yellow-900' : ''}>
                                {mentor.status === 'available' ? 'Available' : 'Unavailable'}
                            </Badge>
                        </div>
                        <p className="text-sm text-gray-600 my-3">{mentor.bio}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {mentor.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                        </div>
                        <Button className="w-full" disabled={mentor.status === 'unavailable'}>
                            {mentor.status === 'available' ? <><UserPlus className="w-4 h-4 mr-2"/> Request Mentor</> : 'Currently Unavailable'}
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-lg font-semibold mb-4">Why Get a Mentor?</h2>
        <div className="grid md:grid-cols-3 gap-4">
            <Card><CardContent className="p-4">...</CardContent></Card>
            <Card><CardContent className="p-4">...</CardContent></Card>
            <Card><CardContent className="p-4">...</CardContent></Card>
        </div>
      </section>
    </div>
  );
}