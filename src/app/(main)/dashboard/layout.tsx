import { SubscriptionModalProvider } from "@/lib/providers/subscription-modal-provider";
import { getActiveProductsWithPrice } from "@/lib/supabase/queries";
import { ProductWithPrice } from "@/lib/supabase/supabase.types";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
  params: any;
}

const Layout: React.FC<LayoutProps> = async ({ children, params }) => {
  const { data: products, error } = await getActiveProductsWithPrice();
  if (error) throw new Error(`Error: ${error}`);
  return (
    <main className="flex over-hidden h-screen">
      <SubscriptionModalProvider products={products as ProductWithPrice[]}>
        {children}
      </SubscriptionModalProvider>
    </main>
  );
};

export default Layout;
