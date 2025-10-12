import OverviewTemplate from "@/app/sell-a-device/components/overview-template";

export default async function IPhoneOverview({ params }: { params: Promise<{ model: string }> }) {
  const { model } = await params;

  return (
    <OverviewTemplate
      breadcrumbBase="Sell My iPhone"
      deviceType="iPhone"
      backPath={`/sell-a-device/iphone/${model}`}
    />
  );
}