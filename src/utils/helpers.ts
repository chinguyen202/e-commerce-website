import { toast } from 'react-toastify';
import { uploadFileUrl } from './constants';

export const formatPrice = (number: number) => {
  const newNumber = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
  }).format(number);
  return newNumber;
};

export const uploadFile = async (file: File): Promise<string | null> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(uploadFileUrl, {
      method: 'POST',
      body: formData,
    });
    if (response.ok) {
      const data = await response.json();
      const { location } = data;
      return location;
    } else {
      toast.error('Avatar upload failed.');
      return null;
    }
  } catch (error) {
    toast.error('Avatar upload failed.');
    console.error('Avatar upload error:', error);
    return null;
  }
};
