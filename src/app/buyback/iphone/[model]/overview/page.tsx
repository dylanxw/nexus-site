import OverviewTemplate from "@/app/buyback/components/overview-template";

export default async function IPhoneOverview({ params }: { params: Promise<{ model: string }> }) {
  const { model } = await params;

  return (
    <OverviewTemplate
      breadcrumbBase="Sell My iPhone"
      deviceType="iPhone"
      backPath={`/buyback/iphone/${model}`}
    />
  );
}