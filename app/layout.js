// app/layout.js
import './globals.css';

export const metadata = {
  title: 'Culinary Artistry',
  description: 'Discover our exquisite menu selections',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
