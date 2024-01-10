import { useSubscriptionModal } from "@/lib/providers/subscription-modal-provider";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useSupabaseUser } from "@/lib/providers/supabase-user-provider";
import { Button } from "../ui/button";
import Loader from "./Loader";
import { Price, ProductWithPrice } from "@/lib/supabase/supabase.types";
import { formatPrice, postData } from "@/lib/utils";
import { useToast } from "../ui/use-toast";
import { getStripe } from "@/lib/stripe/stripeClient";

interface SubscriptionModalProps {
  products: ProductWithPrice[];
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ products }) => {
  const { open, setOpen } = useSubscriptionModal();
  const { user, subscription } = useSupabaseUser();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const onClickContinue = async (price: Price) => {
    try {
      setIsLoading(true);
      if (!user) {
        toast({ title: "You must be logged in" });
        setIsLoading(false);
        return;
      }
      if (subscription) {
        toast({ title: "Already on a paid plan" });
        setIsLoading(false);
        return;
      }
      const { sessionId } = await postData({
        url: "/api/create-checkout-session",
        data: { price },
      });
      console.log("Getting checkout for stripe");
      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Some error occured",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {subscription?.status === "active" ? (
        <DialogContent>Already on a Paid Plan</DialogContent>
      ) : (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upgrade to a Pro Plan</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            To access Pro features, you need to have a paid plan.
          </DialogDescription>
          {products.length ? (
            products.map((product) => (
              <div
                className="flex justify-between items-center"
                key={product.id}
              >
                {product.prices?.map((price) => (
                  <React.Fragment key={price.id}>
                    <b className="text-3xl text-foreground">
                      {formatPrice(price)} / <small>{price.interval}</small>
                    </b>
                    <Button
                      onClick={() => onClickContinue(price)}
                      disabled={isLoading}
                    >
                      {isLoading ? <Loader /> : "Upgrade ✨"}
                    </Button>
                  </React.Fragment>
                ))}
              </div>
            ))
          ) : (
            <></>
          )}
        </DialogContent>
      )}
    </Dialog>
  );
};

export default SubscriptionModal;
