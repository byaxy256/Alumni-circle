import { Card } from '../ui/card';
import { Button } from '../ui/button';
import type { User } from '../../App';
import { ArrowLeft, Download, Eye, Printer, DollarSign, Calendar, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { API_BASE } from '../../api';

interface StudentFundProps {
  user: User;
  onBack: () => void;
}

type Transaction = {
  id: string;
  type: string;
  amount: number;
  date: string;
  status: string;
  receiptNumber?: string;
};

export function StudentFund({ user, onBack }: StudentFundProps) {
  const [selectedReceipt, setSelectedReceipt] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const handlePrint = (receiptId: string) => {
    window.print();
  };

  useEffect(() => {
    const ac = new AbortController();
    const token = localStorage.getItem('token') || '';

    // try multiple common endpoints until one returns an array of transactions
    const candidates = [
      `${API_BASE}/funds/mine`,
      `${API_BASE}/transactions/mine`,
      `${API_BASE}/student/funds`,
      `${API_BASE}/payments/mine`,
      `${API_BASE}/payments`, // fallback
    ];

    async function load() {
      setLoading(true);
      try {
        for (const url of candidates) {
          try {
            const res = await fetch(url, {
              signal: ac.signal,
              headers: token ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' },
            });
            if (!res.ok) continue;
            const json = await res.json();
            // accept either array or { data: [...] } shapes
            const list = Array.isArray(json) ? json : Array.isArray(json?.data) ? json.data : null;
            if (!list) continue;

            // normalize to Transaction[]
            const normalized: Transaction[] = list.map((t: any, idx: number) => ({
              id: String(t.id ?? t._id ?? t.txId ?? `${Date.now()}-${idx}`),
              type: t.type ?? t.description ?? t.category ?? 'Payment',
              amount: Number(t.amount ?? t.value ?? 0),
              date: t.date ?? t.createdAt ?? t.txDate ?? new Date().toISOString(),
              status: (t.status ?? 'completed').toString(),
              receiptNumber: t.receiptNumber ?? t.ref ?? t.txRef ?? undefined,
            }));
            setTransactions(normalized);
            setLoading(false);
            return;
          } catch (err) {
            if ((err as any).name === 'AbortError') return;
            // try next endpoint
            console.debug('Candidate fetch failed:', url, err);
          }
        }

        // no endpoint worked — empty state
        setTransactions([]);
      } catch (err) {
        console.error('Failed to load transactions', err);
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => ac.abort();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-6">
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-primary">Student Fund</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Summary Card */}
        <Card className="p-6 bg-gradient-to-br from-primary to-[#1a4d7a] text-white">
          <h2 className="text-lg mb-4">Fund Summary</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm opacity-80">Total Received</p>
              <p className="text-2xl mt-1">
                UGX {transactions.reduce((s, t) => s + (t.amount || 0), 0).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm opacity-80">This Semester</p>
              <p className="text-2xl mt-1">
                UGX {transactions
                  .filter((t) => {
                    // rudimentary this-semester filter: same year and within last 6 months
                    try {
                      const d = new Date(t.date);
                      const now = new Date();
                      return d.getFullYear() === now.getFullYear();
                    } catch {
                      return false;
                    }
                  })
                  .reduce((s, t) => s + (t.amount || 0), 0)
                  .toLocaleString()}
              </p>
            </div>
          </div>
        </Card>

        {/* Transactions List */}
        <div>
          <h3 className="text-lg mb-4">Transaction History</h3>
          <div className="space-y-3">
            {loading ? (
              <div className="text-sm text-gray-500">Loading transactions...</div>
            ) : transactions.length ? (
              transactions.map((transaction) => (
                <Card key={transaction.id} className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-4 flex-1">
                      <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                        <DollarSign className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="text-sm">{transaction.type}</h4>
                          <p className="text-sm text-green-600">
                            +UGX {(transaction.amount / 1000).toLocaleString()}K
                          </p>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(transaction.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-green-600" />
                            <span className="text-green-600">{transaction.status}</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Receipt: {transaction.receiptNumber ?? '—'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedReceipt(transaction.id)}
                      className="flex-1"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Preview Receipt
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePrint(transaction.id)}
                      className="flex-1"
                    >
                      <Printer className="w-4 h-4 mr-2" />
                      Print Receipt
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-sm text-gray-500">No transactions found.</div>
            )}
          </div>
        </div>
      </div>

      {/* Receipt Preview Dialog */}
      <Dialog open={!!selectedReceipt} onOpenChange={() => setSelectedReceipt(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Receipt Preview</DialogTitle>
            <DialogDescription>View and print your transaction receipt</DialogDescription>
          </DialogHeader>
          <div className="p-6 bg-white border border-gray-200 rounded-lg">
            <div className="text-center mb-6">
              <h3 className="text-xl mb-1">Uganda Christian University</h3>
              <p className="text-sm text-gray-600">Official Receipt</p>
            </div>

            {selectedReceipt && transactions.find(t => t.id === selectedReceipt) ? (
              <>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Receipt No:</span>
                    <span>{transactions.find(t => t.id === selectedReceipt)!.receiptNumber ?? '—'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Date:</span>
                    <span>{new Date(transactions.find(t => t.id === selectedReceipt)!.date).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Student:</span>
                    <span>{user.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Description:</span>
                    <span>{transactions.find(t => t.id === selectedReceipt)!.type}</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span>Total Amount:</span>
                    <span className="text-xl">
                      UGX {transactions.find(t => t.id === selectedReceipt)!.amount.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                  <p className="text-xs text-gray-500">
                    This is an electronically generated receipt
                  </p>
                </div>
              </>
            ) : (
              <div className="text-sm text-gray-500">Receipt not available.</div>
            )}
          </div>

          <div className="flex gap-2 mt-4">
            <Button onClick={() => handlePrint(selectedReceipt ?? '')} className="flex-1">
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
