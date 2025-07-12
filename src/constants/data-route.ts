import Facebook from "@/components/Icons/facebook";
import Insta from "@/components/Icons/insta";
import Tiktok from "@/components/Icons/tiktok";

export const ROUTE = {
  MENU: '/menu',
  ABOUT: '/about',
  JOURNAL: '/journal',
  CONTACTS: '/contacts',
};

export const ROUTE_MENU = [
  {
    name: 'Menu',
    path: ROUTE.MENU,
  },
  {
    name: 'About Us',
    path: ROUTE.ABOUT,
  },
  {
    name: 'Journal',
    path: ROUTE.JOURNAL,
  },

  {
    name: 'contacts',
    path: ROUTE.CONTACTS,
  },
];

export const ROUTE_SOCIAL = [
  {
    name: 'Tiktok',
    path: 'https://www.tiktok.com/@vietlasacafe',
    icon: Tiktok,
  },
  {
    name: 'Facebook',
    path: 'https://www.facebook.com/vietlasa/',
    icon: Facebook,

  },
  {
    name: 'Instagram',
    path: 'https://www.instagram.com/vietlasa/',
    icon: Insta,
  },
];