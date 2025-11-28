import { Card } from '../ui/card';
import { Button } from '../ui/button';
import type { User } from '../../App';
import { ArrowLeft, Calendar, MapPin, Users } from 'lucide-react';

interface AlumniEventsProps {
  user: User;
  onBack: () => void;
}

export function AlumniEvents({ user, onBack }: AlumniEventsProps) {
  const events = [
    { id: '1', title: 'Class of 2020 Reunion', date: 'Dec 15, 2025', location: 'UCU Main Campus', attendees: 45, image: 'reunion' },
    { id: '2', title: 'Alumni Networking Dinner', date: 'Jan 10, 2026', location: 'Serena Hotel', attendees: 120, image: 'networking' },
    { id: '3', title: 'Career Development Workshop', date: 'Jan 25, 2026', location: 'Virtual', attendees: 200, image: 'workshop' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-6">
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-primary">Upcoming Events</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-4">
        {events.map((event) => (
          <Card key={event.id} className="p-6">
            <div className="flex gap-4">
              <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary to-accent flex flex-col items-center justify-center text-white flex-shrink-0">
                <span>{event.date.split(' ')[1]}</span>
                <span className="text-xs">{event.date.split(' ')[0]}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg mb-2">{event.title}</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{event.attendees} attending</span>
                  </div>
                </div>
                <Button className="mt-4">RSVP</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
