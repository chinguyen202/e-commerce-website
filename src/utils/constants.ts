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
export const categoryUrl = 'https://api.escuelajs.co/api/v1/categories';
export const productUrl = 'https://api.escuelajs.co/api/v1/products';
export const userUrl = 'https://api.escuelajs.co/api/v1/users';
export const authUrl = 'https://api.escuelajs.co/api/v1/auth';
export const uploadFileUrl = 'https://api.escuelajs.co/api/v1/files/upload';
