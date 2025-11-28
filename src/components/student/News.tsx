// src/components/student/News.tsx
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { API_BASE } from '../../api';
import { Button } from '../ui/button';

type Article = {
  id: number;
  title: string;
  content: string;
  created_at: string;
};

export function News({ onBack }: { onBack: () => void }) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${API_BASE}/content/news`);
        if (!res.ok) throw new Error('Failed to fetch news');
        const data: Article[] = await res.json();
        setArticles(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="p-4 lg:p-6 space-y-4">
      <div className="flex items-center gap-4">
        <Button onClick={onBack} variant="ghost" size="icon"><ArrowLeft /></Button>
        <h1 className="text-xl font-semibold">News & Updates</h1>
      </div>

      {loading ? (
        <div className="text-center py-10"><Loader2 className="mx-auto h-8 w-8 animate-spin" /></div>
      ) : articles.length > 0 ? (
        articles.map(article => (
          <Card key={article.id}>
            <CardHeader>
              <CardTitle>{article.title}</CardTitle>
              <CardDescription>Published on {new Date(article.created_at).toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{article.content}</p>
            </CardContent>
          </Card>
        ))
      ) : (
        <p>No news articles found.</p>
      )}
    </div>
  );
}


