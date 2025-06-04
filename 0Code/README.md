# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Fill in environment variables
# MONGODB_URI, JWT_SECRET, COOKIE_SECRET, etc.

# Start development server
npm run dev

# Build for production
npm run build