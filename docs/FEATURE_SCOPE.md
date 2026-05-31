# Feature Scope — Website Frontend v1

## Included

### Landing Page
- Sticky navbar with smooth-scroll section links
- Login / Sign Up modal (phone or email, client validation only)
- Hero carousel (5 service slides, 5s autoplay)
- Services section with hover/glow cards
- Why Choose Woosh (7 benefit cards)
- Testimonials horizontal carousel (placeholder video cards)
- See the Difference before/after carousel (4.5s autoplay)
- Transformations video carousel
- Contact form UI
- Blogs placeholder section
- Footer with social icons and quick links

### Service Pages
- `/services/car-wash-and-care`
- `/services/bike-wash-and-care`
- `/services/auto-wash-and-care`
- `/services/monthly-packages`
- `/services/daily-cleaning-services`

### Design System
- Brand tokens in CSS and `lib/brand.ts`
- Reusable UI components (Button, Card, Modal, Carousel, etc.)

### Documentation
- Project brief, brand guide, feature scope, decisions, API assumptions, TODO
- `AGENTS.md` for future Cursor sessions
- `README.md` with setup instructions

## Intentionally Deferred

| Area | Status |
|------|--------|
| Node.js backend | Not built |
| MongoDB integration | Not built |
| CRM / admin dashboards | Not built |
| Real authentication | Modal UI only |
| Real booking flow | Opens login modal |
| Payment processing | Not built |
| Blog CMS / detail pages | Placeholder cards only |
| Contact form backend | Frontend submit state only |
| Social link URLs | Placeholder `#` links |
| Testimonial video uploads | Placeholder cards ready for swap |
