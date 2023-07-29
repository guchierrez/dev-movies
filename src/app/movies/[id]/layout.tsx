import { AddReviewModal } from "@/app/components/general/AddReviewModal";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AddReviewModal />
      {children}
    </>
  );
}
