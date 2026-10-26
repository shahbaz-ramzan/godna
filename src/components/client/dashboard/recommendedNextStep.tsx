"use client";
import { Routes } from "@/constants/routes";
import { useAccountId } from "@/hooks/useAccountId";
import { searchParticipantByAccountApi } from "@/network/apis/user";
import { ArrowRight, Sun } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type ContactTier = "zero" | "few" | "many";

const STEP_CONFIG: Record<
  ContactTier,
  { body: string; cta: string; href: string }
> = {
  zero: {
    body: "Add your first contact to unlock Style Match.",
    cta: "Add a Contact",
    href: `${Routes.CONTACTS}?openScan=true`,
  },
  many: {
    body: "Run a Style Match with one of your contacts to see how to communicate better.",
    cta: "Try Style Match",
    href: Routes.STYLE_MATCH,
  },
  few: {
    body: "Grow your network. Add more contacts to get richer insights.",
    cta: "Add a Contact",
    href: `${Routes.CONTACTS}?openScan=true`,
  },
};

const RecommendedNextStep = () => {
  const router = useRouter();
  const accountId = useAccountId();
  const [tier, setTier] = useState<ContactTier>("zero");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!accountId) return;

    const fetchContactCount = async () => {
      try {
        const response = await searchParticipantByAccountApi({
          accountId,
          pageNumber: 1,
          pageSize: 11,
        });
        if (response?.data) {
          const count: number = response?.data?.userList?.length ?? 0;
          if (count === 0) setTier("zero");
          else if (count >= 10) setTier("many");
          else setTier("few");
        }
      } catch {
        // keep default "zero" tier
      } finally {
        setLoading(false);
      }
    };

    fetchContactCount();
  }, [accountId]);

  const { body, cta, href } = STEP_CONFIG[tier];

  return (
    <div className="rns-card">
      <div className="rns-card-left">
        <div className="rns-icon">
          <Sun className="h-5 w-5" />
        </div>
        <div className="rns-text">
          <h4>Recommended Next Step</h4>
          {loading ? <div className="rns-text-skeleton" /> : <p>{body}</p>}
        </div>
      </div>
      {loading ? (
        <div className="rns-btn-skeleton" />
      ) : (
        <button
          className="rns-cta-btn"
          onClick={() => router.push(href)}
          onMouseEnter={() => router.prefetch(href)}
        >
          {cta}
          <ArrowRight className="h-[14px] w-[14px]" />
        </button>
      )}
    </div>
  );
};

export default RecommendedNextStep;
