"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/auth.client";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { PricingCard } from "../components/pricing-cards";

export const UpgradeView = () => {
  const trpc = useTRPC();

  const { data: products } = useSuspenseQuery(
    trpc.premium.getProducts.queryOptions(),
  );

  const { data: currentSubscription } = useSuspenseQuery(
    trpc.premium.getCurrentSubscription.queryOptions(),
  );

  // Debugging: This will tell you if products are actually arriving in the browser
  console.log("Polar Products:", products);

  return (
    <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-10">
      <div className="mt-4 flex-1 flex flex-col gap-y-10 items-center">
        <h5 className="font-medium text-2xl md:text-3xl">
          You are on the {""}
          <span className="font-semibold text-primary">
            {currentSubscription?.name ?? "Free"}
          </span>{" "}
          Plan
        </h5>

        {products.length === 0 ? (
          <div className="text-muted-foreground mt-10">
            No active products found. Please check your Polar.sh dashboard.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.map((product) => {
              const isCurrentProduct = currentSubscription?.id === product.id;
              const isPremium = !!currentSubscription;

              // Safety: Get the first price or null
              const firstPrice =
                product.prices && product.prices.length > 0
                  ? product.prices[0]
                  : null;

              let buttonText = "Upgrade";
              let onClick = () =>
                authClient.checkout({ products: [product.id] });

              if (isCurrentProduct) {
                buttonText = "Manage";
                onClick = () => authClient.customer.portal();
              } else if (isPremium) {
                buttonText = "Change Plan";
                onClick = () => authClient.customer.portal();
              }

              return (
                <PricingCard
                  key={product.id}
                  buttonText={buttonText}
                  onClick={onClick}
                  variant={
                    (product.metadata as any)?.variant === "highlighted"
                      ? "highlighted"
                      : "default"
                  }
                  title={product.name}
                  price={
                    firstPrice?.amountType === "fixed"
                      ? firstPrice.priceAmount / 100
                      : 0
                  }
                  description={product.description}
                  priceSuffix={`/${firstPrice && "recurringInterval" in firstPrice ? firstPrice.recurringInterval : "month"}`}
                  features={product.benefits.map(
                    (benefit) => benefit.description,
                  )}
                  badge={(product.metadata as any)?.badge as string | null}
                  className=""
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export const UpgradeViewLoading = () => (
  <LoadingState title="Loading" description="This may take a few seconds" />
);

export const UpgradeViewError = () => (
  <ErrorState title="Error" description="Failed to load subscription details" />
);
