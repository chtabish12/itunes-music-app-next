export const metadata = {
  title: 'iTunes Music App Next',
  description: 'A next generation music app using iTunes API',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}