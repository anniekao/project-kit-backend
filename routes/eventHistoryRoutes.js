const router = require('express').Router();

module.exports = db => {
  router.get('/:id/history', async (req, res) => {
    try {
      const eventHistory = await db.query(
        `
        SELECT network_event.id, name, location, date, start_time, end_time 
        FROM network_event
        JOIN user_event ON network_event_id = network_event.id
        WHERE user_id = $1 
      `,
        [req.params.id]
      );

      if (eventHistory) {
        res.status(200).json(eventHistory.rows);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (exception) {
      console.error(exception);
    }
  });

  return router;
};