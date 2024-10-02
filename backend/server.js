import app from "./src/app.js";

const PORT = 8080;

app.use((req, res) => {
  res.redirect('/api');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}/api`)
})