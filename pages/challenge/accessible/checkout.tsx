import type { NextPage } from "next";
import s from "@/styles/challenge/accessible/Checkout.module.css";
import WidthContainer from "@/components/WidthContainer/WidthContainer";
import { useChallengeStore } from "@/state/useChallenge";
import { Button } from "@/components/challenge/accessible/Button/Button";
import { useRouter } from "next/router";
import { Input } from "@/components/challenge/accessible/Input/Input";
import { useCallback, useEffect, useMemo, useState } from "react";
import { challengeMap } from "@/data/challenge/challenge";
import { ConfirmPayModal } from "@/components/main/ConfirmPayModal/ConfirmPayModal";
import { Challenge } from "@/types/challenge/challenge";
import { validateResult } from "@/utils/validateResult";
import Image from "next/image";

const CheckoutPage: NextPage = () => {
  const router = useRouter();

  const {
    filter,
    checkoutCart,
    isDiscountApplied,
    setIsDiscountApplied,
    setCheckoutCart,
    setCart,
    setIsSuccessful,
    setChallengeErrors,
  } = useChallengeStore((state) => ({
    filter: state.filter,
    checkoutCart: state.checkoutCart,
    isDiscountApplied: state.isDiscountApplied,
    setIsDiscountApplied: state.setIsDiscountApplied,
    setCheckoutCart: state.setCheckoutCart,
    setCart: state.setCart,
    setIsSuccessful: state.setIsSuccessful,
    setChallengeErrors: state.setChallengeErrors,
  }));

  const [challenge, setChallenge] = useState<Challenge>();

  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [country, setCountry] = useState<string>();
  const [city, setCity] = useState<string>();
  const [discountCode, setDiscountCode] = useState<string>();

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);

  const subtotal = useMemo(
    () =>
      checkoutCart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [checkoutCart]
  );

  const total = useMemo(
    () =>
      isDiscountApplied
        ? Number(
            (challenge?.deliveryPrice || 0) +
              subtotal * ((100 - (challenge?.discount || 0)) / 100)
          ).toFixed(2)
        : Number((challenge?.deliveryPrice || 0) + subtotal).toFixed(2),
    [challenge?.deliveryPrice, challenge?.discount, subtotal, isDiscountApplied]
  );

  useEffect(() => {
    if (filter === undefined) {
      router.push("/");
    }
  }, [filter, router]);

  useEffect(() => {
    if (filter) {
      const data = filter ? challengeMap[filter] : undefined;
      if (data) {
        setChallenge(data);
        return;
      }
    }
  }, [filter]);

  useEffect(() => {
    if (discountCode && challenge && challenge.promocode === discountCode) {
      setIsDiscountApplied(true);
    }
  }, [challenge, discountCode, filter, setIsDiscountApplied]);

  const onPayClick = useCallback(() => {
    const cartValidationResult = validateResult(
      filter,
      name,
      email,
      address,
      country,
      city,
      checkoutCart,
      isDiscountApplied
    );

    setIsSuccessful(cartValidationResult.length === 0);
    setChallengeErrors(cartValidationResult);

    setCart([]);
    setCheckoutCart([]);
    setIsDiscountApplied(false);
    router.push("/result");
  }, [
    filter,
    name,
    email,
    address,
    country,
    city,
    checkoutCart,
    isDiscountApplied,
    setIsSuccessful,
    setChallengeErrors,
    setCart,
    setCheckoutCart,
    setIsDiscountApplied,
    router,
  ]);

  const onBackToCartClick = useCallback(() => {
    setCheckoutCart([]);
    router.push("/challenge/accessible/cart");
  }, [setCheckoutCart, router]);

  return (
    <>
      <main className={s.main}>
        <WidthContainer className={s.widthContainer}>
          <h1 className={s.title}>Your order</h1>
          <div className={s.form}>
            <div className={s.group}>
              <div className={s.section}>
                <h2 className={s.sectionTitle}>Contact information</h2>
                <Input
                  label="First name"
                  placeholder="John Doe"
                  color="black"
                  value={name}
                  onChange={(newValue?: string) => setName(newValue)}
                  type={"text"}
                  required
                />
                <div className={s.inputGroup}>
                  <Input
                    label="Email"
                    placeholder="example@gmail.com"
                    color="black"
                    value={email}
                    onChange={(newValue?: string) => setEmail(newValue)}
                    type={"email"}
                    required
                  />
                  <Input
                    label="Phone (optional)"
                    placeholder="+12345678900"
                    color="black"
                    value={phone}
                    onChange={(newValue?: string) => setPhone(newValue)}
                    type={"tel"}
                  />
                </div>
              </div>
              <div className={s.section}>
                <h2 className={s.sectionTitle}>Shipping address</h2>
                <Input
                  label="Address"
                  placeholder="Nieuwezijds Voorburgwal 147"
                  color="black"
                  value={address}
                  onChange={(newValue?: string) => setAddress(newValue)}
                  type={"text"}
                  required
                />
                <div className={s.inputGroup}>
                  <Input
                    label="Country"
                    placeholder="The Netherlands"
                    color="black"
                    value={country}
                    onChange={(newValue?: string) => setCountry(newValue)}
                    type={"text"}
                    required
                  />
                  <Input
                    label="City"
                    placeholder="Amsterdam"
                    color="black"
                    value={city}
                    onChange={(newValue?: string) => setCity(newValue)}
                    type={"text"}
                    required
                  />
                </div>
              </div>
            </div>
            <div className={s.group}>
              <div className={s.section}>
                <h2 className={s.sectionTitle}>Order details</h2>
                <div className={s.products}>
                  {checkoutCart.map((item) => (
                    <div key={item.id} className={s.productContainer}>
                      <div className={s.imageContainer}>
                        <Image
                          className={s.image}
                          src={item.imgSrc}
                          alt={item.name}
                          fill
                        />
                      </div>
                      <div className={s.productInfo}>
                        <span className={s.productName}>{item.name}</span>
                        <span>
                          ${item.price} x {item.quantity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <Input
                  label="Discount code"
                  placeholder="SALE20"
                  color="black"
                  value={discountCode}
                  onChange={(newValue?: string) => setDiscountCode(newValue)}
                  type={"text"}
                />
                {discountCode !== undefined &&
                  discountCode !== "" &&
                  (isDiscountApplied ? (
                    <div className={s.errorMessage}>Discount applied</div>
                  ) : (
                    <div className={s.errorMessage}>Invalid discount code</div>
                  ))}
                <div className={s.border} />
                <span className={s.subtotal}>
                  Subtotal
                  <span className={s.price}>
                    {"  "}${Number(subtotal).toFixed(2)}
                  </span>
                </span>
                <span className={s.subtotal}>
                  Shipping
                  <span className={s.price}>
                    {"  "}${challenge?.deliveryPrice || 0}
                  </span>
                </span>
                {isDiscountApplied && (
                  <span className={s.subtotal}>
                    Discount
                    <span className={s.price}>
                      {"  "}-{challenge?.discount || 0}%
                    </span>
                  </span>
                )}
                <div className={s.border} />
                <span className={s.total}>
                  Total
                  <span className={s.price}>
                    {"  "}${total}
                  </span>
                </span>
              </div>
              <div className={s.buttonsGroup}>
                <Button
                  text="Pay"
                  onClick={() => setIsConfirmModalOpen(true)}
                  type="primary"
                />
                <Button
                  text="Back to cart"
                  onClick={onBackToCartClick}
                  type="secondary"
                />
              </div>
            </div>
          </div>
        </WidthContainer>
      </main>
      {isConfirmModalOpen && (
        <ConfirmPayModal
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          onOk={onPayClick}
        />
      )}
    </>
  );
};

export default CheckoutPage;
