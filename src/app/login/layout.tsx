export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-sense-background">{children}</body>
    </html>
  );
}
