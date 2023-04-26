import { AppPages, DashboardPages } from '@shared/application/pages';
import { UserRole } from '@user/types/user';

const PAGES: {
  route: string;
  redirectIfIsAuthenticated?: boolean;
  roles?: UserRole[];
}[] = [
  { route: AppPages.home },
  { route: AppPages.signIn, redirectIfIsAuthenticated: true },
  { route: AppPages.signUp, redirectIfIsAuthenticated: true },
  { route: DashboardPages.home, roles: ['ADMIN'] },
];

export function findCurrentPage(currentRoute: string) {
  const currentPage = PAGES.find(page => {
    let result = false;

    if (page.route.includes('/:')) {
      // if route has dynamic parameters
      const rutaRegex = new RegExp(
        `^${page.route.replace(/:[^/]+/g, '[^/]+')}$`
      );

      if (rutaRegex.test(currentRoute)) {
        result = true;
      }
    } else if (page.route === currentRoute) {
      // if route is static
      result = true;
    }

    return result;
  });

  return currentPage;
}
