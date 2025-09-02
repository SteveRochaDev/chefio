// index.js
const express = require("express");
const app = express();
const PORT = 3000;

// dev: disable ETag and prevent caching so Vite/proxy always gets fresh data
app.disable('etag');
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

app.use(express.json());

// Larger sample dataset with extra fields for future filtering
const sampleRecipes = [
  { id: 1, title: "Tomato Pasta", cuisine: "Italian", difficulty: "Easy", time: 20, ingredients: ["tomato","pasta","olive oil","garlic"], category: 'Main', tags: ['vegetarian','quick'] },
  { id: 2, title: "Veggie Omelette", cuisine: "French", difficulty: "Easy", time: 10, ingredients: ["egg","pepper","onion","cheese"], category: 'Breakfast', tags: ['vegetarian','quick'] },
  { id: 3, title: "Chicken Stir Fry", cuisine: "Asian", difficulty: "Medium", time: 25, ingredients: ["chicken","soy sauce","broccoli","garlic"], category: 'Main', tags: ['quick'] },
  { id: 4, title: "Beef Tacos", cuisine: "Mexican", difficulty: "Medium", time: 30, ingredients: ["beef","tortilla","tomato","lettuce"], category: 'Main', tags: ['party'] },
  { id: 5, title: "Caesar Salad", cuisine: "Italian", difficulty: "Easy", time: 15, ingredients: ["lettuce","croutons","parmesan","anchovy"], category: 'Salad', tags: ['light'] },
  { id: 6, title: "Lentil Soup", cuisine: "Middle Eastern", difficulty: "Easy", time: 40, ingredients: ["lentils","carrot","celery","onion"], category: 'Soup', tags: ['vegan','gluten-free'] },
  { id: 7, title: "Pan-Seared Salmon", cuisine: "American", difficulty: "Medium", time: 20, ingredients: ["salmon","lemon","butter","salt"], category: 'Main', tags: ['seafood'] },
  { id: 8, title: "Mushroom Risotto", cuisine: "Italian", difficulty: "Hard", time: 50, ingredients: ["rice","mushroom","parmesan","white wine"], category: 'Main', tags: ['vegetarian'] },
  { id: 9, title: "Pancakes", cuisine: "American", difficulty: "Easy", time: 20, ingredients: ["flour","milk","egg","butter"], category: 'Breakfast', tags: ['sweet'] },
  { id: 10, title: "Shrimp Curry", cuisine: "Indian", difficulty: "Medium", time: 35, ingredients: ["shrimp","coconut milk","curry powder","onion"], category: 'Main', tags: ['seafood','spicy'] },
  { id: 11, title: "Quinoa Bowl", cuisine: "Global", difficulty: "Easy", time: 25, ingredients: ["quinoa","avocado","tomato","cucumber"], category: 'Bowl', tags: ['vegetarian','gluten-free'] },
  { id: 12, title: "Grilled Cheese", cuisine: "American", difficulty: "Easy", time: 10, ingredients: ["bread","cheese","butter"], category: 'Snack', tags: ['quick'] },
  { id: 13, title: "Stuffed Peppers", cuisine: "Mediterranean", difficulty: "Medium", time: 45, ingredients: ["pepper","rice","tomato","cheese"], category: 'Main', tags: ['baked'] },
  { id: 14, title: "Sushi Bowl", cuisine: "Japanese", difficulty: "Medium", time: 30, ingredients: ["rice","nori","salmon","cucumber"], category: 'Bowl', tags: ['seafood'] },
  { id: 15, title: "Chili Con Carne", cuisine: "Mexican", difficulty: "Medium", time: 60, ingredients: ["beef","beans","tomato","chili"], category: 'Stew', tags: ['hearty','spicy'] }
];

app.get("/api/recipes", (req, res) => {
  const q = (req.query.q || '').toLowerCase().trim();
  const category = (req.query.category || '').trim();
  const tags = req.query.tags ? req.query.tags.split(',').map(t => t.trim().toLowerCase()).filter(Boolean) : [];

  let filtered = sampleRecipes.filter(r => {
    // text query: title, ingredients, tags
    if (q) {
      const inTitle = r.title.toLowerCase().includes(q);
      const inIngredients = (r.ingredients || []).some(i => i.toLowerCase().includes(q));
      const inTags = (r.tags || []).some(t => t.toLowerCase().includes(q));
      if (!(inTitle || inIngredients || inTags)) return false;
    }

    // category filter
    if (category) {
      if (!r.category || r.category.toLowerCase() !== category.toLowerCase()) return false;
    }

    // tags filter: require all provided tags
    if (tags.length) {
      const recipeTags = (r.tags || []).map(t => t.toLowerCase());
      const hasAll = tags.every(t => recipeTags.includes(t));
      if (!hasAll) return false;
    }

    return true;
  });

  res.json(filtered);
});

// categories endpoint
app.get('/api/recipes/categories', (req, res) => {
  const cats = Array.from(new Set(sampleRecipes.map(r => r.category).filter(Boolean)));
  res.json(cats);
});

// tags endpoint
app.get('/api/recipes/tags', (req, res) => {
  const tagSet = new Set();
  sampleRecipes.forEach(r => (r.tags || []).forEach(t => tagSet.add(t)));
  res.json(Array.from(tagSet));
});

// Simple mock register - returns a fake token and user object
app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  const user = { id: Date.now(), name: name || 'New User', email };
  const token = `fake-jwt-${Date.now()}`;
  res.json({ user, token });
});

// Simple mock login - accepts any credentials and returns a fake token
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  const user = { id: 1, name: 'Demo User', email };
  const token = `fake-jwt-${Date.now()}`;
  res.json({ user, token });
});

app.get("/", (req, res) => {
  res.send("Hello Chefio!");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
