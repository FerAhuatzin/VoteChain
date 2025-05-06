const validarId = (req, res, next) => {
  const { id } = req.params;

  // Si es un número simple (por ejemplo, "1")
  if (/^\d+$/.test(id)) {
    return next();
  }

  // Si es un ObjectId válido de MongoDB
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    return next();
  }

  return res.status(400).json({ error: "ID inválido" });
};

module.exports = validarId;