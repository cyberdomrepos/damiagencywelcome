# DamiAgency Website

Creative tech studio in Dhaka. Design, music, and modern web development—fast, minimal, and performant.

## Features

- **Modern Stack**: Built with Next.js 16, React 19, and TypeScript
- **Backend Integration**: Server-side email functionality with Resend API
- **Interactive UI**: 3D backgrounds with Three.js, smooth animations
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Accessibility**: ARIA labels, keyboard navigation, reduced motion support
- **Performance Optimized**: Dynamic imports, lazy loading, optimized builds

## Getting Started

### Prerequisites

- Node.js 20+ and npm
- Resend API account (free tier available)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/cyberdomrepos/damiagencywelcome.git
cd damiagencywelcome
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your Resend API credentials:
```env
RESEND_API_KEY=your_resend_api_key_here
QUOTE_EMAIL=rhymedominic.costa@damiagency.com
RESEND_FROM_EMAIL=quotes@yourdomain.com
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Email Configuration

The website includes backend email functionality for quote requests. See [docs/BACKEND_INTEGRATION.md](docs/BACKEND_INTEGRATION.md) for detailed setup instructions.

**Quick Setup:**
1. Sign up at [Resend](https://resend.com)
2. Get your API key from the dashboard
3. Add credentials to `.env.local`
4. For production, verify your domain in Resend

## Development

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Project Structure

```
app/
├── api/                    # API routes
│   └── send-quote/         # Email submission endpoint
├── components/             # React components
├── hooks/                  # Custom React hooks
├── styles/                 # Global styles
├── layout.tsx              # Root layout
└── page.tsx                # Home page
docs/                       # Documentation
public/                     # Static assets
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel dashboard
3. Add environment variables in Vercel settings
4. Deploy automatically on push

### Environment Variables (Production)

Set these in your Vercel dashboard:
- `RESEND_API_KEY` - Your Resend API key
- `QUOTE_EMAIL` - Email address to receive quote requests
- `RESEND_FROM_EMAIL` - Verified sender email address

## Security

This project includes several security measures:
- XSS protection with HTML escaping
- ReDoS prevention in email validation
- Server-side input validation
- Secure environment variable handling
- No sensitive data exposed to client

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

© 2025 DamiAgency — All rights reserved.

## Support

For questions or support, contact us through the website or email rhymedominic.costa@damiagency.com.
