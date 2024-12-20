function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="min-h-screen px-6 sm:px-0">{children}</div>;
}

export default AuthLayout;
