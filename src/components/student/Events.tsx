import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ArrowLeft, Calendar, MapPin, Users, Clock } from 'lucide-react';
import { ImageWithFallback } from '../figma_image/ImageWithFallback';

interface EventsProps {
  onBack: () => void;
}

export function Events({ onBack }: EventsProps) {
  const events = [
    {
      id: '1',
      title: 'UCU Alumni Run 2025',
      date: 'December 20, 2025',
      time: '7:00 AM - 12:00 PM',
      location: 'UCU Main Campus, Mukono',
      description: 'Join alumni, students, and staff for the annual UCU Alumni Run. Participate in 5K, 10K, or 21K races. All proceeds support student scholarships.',
      image: 'https://images.unsplash.com/photo-1695655300485-d3da8bc72076?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW5uaW5nJTIwbWFyYXRob24lMjBldmVudHxlbnwxfHx8fDE3NjI2OTA0OTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      attendees: 450,
      registrationFee: 50000,
      category: 'Sports',
      status: 'upcoming',
    },
    {
      id: '2',
      title: 'Honours College Dinner 2025',
      date: 'January 15, 2026',
      time: '6:00 PM - 10:00 PM',
      location: 'Serena Hotel, Kampala',
      description: 'An elegant evening celebrating academic excellence. Network with distinguished alumni, faculty, and honors students. Dress code: Formal',
      image: 'https://images.unsplash.com/photo-1759124650033-86c0623481c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZGlubmVyJTIwZ2FsYXxlbnwxfHx8fDE3NjI2OTA0OTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      attendees: 200,
      registrationFee: 150000,
      category: 'Gala',
      status: 'upcoming',
    },
    {
      id: '3',
      title: 'Career Fair 2026',
      date: 'February 5, 2026',
      time: '9:00 AM - 5:00 PM',
      location: 'UCU Main Hall',
      description: 'Meet potential employers, learn about internship opportunities, and connect with alumni working in top companies.',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
      attendees: 800,
      registrationFee: 0,
      category: 'Career',
      status: 'upcoming',
    },
    {
      id: '4',
      title: 'Class of 2020 Reunion',
      date: 'March 10, 2026',
      time: '2:00 PM - 8:00 PM',
      location: 'UCU Alumni Center',
      description: 'Reconnect with your classmates! Food, drinks, music, and memories. Open to all Class of 2020 graduates and current students for networking.',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400',
      attendees: 120,
      registrationFee: 75000,
      category: 'Reunion',
      status: 'upcoming',
    },
    {
      id: '5',
      title: 'Entrepreneurship Workshop',
      date: 'February 20, 2026',
      time: '10:00 AM - 4:00 PM',
      location: 'Innovation Hub, UCU',
      description: 'Learn from successful alumni entrepreneurs. Topics: Business planning, funding, marketing, and scaling your startup.',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400',
      attendees: 150,
      registrationFee: 25000,
      category: 'Workshop',
      status: 'upcoming',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="p-4">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-600 mb-4">
            <ArrowLeft size={20} />
            <span className="text-sm">Back</span>
          </button>
          <div>
            <h2 className="text-lg">Upcoming Events</h2>
            <p className="text-sm text-gray-600 mt-1">{events.length} events available</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4 pb-20">
        {events.map((event) => (
          <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48 bg-gray-200">
              <ImageWithFallback
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3">
                <Badge className="bg-accent text-accent-foreground">
                  {event.category}
                </Badge>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg mb-2">{event.title}</h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{event.attendees} registered</span>
                </div>
              </div>

              <p className="text-sm text-gray-700 mb-4">{event.description}</p>

              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <p className="text-xs text-gray-500">Registration Fee</p>
                  <p className="text-base" style={{ color: '#0b2a4a' }}>
                    {event.registrationFee === 0 ? 'Free' : `UGX ${event.registrationFee.toLocaleString()}`}
                  </p>
                </div>
                <Button style={{ backgroundColor: '#c79b2d' }}>
                  Register Now
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
