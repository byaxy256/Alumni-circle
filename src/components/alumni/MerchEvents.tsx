import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Plus, ShoppingBag, Calendar, Users, DollarSign, Package, Ticket, Download } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

const merchandise = [
  { id: 1, name: 'UCU Alumni T-Shirt', price: 35000, stock: 45, sold: 123, image: 'tshirt' },
  { id: 2, name: 'UCU Cap', price: 25000, stock: 78, sold: 89, image: 'cap' },
  { id: 3, name: 'UCU Hoodie', price: 75000, stock: 12, sold: 34, image: 'hoodie' },
  { id: 4, name: 'Alumni Mug', price: 15000, stock: 156, sold: 234, image: 'mug' },
];

const events = [
  {
    id: 1,
    name: 'Alumni Homecoming 2024',
    date: '2024-12-15',
    location: 'UCU Main Campus, Mukono',
    attendees: 234,
    ticketPrice: 50000,
    revenue: 11700000,
    status: 'upcoming',
  },
  {
    id: 2,
    name: 'Fundraising Gala Dinner',
    date: '2024-11-20',
    location: 'Sheraton Hotel, Kampala',
    attendees: 156,
    ticketPrice: 150000,
    revenue: 23400000,
    status: 'upcoming',
  },
  {
    id: 3,
    name: 'Career Mentorship Workshop',
    date: '2024-10-15',
    location: 'UCU Business School',
    attendees: 89,
    ticketPrice: 0,
    revenue: 0,
    status: 'completed',
  },
];

const orders = [
  { id: 1, customer: 'Sarah Nakato', items: 'UCU T-Shirt x2, Cap x1', total: 95000, date: '2024-11-03', status: 'completed' },
  { id: 2, customer: 'John Okello', items: 'Hoodie x1', total: 75000, date: '2024-11-02', status: 'pending' },
  { id: 3, customer: 'Mary Achieng', items: 'Mug x3, T-Shirt x1', total: 80000, date: '2024-11-01', status: 'shipped' },
  { id: 4, customer: 'David Musoke', items: 'Cap x2', total: 50000, date: '2024-10-30', status: 'completed' },
];

export default function MerchEvents() {
  const [showMerchDialog, setShowMerchDialog] = useState(false);
  const [showEventDialog, setShowEventDialog] = useState(false);

  const handleAddMerch = () => {
    toast.success('Merchandise item added');
    setShowMerchDialog(false);
  };

  const handleAddEvent = () => {
    toast.success('Event created successfully');
    setShowEventDialog(false);
  };

  const formatCurrency = (amount: number) => {
    return `UGX ${amount.toLocaleString()}`;
  };

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div>
        <h2>Merchandise & Events</h2>
        <p className="text-muted-foreground">Manage alumni merchandise sales and event registrations</p>
      </div>

      <Tabs defaultValue="merch" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="merch">Merchandise</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="merch" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={showMerchDialog} onOpenChange={setShowMerchDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Merchandise</DialogTitle>
                  <DialogDescription>Add a new product to the store</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="productName">Product Name</Label>
                    <Input id="productName" placeholder="e.g., UCU Alumni T-Shirt" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price (UGX)</Label>
                      <Input id="price" type="number" placeholder="0" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stock">Initial Stock</Label>
                      <Input id="stock" type="number" placeholder="0" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Product description" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image">Product Image URL</Label>
                    <Input id="image" placeholder="https://..." />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddMerch}>Add Product</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {merchandise.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center mb-4">
                    <ShoppingBag className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-base">{item.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Price:</span>
                    <span className="text-accent">{formatCurrency(item.price)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Stock:</span>
                    <Badge variant={item.stock < 20 ? 'destructive' : 'secondary'}>
                      {item.stock} units
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Sold:</span>
                    <span>{item.sold}</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Package className="w-4 h-4 mr-2" />
                    Manage Stock
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Event
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Event</DialogTitle>
                  <DialogDescription>Set up a new alumni event</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="eventName">Event Name</Label>
                    <Input id="eventName" placeholder="e.g., Alumni Homecoming 2024" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="eventDate">Date & Time</Label>
                    <Input id="eventDate" type="datetime-local" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="Event venue" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ticketPrice">Ticket Price (UGX)</Label>
                    <Input id="ticketPrice" type="number" placeholder="0 for free event" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input id="capacity" type="number" placeholder="Maximum attendees" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="eventDescription">Description</Label>
                    <Textarea id="eventDescription" placeholder="Event details and agenda" />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddEvent}>Create Event</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            {events.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle>{event.name}</CardTitle>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(event.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {event.attendees} registered
                        </div>
                      </div>
                    </div>
                    <Badge variant={event.status === 'upcoming' ? 'default' : 'secondary'}>
                      {event.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p>{event.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Ticket Price</p>
                      <p>{event.ticketPrice > 0 ? formatCurrency(event.ticketPrice) : 'Free'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Revenue</p>
                      <p className="text-green-600">{formatCurrency(event.revenue)}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      <Ticket className="w-4 h-4 mr-2" />
                      View Registrations
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export Attendee List
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>#{order.id.toString().padStart(4, '0')}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell className="max-w-xs truncate">{order.items}</TableCell>
                      <TableCell>{formatCurrency(order.total)}</TableCell>
                      <TableCell className="text-muted-foreground">{order.date}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            order.status === 'completed' ? 'default' :
                            order.status === 'shipped' ? 'secondary' : 'outline'
                          }
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Receipt
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
