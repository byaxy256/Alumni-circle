import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ArrowLeft, AlertCircle, CheckCircle2, Info, AlertTriangle, FileText, DollarSign } from 'lucide-react';
import type { User } from '../../App';
import { toast } from 'sonner';

interface NotificationsProps {
  user: User;
  onBack: () => void;
}

export function Notifications({ user, onBack }: NotificationsProps) {
  const notifications = [
    {
      id: 1,
      type: 'success',
      category: 'loan',
      title: 'Loan Disbursement Approved',
      message: 'Your loan application #LOAN-2024-001 has been approved. UGX 5,000,000 will be disbursed within 3 business days.',
      date: '2025-10-28T10:30:00',
      read: false,
      actionLabel: 'View Loan',
    },
    {
      id: 2,
      type: 'info',
      category: 'payment',
      title: 'Upcoming Chop Deduction Notice',
      message: 'A chop deduction of UGX 400,000 is scheduled for November 15, 2025. Ensure you have sufficient balance in your university account.',
      date: '2025-10-25T14:15:00',
      read: false,
      actionLabel: 'View Details',
    },
    {
      id: 3,
      type: 'warning',
      category: 'document',
      title: 'Receipt Upload Required',
      message: 'Please upload your tuition receipt for Semester 2, 2024/2025 to continue receiving support.',
      date: '2025-10-20T09:00:00',
      read: true,
      actionLabel: 'Upload Now',
    },
    {
      id: 4,
      type: 'success',
      category: 'payment',
      title: 'Payment Received',
      message: 'We have received your payment of UGX 400,000. Your outstanding balance is now UGX 3,200,000.',
      date: '2025-10-15T16:45:00',
      read: true,
    },
    {
      id: 5,
      type: 'info',
      category: 'mentorship',
      title: 'Mentor Request Accepted',
      message: 'Dr. Sarah Nakabugo has accepted your mentorship request. You can now schedule your first session.',
      date: '2025-10-10T11:20:00',
      read: true,
      actionLabel: 'Schedule Session',
    },
    {
      id: 6,
      type: 'info',
      category: 'loan',
      title: 'Application Under Review',
      message: 'Your loan application is being reviewed by the Alumni Office. You will be notified within 5 business days.',
      date: '2025-10-05T13:00:00',
      read: true,
    },
    {
      id: 7,
      type: 'success',
      category: 'document',
      title: 'Document Verified',
      message: 'Your student ID card has been verified successfully.',
      date: '2025-10-01T10:10:00',
      read: true,
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={20} className="text-green-600" />;
      case 'warning':
        return <AlertTriangle size={20} className="text-yellow-600" />;
      case 'info':
        return <Info size={20} className="text-blue-600" />;
      case 'error':
        return <AlertCircle size={20} className="text-red-600" />;
      default:
        return <Info size={20} className="text-gray-600" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-100';
      case 'warning':
        return 'bg-yellow-100';
      case 'info':
        return 'bg-blue-100';
      case 'error':
        return 'bg-red-100';
      default:
        return 'bg-gray-100';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'loan':
        return <DollarSign size={14} />;
      case 'payment':
        return <DollarSign size={14} />;
      case 'document':
        return <FileText size={14} />;
      default:
        return null;
    }
  };

  const handleMarkAllRead = () => {
    toast.success('All notifications marked as read');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="p-4">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-600 mb-4">
            <ArrowLeft size={20} />
            <span className="text-sm">Back</span>
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg">Notifications</h2>
              <p className="text-xs text-gray-500 mt-1">
                {notifications.filter((n) => !n.read).length} unread
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={handleMarkAllRead}>
              Mark all read
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {notifications.map((notification) => (
          <Card key={notification.id} className={!notification.read ? 'border-l-4' : ''} style={!notification.read ? { borderLeftColor: '#0b2a4a' } : {}}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full ${getBgColor(notification.type)} flex items-center justify-center flex-shrink-0`}>
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className={`text-sm ${!notification.read ? 'font-medium' : ''}`}>
                      {notification.title}
                    </p>
                    {!notification.read && (
                      <div className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0 mt-1"></div>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{notification.message}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">
                      <span className="flex items-center gap-1">
                        {getCategoryIcon(notification.category)}
                        {notification.category}
                      </span>
                    </Badge>
                    <span className="text-xs text-gray-500">{formatDate(notification.date)}</span>
                  </div>
                  {notification.actionLabel && (
                    <Button
                      variant="link"
                      size="sm"
                      className="p-0 h-auto mt-2"
                      style={{ color: '#0b2a4a' }}
                      onClick={() => toast.info('Opening...')}
                    >
                      {notification.actionLabel} →
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {notifications.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 mx-auto flex items-center justify-center mb-4">
                <CheckCircle2 size={32} className="text-gray-400" />
              </div>
              <p className="text-sm text-gray-600">No notifications</p>
              <p className="text-xs text-gray-500 mt-1">You're all caught up!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
