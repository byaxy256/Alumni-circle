import { Card } from '../ui/card';
import type { User } from '../../App';
import { 
  Heart, 
  Calendar, 
  Users, 
  Newspaper, 
  Gift, 
  Award,
  MessageSquare,
  TrendingUp,
  ChevronRight,
  DollarSign
} from 'lucide-react';
import { Button } from '../ui/button';

interface AlumniDashboardProps {
  user: User;
  onNavigate: (screen: any) => void;
}

export function AlumniDashboard({ user, onNavigate }: AlumniDashboardProps) {
  const quickActions = [
    {
      id: 'donations',
      title: 'Make a Donation',
      subtitle: 'Support current students',
      icon: Heart,
      gradient: 'from-red-500 to-pink-600',
      action: () => onNavigate('donations')
    },
    {
      id: 'mentorship',
      title: 'Mentor Students',
      subtitle: 'Share your experience',
      icon: MessageSquare,
      gradient: 'from-purple-500 to-purple-700',
      action: () => onNavigate('mentorship')
    },
    {
      id: 'events',
      title: 'Upcoming Events',
      subtitle: 'Reunions & networking',
      icon: Calendar,
      gradient: 'from-blue-500 to-blue-700',
      action: () => onNavigate('events')
    },
    {
      id: 'connect',
      title: 'Alumni Network',
      subtitle: 'Connect with classmates',
      icon: Users,
      gradient: 'from-green-500 to-green-700',
      action: () => onNavigate('connect')
    },
    {
      id: 'news',
      title: 'UCU News',
      subtitle: 'Latest updates',
      icon: Newspaper,
      gradient: 'from-orange-500 to-orange-700',
      action: () => onNavigate('news')
    },
    {
      id: 'benefits',
      title: 'Alumni Benefits',
      subtitle: 'Exclusive perks',
      icon: Gift,
      gradient: 'from-indigo-500 to-indigo-700',
      action: () => onNavigate('benefits')
    },
  ];

  const donationStats = {
    totalDonated: 5000000,
    studentsHelped: 12,
    currentYear: 3500000,
  };

  const upcomingEvents = [
    {
      id: '1',
      title: 'Class of 2020 Reunion',
      date: 'Dec 15, 2025',
      location: 'UCU Main Campus',
      attendees: 45,
    },
    {
      id: '2',
      title: 'Alumni Networking Dinner',
      date: 'Jan 10, 2026',
      location: 'Serena Hotel',
      attendees: 120,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-20 md:pb-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary to-[#1a4d7a] text-white p-6 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <p className="opacity-90 text-sm mb-1">Welcome back,</p>
            <h1 className="text-2xl md:text-3xl">{user.name}</h1>
            <p className="text-sm opacity-80 mt-1">
              {user.course} • Class of {user.graduationYear}
            </p>
          </div>

          {/* Donation Impact Card */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-full bg-white/20">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h2 className="text-lg">Your Impact</h2>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs opacity-80">Total Donated</p>
                <p className="text-xl mt-1">
                  UGX {(donationStats.totalDonated / 1000000).toFixed(1)}M
                </p>
              </div>
              <div>
                <p className="text-xs opacity-80">Students Helped</p>
                <p className="text-xl mt-1">{donationStats.studentsHelped}</p>
              </div>
              <div>
                <p className="text-xs opacity-80">This Year</p>
                <p className="text-xl mt-1">
                  UGX {(donationStats.currentYear / 1000000).toFixed(1)}M
                </p>
              </div>
            </div>
            <Button
              onClick={() => onNavigate('donations')}
              className="w-full mt-4 bg-accent hover:bg-accent/90"
            >
              <Heart className="w-4 h-4 mr-2" />
              Donate Now
            </Button>
          </Card>
        </div>
      </div>

      <div className="px-6 md:px-8 -mt-6 pb-6">
        <div className="max-w-6xl mx-auto">
          {/* Quick Actions Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={action.action}
                  className="group"
                >
                  <Card className="p-5 hover:shadow-xl transition-all duration-300 border-0 bg-white overflow-hidden relative h-full">
                    <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
                    <div className="relative">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-sm text-gray-900 mb-1">{action.title}</h3>
                      <p className="text-xs text-gray-500">{action.subtitle}</p>
                      <ChevronRight className="w-4 h-4 text-gray-400 absolute top-4 right-0 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                </button>
              );
            })}
          </div>

          {/* Upcoming Events */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg text-gray-900">Upcoming Events</h2>
              <button 
                onClick={() => onNavigate('events')}
                className="text-sm text-primary hover:underline"
              >
                View All
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {upcomingEvents.map((event) => (
                <Card 
                  key={event.id}
                  className="p-5 hover:shadow-md transition-shadow cursor-pointer border-0 bg-white"
                  onClick={() => onNavigate('events')}
                >
                  <div className="flex gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-accent/80 flex flex-col items-center justify-center text-white flex-shrink-0">
                      <span className="text-sm">{event.date.split(' ')[1]}</span>
                      <span className="text-xs opacity-80">{event.date.split(' ')[0]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm text-gray-900 mb-1">{event.title}</h3>
                      <p className="text-xs text-gray-600 mb-2">{event.location}</p>
                      <div className="flex items-center gap-2">
                        <Users className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{event.attendees} attending</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Mentorship Stats */}
          <Card className="p-5 bg-gradient-to-br from-purple-50 to-purple-100 border-0">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg text-purple-900">Mentorship Program</h3>
                <p className="text-sm text-purple-700 mt-1">
                  Currently mentoring 3 students
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center">
                <p className="text-2xl text-purple-900">3</p>
                <p className="text-xs text-purple-700">Mentees</p>
              </div>
              <div className="text-center">
                <p className="text-2xl text-purple-900">24</p>
                <p className="text-xs text-purple-700">Sessions</p>
              </div>
              <div className="text-center">
                <p className="text-2xl text-purple-900">4.8</p>
                <p className="text-xs text-purple-700">Rating</p>
              </div>
            </div>
            <Button
              onClick={() => onNavigate('mentorship')}
              variant="outline"
              className="w-full border-purple-300 text-purple-700 hover:bg-purple-200"
            >
              Open Mentorship Hub
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
