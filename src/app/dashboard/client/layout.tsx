import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Mon Espace CampyWin',
    default:  'Mon Dashboard | CampyWin',
  },
  description: 'Gérez vos réservations, candidatures, trajets covoiturage et commandes de matériel camping.',
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
