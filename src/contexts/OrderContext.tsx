
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface OrderData {
  category: string;
  width: number;
  height: number;
  depth: number;
  material: string;
  colour: string;
  assembly: 'yes' | 'no';
  delivery: 'delivery' | 'pickup';
  address?: {
    street: string;
    suburb: string;
    postcode: string;
  };
  customer?: {
    name: string;
    phone: string;
    email: string;
  };
  basePrice: number;
  finalPrice: number;
}

interface OrderContextType {
  orderData: Partial<OrderData>;
  updateOrder: (data: Partial<OrderData>) => void;
  clearOrder: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orderData, setOrderData] = useState<Partial<OrderData>>({});

  const updateOrder = (data: Partial<OrderData>) => {
    setOrderData(prev => ({ ...prev, ...data }));
  };

  const clearOrder = () => {
    setOrderData({});
  };

  return (
    <OrderContext.Provider value={{ orderData, updateOrder, clearOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};
