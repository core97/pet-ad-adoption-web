import { cookies } from 'next/headers';
import { Inter } from 'next/font/google';
import { getUserBySession } from '@user/user-service';
import { UserContextProvider } from '@user/presentation/hooks/useUser';
import { DashboardNavbar } from '@shared/presentation/components/DashboardNavbar';
import { Providers } from '@shared/presentation/providers/chakra-provider';
import { AUTH_COOKIE } from '@shared/application/config';
import { Sidebar } from '@ui/Sidebar';
import 'styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Dashboard',
  description: 'Back office of my app',
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const nextCookies = cookies();
  const user = await getUserBySession(nextCookies.get(AUTH_COOKIE)?.value);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <UserContextProvider initialUser={user}>
            <Sidebar navigation={<DashboardNavbar />}>{children}</Sidebar>
          </UserContextProvider>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
