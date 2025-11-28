// src/components/alumni-office/ManageContent.tsx
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner';
import { API_BASE } from '../../api';

export default function ManageContent() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [targetAudience, setTargetAudience] = useState('all');
  const [loading, setLoading] = useState(false);

  const handleSubmitNews = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error('Please fill out both the title and content for the news article.');
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem('token') || '';
      const res = await fetch(`${API_BASE}/content/news`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title, content, target_audience: targetAudience }),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create article');
      
      toast.success('News article published successfully!');
      setTitle('');
      setContent('');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Content</CardTitle>
          <CardDescription>Publish news articles and events for students and alumni.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="e.g., Upcoming Graduation Ceremony" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea id="content" placeholder="Write your news article or event details here..." value={content} onChange={(e) => setContent(e.target.value)} rows={10} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="audience">Visible To</Label>
            <Select value={targetAudience} onValueChange={setTargetAudience}>
              <SelectTrigger id="audience"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users (Students & Alumni)</SelectItem>
                <SelectItem value="students">Students Only</SelectItem>
                <SelectItem value="alumni">Alumni Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-4">
            <Button onClick={handleSubmitNews} disabled={loading}>{loading ? 'Publishing...' : 'Publish News Article'}</Button>
            <Button variant="secondary" disabled={loading}>Publish Event (Coming Soon)</Button>
          </div>
        </CardContent>
      </Card>
      
      {/* You can add a list of existing articles/events here for editing/deleting */}
    </div>
  );
}