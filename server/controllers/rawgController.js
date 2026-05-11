const RAWG_BASE = 'https://api.rawg.io/api';

module.exports.getRawgGameById = async (req, res, next) => {
  try {
    const response = await fetch(
      `${RAWG_BASE}/games/${req.params.rawgId}?key=${process.env.API_KEY_RAWG}`
    );
    const data = await response.json();
    res.json({ data });
  } catch (error) {
    next(error);
  }
};