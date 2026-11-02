# HOMORA – Luxury Real Estate Buying Platform
> **A modern, responsive full-stack real estate marketplace engineered for discerning property buyers and verified owners.**  
> *Developed for College Minor Project — Full Stack Web Development (MERN Stack Architecture).*

---

## 1. Executive Summary & Design Ethos

**HOMORA** is an editorial-style luxury real estate buying platform inspired by world-class property portals. Moving away from generic student CRUD applications, HOMORA offers a refined visual identity:
- **Primary Background**: Warm Off-White (`#FCFAF7`)
- **Primary Text**: Deep Charcoal (`#1F2421`)
- **Accent Color**: Elegant Forest Green (`#1B4332`)
- **Secondary Colors**: Muted Beige Sand (`#F4EFEA`) and Soft Grey
- **Typography**: Editorial Serif headers (*Playfair Display*) paired with clean geometric sans-serif (*Plus Jakarta Sans*)
- **UX/UI Highlights**: Fully responsive mobile menu drawer, interactive image galleries, instant search with INR budget filters, reactive wishlist bookmarks, and direct seller communication.

---

## 2. Technology Stack

### Frontend
- **Framework**: React.js 18 with Vite 6 (lightning-fast HMR and optimized production bundling)
- **Styling**: Tailwind CSS with custom editorial color palette and soft shadows
- **Routing**: React Router DOM v6 (declarative client-side routing with protected route guards)
- **Icons**: Lucide React
- **HTTP Client**: Axios with automated Bearer JWT request/response interceptors

### Backend
- **Runtime**: Node.js
- **Web Framework**: Express.js (modular RESTful API routing and centralized error handling)
- **Database & ODM**: MongoDB with Mongoose schemas
- **Authentication**: Stateless JSON Web Tokens (JWT) with Bearer token authentication
- **Password Security**: Bcrypt with salted password hashing
- **Cross-Origin**: CORS enabled for client-server decoupling

---

## 3. Project Directory Structure

```
homora/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection & zero-setup in-memory fallback
│   ├── controllers/
│   │   ├── authController.js     # User registration, login, and get profile (/me)
│   │   ├── propertyController.js # CRUD, query filtering, and user listings
│   │   ├── wishlistController.js # Save/unsave properties per user
│   │   └── contactController.js  # Buyer inquiry form submission
│   ├── data/
│   │   └── seedProperties.js     # 9 realistic Indian luxury demo properties
│   ├── middleware/
│   │   ├── auth.js               # JWT verification & req.user attachment
│   │   └── errorHandler.js       # Centralized error handler
│   ├── models/
│   │   ├── User.js               # User schema with bcrypt pre-save hook
│   │   ├── Property.js           # Property listing schema
│   │   ├── Wishlist.js           # User wishlist schema
│   │   └── Contact.js            # Customer inquiry schema
│   ├── routes/
│   │   ├── authRoutes.js         # /api/auth routes
│   │   ├── propertyRoutes.js     # /api/properties routes
│   │   ├── wishlistRoutes.js     # /api/wishlist routes
│   │   └── contactRoutes.js      # /api/contact routes
│   ├── .env.example
│   ├── package.json
│   ├── seed.js                   # Standalone database seeder script
│   ├── server.js                 # Express server bootstrap
│   └── test-api.js               # Automated end-to-end API test suite
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FilterSidebar.jsx # Location, bedrooms, price slider filters
│   │   │   ├── Footer.jsx        # Luxury footer with links & newsletter
│   │   │   ├── LoadingSpinner.jsx# Elegant branded loader
│   │   │   ├── Navbar.jsx        # Sticky navigation with mobile drawer & badge
│   │   │   ├── PropertyCard.jsx  # Reusable property card with INR formatting
│   │   │   ├── ProtectedRoute.jsx# Auth route guard
│   │   │   └── SearchBar.jsx     # Hero search bar with multi-criteria filters
│   │   ├── context/
│   │   │   ├── AuthContext.jsx   # Global user auth state
│   │   │   ├── ToastContext.jsx  # Non-blocking popup alerts
│   │   │   └── WishlistContext.jsx# Reactive saved properties collection
│   │   ├── pages/
│   │   │   ├── About.jsx         # Mission, design philosophy & academic notes
│   │   │   ├── AddProperty.jsx   # Property listing form with sample photo presets
│   │   │   ├── Contact.jsx       # Functional contact form with FAQs
│   │   │   ├── Dashboard.jsx     # User listings, saved collection, and profile
│   │   │   ├── EditProperty.jsx  # Edit existing property form
│   │   │   ├── ExploreProperties.jsx# Filterable, sortable property grid
│   │   │   ├── Home.jsx          # Luxury hero, featured, locations & CTA
│   │   │   ├── Login.jsx         # Sign in with evaluator quick-fill buttons
│   │   │   ├── PropertyDetails.jsx# Photo gallery, specs, amenities & seller contact
│   │   │   └── Register.jsx      # Member registration
│   │   ├── services/
│   │   │   └── api.js            # Axios client with JWT interceptor
│   │   ├── utils/
│   │   │   └── formatters.js     # INR (₹, Lakhs, Crores) currency formatters
│   │   ├── App.jsx               # Application routes
│   │   ├── index.css             # Tailwind layers and smooth scrollbar
│   │   └── main.jsx              # React DOM entry point
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── README.md
```

---

## 4. Quick Start Guide (Run Locally)

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- Optional: MongoDB Community Server or MongoDB Atlas URI (If MongoDB is not installed locally, the backend automatically runs in **Resilient In-Memory Mode** pre-seeded with 9 Indian luxury properties so you can run and evaluate the application immediately with zero configuration!)

### Step 1: Start the Backend Server
Open your terminal / PowerShell:
```powershell
# Navigate to the backend directory
cd "C:\Users\NIKHIL\.gemini\antigravity\scratch\homora\backend"

# Install backend dependencies (if not already installed)
npm install

# Start the server
npm start
```
*The backend API will start on `http://localhost:5000`.*

### Step 2: Start the Frontend Application
Open a second terminal / PowerShell:
```powershell
# Navigate to the frontend directory
cd "C:\Users\NIKHIL\.gemini\antigravity\scratch\homora\frontend"

# Install frontend dependencies (if not already installed)
npm install

# Launch Vite development server
npm run dev
```
*The React application will be available at `http://localhost:5173`.*

---

## 5. Demo Evaluator Credentials

For quick evaluation during minor project demos, two pre-configured accounts are provided with one-click fill buttons on the Login page:

| Role | Email | Password | Features |
| :--- | :--- | :--- | :--- |
| **Verified Seller** | `aarav@homora.com` | `Password123` | Has listed luxury properties, can edit, delete, and add new ones |
| **Demo Buyer** | `demo@homora.com` | `Password123` | Can explore properties, save to wishlist, contact sellers |

*(You can also register a brand new account on `/register` at any time!)*

---

## 6. Curated Indian Demo Properties (Seeded)

The database includes realistic properties with genuine prices in Indian Rupees:
1. **The Magnolia Sky Residences** — ₹1.85 Cr (*Vipin Khand, Gomti Nagar, Lucknow*)
2. **Verdant Greens Sovereign Villa** — ₹4.75 Cr (*Sector 128, Wish Town, Noida*)
3. **The Camellias Signature Penthouse** — ₹8.20 Cr (*Golf Course Road, DLF Phase 5, Gurgaon*)
4. **Heritage Colonial Bungalow** — ₹2.45 Cr (*Civil Lines, Kanpur*)
5. **The Diplomat Enclave Mansion** — ₹9.50 Cr (*Vasant Vihar, South West Delhi*)
6. **Zenith Podium Heights** — ₹92 Lakhs (*Sector 1, Greater Noida West*)
7. **Aura Botanica Garden Loft** — ₹1.35 Cr (*Sector 24, Cyber City, Gurgaon*)
8. **Oudh Regal Manor** — ₹2.15 Cr (*Sushant Golf City, Amar Shaheed Path, Lucknow*)
9. **Skyline Vista Duplex** — ₹1.65 Cr (*Sector 137, Expressway, Noida*)

---

## 7. REST API Endpoints Specification

### Authentication (`/api/auth`)
- `POST /api/auth/register` — Register a new user (Full name, email, phone, password)
- `POST /api/auth/login` — Authenticate user and receive JWT token
- `GET /api/auth/me` — Retrieve currently logged-in user profile (`Bearer <token>`)

### Properties (`/api/properties`)
- `GET /api/properties` — Get properties with filtering (`search`, `location`, `propertyType`, `bedrooms`, `minPrice`, `maxPrice`, `sort`)
- `GET /api/properties/:id` — Get full property details by ID (includes populated seller info)
- `GET /api/properties/user/my-listings` — Get properties listed by the logged-in user (Auth required)
- `POST /api/properties` — Create a new property listing (Auth required)
- `PUT /api/properties/:id` — Update property (Auth & Owner check required)
- `DELETE /api/properties/:id` — Delete property (Auth & Owner check required)

### Wishlist (`/api/wishlist`)
- `GET /api/wishlist` — Get user's saved properties (Auth required)
- `POST /api/wishlist/:propertyId` — Add property to user's saved collection (Auth required)
- `DELETE /api/wishlist/:propertyId` — Remove property from saved collection (Auth required)

### Contact & Inquiries (`/api/contact`)
- `POST /api/contact` — Submit general contact message or property viewing inquiry

---

## 8. Automated API Test Suite

The backend includes a comprehensive automated test script (`backend/test-api.js`) that boots the server and verifies all 9 API operations:
```powershell
cd "C:\Users\NIKHIL\.gemini\antigravity\scratch\homora\backend"
node test-api.js
```

---

## 9. Academic Minor Project Highlights (Viva Preparation)

1. **Architecture Pattern**: Decoupled Client-Server architecture communicating via JSON REST APIs.
2. **Security**: Passwords hashed with standard **Bcrypt** algorithm (10 salt rounds); protected routes guarded with Bearer **JWT** tokens.
3. **Optimistic UI Updates**: Wishlist addition/removal updates client state instantly for smooth user experience while synchronizing with the backend.
4. **Resilient Data Architecture**: Features official Mongoose models for MongoDB production deployment, combined with an embedded in-memory fallback that allows offline demonstrations without server crashes.
5. **Modular Design**: Reusable components (`PropertyCard`, `SearchBar`, `FilterSidebar`, `Navbar`, `Footer`, `LoadingSpinner`) maintaining clean separation of concerns.

---

*HOMORA — Crafted with care for the College Minor Project.*
