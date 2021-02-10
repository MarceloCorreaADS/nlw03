import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  register_approved: boolean;
  images: Array<{
    id: number;
    url: string;
  }>;
}

interface OrphanageContextData {
  orphanage: Orphanage | null;
  orphanageLoad(id: number): Promise<void>;
  clearOrphanage(): void;
}

interface IProps {
  children: React.ReactNode;
}

const OrphanageContext = createContext<OrphanageContextData>({} as OrphanageContextData);

export function OrphanageProvider(props: { children: IProps; }) {
  const [orphanage, setOrphanage] = useState<Orphanage | null>(null);
  
  async function orphanageLoad(id: number) {
    try {
      await api.get(`orphanages/${id}`).then(response => {
        setOrphanage(response.data);
      });
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    }
  }

  function clearOrphanage() {
    setOrphanage(null);
  }

  return (
    <OrphanageContext.Provider value={{ orphanage: orphanage, orphanageLoad, clearOrphanage }}>
      {props.children}
    </OrphanageContext.Provider>
  )
};

export default OrphanageContext;

export function useOrphanage() {
  const context = useContext(OrphanageContext);

  return context;
}