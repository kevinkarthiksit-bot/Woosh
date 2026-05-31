# API Assumptions (Future Backend)

> These endpoints are **not implemented** in v1. They document expected integration points for a future Node.js + MongoDB backend.

## Stack Assumptions

- **Runtime:** Node.js
- **Database:** MongoDB
- **Integration:** Existing mobile app database to be connected in a later phase
- **Auth:** Phone OTP and/or email magic link (TBD)

## Expected API Domains

### Users
- `POST /api/auth/register` — phone or email signup
- `POST /api/auth/login` — initiate OTP or email verification
- `POST /api/auth/verify` — complete verification
- `GET /api/users/me` — current user profile

### Bookings
- `GET /api/services` — list available services
- `POST /api/bookings` — create booking
- `GET /api/bookings` — user booking history
- `PATCH /api/bookings/:id` — reschedule or cancel

### Services & Pricing
- `GET /api/services/:slug` — service detail with live pricing
- `GET /api/plans` — monthly and daily plan options

### Testimonials & Media
- `GET /api/testimonials` — customer video testimonials
- `GET /api/media/transformations` — service transformation videos
- `GET /api/media/before-after` — before/after image pairs

### Content
- `GET /api/blogs` — blog posts list
- `GET /api/blogs/:slug` — blog detail

### CRM (Future)
- Admin user management
- Booking operations dashboard
- Employee assignment and scheduling
- Inventory and referral program management

## Data Models (Draft)

### User
```json
{
  "_id": "ObjectId",
  "phone": "string",
  "email": "string",
  "name": "string",
  "createdAt": "ISO8601"
}
```

### Booking
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "serviceSlug": "string",
  "scheduledAt": "ISO8601",
  "status": "pending | confirmed | completed | cancelled",
  "address": "string"
}
```

### Service
```json
{
  "slug": "string",
  "title": "string",
  "description": "string",
  "pricing": "object",
  "features": ["string"]
}
```

## Frontend Integration Notes

- Replace `AuthModal` submit handler with auth API calls
- Replace `lib/services.ts` static data with API fetch (SSR or SWR)
- Contact form should POST to `/api/contact`
- Blog section should fetch from `/api/blogs`
- Video/testimonial components already accept `videoSrc` props for dynamic URLs
