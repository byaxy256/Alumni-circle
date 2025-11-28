import express from 'express';
import db from '../db.js';
const router = express.Router();

router.get('/prepare', async (req, res) => {
  try {
    const studentUid = String(req.query.studentUid || '');
    const originalAmount = Number(req.query.originalAmount || 0);
    if (!studentUid || !originalAmount) return res.status(400).json({ error: 'missing params' });
    // sum outstanding loans
    const [rows] = await db.execute('SELECT SUM(outstanding_balance) as total FROM loans WHERE student_uid = ? AND status IN ("approved","active")', [studentUid]);
    const total = (rows as any)[0].total || 0;
    const deduction = Math.min(total, originalAmount);
    res.json({ originalAmount, deduction, netAmount: originalAmount - deduction });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

router.post('/approve', async (req, res) => {
  try {
    const { studentUid, originalAmount, deduction, approver } = req.body;
    // create disbursement record
    const [r] = await db.execute('INSERT INTO disbursements (student_uid, original_amount, deduction_amount, net_amount, approved_by, approved_at) VALUES (?, ?, ?, ?, ?, NOW())', [studentUid, originalAmount, deduction, originalAmount - deduction, approver]);
    const disbId = (r as any).insertId;
    // reduce outstandingBalance across loans (simple logic: deduct from oldest loan)
    let remaining = deduction;
    const [loans] = await db.execute('SELECT id, outstanding_balance FROM loans WHERE student_uid = ? AND outstanding_balance > 0 ORDER BY created_at ASC', [studentUid]);
    for (const loan of loans as any[]) {
      if (remaining <= 0) break;
      const take = Math.min(Number(loan.outstanding_balance), remaining);
      await db.execute('UPDATE loans SET outstanding_balance = outstanding_balance - ? WHERE id = ?', [take, loan.id]);
      remaining -= take;
    }
    // footprint record (optional)
    await db.execute('INSERT INTO footprints (user_uid, action, target_type, target_id, meta) VALUES (?, ?, ?, ?, ?)', [approver, 'approve_disbursement', 'disbursement', String(disbId), JSON.stringify({ originalAmount, deduction })]);
    res.json({ ok: true, disbursementId: disbId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

export default router;
