🏠 Room Finder Website
📌 Project Overview

Room Finder is a web application that helps users search for rental rooms and allows room owners to add, update, and manage room listings.
The application uses Supabase for authentication, database management, and image storage, with a clean and responsive user interface built using React.

This project is developed as part of a technical assessment.

🎯 Objective

Enable users to find rental rooms using filters

Allow room owners to add and manage room listings

Implement secure authentication and image storage using Supabase

👥 User Roles
🔍 Room Finder (User)

View all available rooms

Search rooms using filters:

Location (highest priority)

Price range

Property type (1 BHK, 2 BHK, 1/2/3 Bed)

Tenant preference (Bachelor, Family, Girls, Working)

View detailed room information

🏘 Room Owner

Add new room listings

Upload multiple room images

Edit or delete room listings

View all rooms added by them

🧩 Features
🔐 Authentication

Email-based login using OTP (One-Time Password)

Secure session handling with Supabase

Profile section displaying logged-in user email

Logout functionality

🏠 Room Management

Add room with details:

Location

Rent price

Property type

Tenant preference

Contact number

Upload multiple images (device upload with drag & drop)

Edit and delete existing rooms

Owner-specific room listing view

🔍 Search & Filters

Location-based search (highest priority)

Filter by:

Price range

Property type

Tenant preference

🖼 Image Handling

Upload images from device

Drag & drop support

Image preview before submission

Automatic image slideshow on room cards

Slideshow pauses on hover

🎨 UI / UX

Responsive design (Mobile & Desktop)

Clean and professional UI

Role-based navigation (logged-in vs logged-out users)

🛠 Tech Stack
Frontend

React (Vite)

Tailwind CSS

React Router DOM

Backend / Services

Supabase Authentication (Email / OTP)

Supabase Database (PostgreSQL)

Supabase Storage (Room Images)

No custom backend server is used. Supabase handles authentication, database, and storage.

▶️ How to Run Locally

Clone the repository:

git clone https://github.com/Pravin400/Pravin-s_Room_Finder


Navigate to the project directory:

cd room-finder


Install dependencies:

npm install


Create a .env file and add:

VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key


Start the development server:

npm run dev


Open in browser:

http://localhost:5173

🌐 Live Demo

https://pravin-s-room-finder.vercel.app/

🧪 Test Credentials

Login is OTP-based

Use any valid email address to receive OTP

📌 Notes

Image uploads are limited to device files for reliability and security.

Supabase Row Level Security (RLS) is enabled to protect user data.

Backend services are handled entirely by Supabase as per assignment guidelines.