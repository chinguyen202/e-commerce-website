type Link = {
  id: number;
  text: string;
  url: string;
};

export const links: Link[] = [
  {
    id: 1,
    text: 'Home',
    url: '/',
  },
  {
    id: 2,
    text: 'Products',
    url: '/products',
  },
];

// Base urls
export const uploadFileUrl = 'https://api.escuelajs.co/api/v1/files/upload';
