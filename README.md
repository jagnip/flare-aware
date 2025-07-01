# Meal Planner 🥗 *(Work in Progress)*

A meal planning app tailored for **families managing Crohn's disease or ulcerative colitis**.  
It helps you adjust meals based on condition severity while still allowing others to enjoy regular recipes — making shared meals simpler and safer.

This project is a **work in progress** and being built with **Next.js 15**, **React 19**, **TypeScript**, **Prisma**, and **PostgreSQL**.

---

## Features (Planned & In Progress)

- 🧠 **Smart ingredient & instruction parsing**  
  Uses natural language processing to extract amounts, units, ingredients, and actions from plain text.
  
- 📏 **Scale recipes** up or down depending on servings

- 🌍 **Switch between metric and US measurement systems**

- 🍽 **Adjust meals for IBD**  
  Modify recipes based on **condition severity**, suggest **replacements** for sensitive ingredients (e.g. low-FODMAP swaps)

- 🧾 **Get nutritional values** of recipes  
  Powered by a custom food and nutrition database, not a third-party API

- 🛒 **Generate smart shopping lists**  
  Based on your selected recipes and scaled servings

- 🕒 **Plan meals by available time**  
  Filter or generate meals based on how much hands-on cooking time you have

---

## Tech Stack

- **Next.js 15**
- **React 19**
- **TypeScript**
- **Prisma + PostgreSQL**
- **React Query**
- **Compromise (for NLP)**
- **Zod** for schema validation
- **Pluralize** to normalize ingredient names
