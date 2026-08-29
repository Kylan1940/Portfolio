export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={``}>
      <body className="bg-white text-black font-sans">{children}</body>
    </html>
  );
}