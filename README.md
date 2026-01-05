# 🏠 Room Finder Website

A modern, full-stack web application designed to bridge the gap between room seekers and owners. This platform offers a seamless experience for searching rental properties and managing listings with real-time updates.

---

## 📌 Project Overview

**Room Finder** is a responsive web application that allows users to browse rental listings with advanced filtering and enables owners to list their properties effortlessly. Built with a focus on speed and security, it leverages **Supabase** for backend services including authentication, database management, and cloud storage.

> This project was developed as a technical assessment focusing on CRUD operations, secure authentication, and optimized UI/UX.

---

## 🎯 Key Objectives

* **For Seekers:** Find the perfect living space using high-priority location filters and preferences.
* **For Owners:** A streamlined dashboard to add, edit, and delete room listings.
* **For Security:** Implement robust OTP-based authentication and secure data handling via Supabase RLS.

---

## 👥 User Roles

### 🔍 Room Finder (User)
* **Browse:** View a comprehensive list of available rooms.
* **Advanced Search:** Filter results by:
    * **Location** (Highest priority search).
    * **Price Range** (Find rooms within budget).
    * **Property Type** (1 BHK, 2 BHK, 1/2/3 Bed).
    * **Tenant Preference** (Bachelor, Family, Girls, Working).
* **Details:** Access deep-dive information for every listing.

### 🏘 Room Owner
* **Listing Management:** Create new listings with detailed descriptions.
* **Media Support:** Upload and manage multiple room images via drag-and-drop.
* **Full Control:** Edit or remove existing listings through a personal dashboard.

---

## 🧩 Features

### 🔐 Authentication
* **OTP Login:** Secure, passwordless email login using Supabase Auth.
* **Session Management:** Persistent login states and secure logout.
* **Profile Tracking:** Dedicated profile section showing active user credentials.

### 🏠 Room Management
* **Detailed Forms:** Fields for Location, Rent, Property Type, Tenant Preference, and Contact info.
* **Image Handling:** Integrated drag-and-drop uploader with instant previews.
* **Owner Views:** Filtered view specifically for the owner's managed properties.

### 🔍 Search & Filters
* Real-time filtering logic.
* Priority-based location matching.

### 🎨 UI / UX Excellence
* **Responsive Design:** Fully optimized for Mobile, Tablet, and Desktop.
* **Interactive Cards:** Automatic image slideshows for listings that pause on hover.
* **Clean Interface:** Minimalist and professional aesthetic built with Tailwind CSS.

---

## 🛠 Tech Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | React (Vite) |
| **Styling** | Tailwind CSS |
| **Routing** | React Router DOM |
| **Database** | Supabase (PostgreSQL) |
| **Auth** | Supabase Auth (Email OTP) |
| **Storage** | Supabase Storage (Buckets) |

---

## ▶️ How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Pravin400/Pravin-s_Room_Finder](https://github.com/Pravin400/Pravin-s_Room_Finder)
    cd room-finder
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Setup:**
    Create a `.env` file in the root directory and add your Supabase credentials:
    ```env
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Launch the app:**
    ```bash
    npm run dev
    ```
    View the app at `http://localhost:5173`.

---

## 🌐 Live Demo

Check out the live application here: [**Pravin's Room Finder**](https://pravin-s-room-finder.vercel.app/)

---

## 🧪 Test Credentials

* **Login Method:** Email OTP.
* **Instructions:** Enter any valid email address to receive a 6-digit verification code. No registration is required.

---

## 📌 Implementation Notes
* **Security:** Supabase Row Level Security (RLS) is enabled to ensure owners can only modify their own listings.
* **Serverless:** The project follows a serverless architecture; no custom backend server is required.