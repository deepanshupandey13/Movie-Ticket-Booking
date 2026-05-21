\# Full-Stack Movie Ticket Booking System (MERN Stack)

A secure, production-grade, full-stack movie ticket booking application featuring user authentication, real-time ticket sales management, dynamic interactive seats, secure online payments, and automatic integration with third-party streaming databases.

## 🚀 Key Architectural Features

* **Self-Healing TMDB Gateway:** Built a fault-tolerant network architecture using Node native `fetch` combined with automatic retry wrappers ($3\times$ backing cycles) to handle transient local router timeouts, connection drops, and `ECONNRESET` socket exceptions cleanly.
* **Authentication & User Spaces:** Handled securely via **Clerk Auth**, featuring protected application endpoints, custom admin management tools, and synchronized user roles.
* **Dynamic Data Engineering:** High-performance database operations using **Mongoose ODM** alongside **MongoDB Atlas** for secure storage of theater grids, pricing modules, and reservation history.
* **Secure Payment Processing:** Native backend integration with the **Stripe API** handling automated payment checkouts, dynamic receipt billing, and transactional safety hooks.
* **Asynchronous Background Pipelines:** Powered by **Inngest** for atomic background workflow queuing and event-driven automation notifications without jamming main thread processes.

---

## 🛠️ Tech Stack & Dependencies

| Layer | Technologies & Frameworks Used |
| :--- | :--- |
| **Frontend UI** | React.js, Tailwind CSS, Vite runtime compiler, Axios client, React Router DOM |
| **Backend Core** | Node.js ecosystem, Express.js framework, Native HTTP Fetch API |
| **Database** | MongoDB Atlas Cloud Cluster, Mongoose Object-Data Modeling |
| **Integrations** | Stripe Gateway, Clerk Authentication Engine, Inngest Background Queue, TMDB v3 API |

---

## 📂 System Project Structure

```text
movie_ticket_booking/
├── client/                 # React frontend application (Vite engine)
│   ├── src/
│   │   ├── components/     # Reusable UI widgets & booking cards
│   │   ├── controllers/    # Frontend state & dynamic UI handlers
│   │   └── pages/          # Layout views (Home, Movie, Checkout, Admin)
│   ├── vercel.json         # Deployment configuration rules for Frontend SPA
│   └── package.json
│
├── server/                 # Express REST API application backend
│   ├── controllers/        # Business logic & TMDB retry wrappers
│   ├── models/             # Schema definitions (Movie, Show, Ticket)
│   ├── routes/             # Exposed REST API routes
│   ├── vercel.json         # Serverless deployment configuration for Vercel
│   └── package.json
│
└── README.md               # Main project overview and setup documentation