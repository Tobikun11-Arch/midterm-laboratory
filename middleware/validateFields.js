export function validateRequiredFields(req, res, next) {
  const { firstName, lastName, age, course } = req.body;

  if (!firstName || !lastName || !age || !course) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  next();
}