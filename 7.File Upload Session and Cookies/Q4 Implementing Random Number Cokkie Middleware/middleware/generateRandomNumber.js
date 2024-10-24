export const generateRandomNumber = (req, res, next) => {
  const randomNumber = Math.floor(Math.random() * 10) + 1;
  res.cookie("randomNumber", randomNumber, {
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });
  res.cookie("attemptsLeft", 2, {
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });
  next();
};
