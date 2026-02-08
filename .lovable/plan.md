

# Premium E-Commerce Homepage with Scroll Animations

A sophisticated, animation-rich marketplace homepage inspired by high-end Shopify themes, featuring a green & natural color palette with Framer Motion-powered scroll-triggered animations.

---

## Design System

**Color Palette - Green & Natural:**
- Primary: Rich forest green (#2D5A27)
- Secondary: Warm olive (#6B8E23)
- Accent: Golden yellow (#F4B41A) for CTAs
- Neutral backgrounds with subtle cream/ivory tones
- Natural textures and organic shapes

---

## Homepage Sections

### 1. Navigation Header
- Sticky header with logo, main menu, search, cart icon
- Announcement bar with sliding promotions
- Mega menu for categories on hover

### 2. Hero Carousel
- Full-width image slideshow using Embla Carousel
- Each slide has:
  - Large headline with staggered text reveal
  - Subtitle and CTA button animating in sequence
  - Decorative floating elements (leaves, organic shapes)
- Smooth transitions between slides

### 3. Category Highlights
- 3 promotional banner cards below hero
- Each with image, overlay text, and "Shop Now" button
- Staggered zoom-in animation on scroll

### 4. About/Story Section
- Split layout: image on left, content on right
- Animated checkmarks/features list
- Video play button overlay option

### 5. Product Categories Grid
- Section header with badge and description
- 4-6 circular category images in a row
- Hover effects: image zoom, shadow elevation
- Labels with product counts
- Staggered fadeInUp animation

### 6. Deal of the Day
- Featured product with countdown timer
- Large product image with shine effect on hover
- "100% Organic" badge animation
- Prominent CTA button

### 7. Hot Deal Products
- Horizontal scrollable product cards
- Each card: image, title, price, rating, discount badge
- Quick view button slides up on hover
- Image shine/shimmer effect

### 8. Full-Width Promotional Banner
- Parallax background image
- Centered text with "Subscribe" CTA
- Smooth fadeIn animation

### 9. Brands Carousel
- Auto-scrolling infinite logo carousel
- Grayscale to color on hover
- Smooth continuous animation

### 10. Testimonials Section
- Customer counter/stats
- Quote cards with star ratings, customer photos
- Large quote mark decorations
- Subtle floating animation

### 11. Latest Blog/News
- 3-column article grid
- Featured images with category badges
- Read more links with hover underline animation
- Date and author info

### 12. Instagram/Social Gallery
- Grid of lifestyle images
- Instagram icon overlay on hover
- Zoom effect on images

### 13. Newsletter Section
- Decorative background pattern
- Email input with animated focus state
- CTA button with hover effects

### 14. Footer
- 4-column layout: About, Quick Links, Contact, Newsletter
- Social media icons
- Payment method badges
- Staggered reveal animation

---

## Animation Details

**Framer Motion Integration:**
- `whileInView` for all scroll-triggered animations
- `viewport={{ once: true, margin: "-50px" }}`
- Stagger containers for grids (100ms between items)
- Smooth easing: `ease: "easeOut"`, duration: 0.5-0.8s

**Custom CSS Effects:**
- Image shine/shimmer on hover
- Zoom effects on product images
- Underline animations on links
- Button scale and shadow transitions

---

## Technical Implementation

- Install Framer Motion for animations
- Use Embla Carousel for slideshows
- Responsive design (mobile-first)
- Optimized placeholder images
- Ready for Shopify integration when connected

