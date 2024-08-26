import NotFoundPage from '~/components/NotFoundPage';
import {APPS} from './app-router';

export const initializeApp = () => {
  const hostname = window.location.host;
  const subdomain = setupSubdomain(hostname);

  const mainApp = APPS.find((app) => app.main);
  if (!subdomain && mainApp) return mainApp.router;

  const appSubdomain = APPS.find((app) => app.subdomain === subdomain);

  if (appSubdomain) return appSubdomain.router;
  return NotFoundPage;
};

const setupSubdomain = (location: string) => {
  const paths = location.split('.');
  const isLocalhost = paths.slice(-1)[0].includes('localhost');
  return paths.slice(0, isLocalhost ? -1 : -2).join('');
};

export const domain = (name = '') => {
  const host = window.location.host;
  const hostSplit = host.split('.');
  const isLocalhost = hostSplit.slice(-1)[0].includes('localhost');
  const hostname = hostSplit.slice(isLocalhost ? -1 : -2).join('.');
  return `${window.location.protocol}//${name ? `${name}.` : ''}${hostname}/`;
};
