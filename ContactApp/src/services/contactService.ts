import api from '../api/api';

export type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string;
  favorite: boolean;
  userId: number;
};

export const getContacts = async (token: string): Promise<Contact[]> => {
  const response = await api.get('/contacts', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createContact = async (token: string, contact: Omit<Contact, 'id' | 'userId'>) => {
  const response = await api.post('/contacts', contact, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateContact = async (
  token: string,
  id: number,
  updatedData: Partial<Omit<Contact, 'id' | 'userId'>>
) => {
  const response = await api.put(`/contacts/${id}`, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteContact = async (token: string, id: number) => {
  const response = await api.delete(`/contacts/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const sendEmail = async (
  token: string,
  emailData: {
    subject: string;
    message: string;
    senderName: string;
  }
) => {
  const response = await api.post('/email/send', {
    to: 'testeser259@gmail.com', 
    ...emailData,
  }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};