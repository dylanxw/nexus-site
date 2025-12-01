import OverviewTemplate from "@/app/sell-a-device/components/overview-template";

export default async function SamsungOverview({ params }: { params: Promise<{ model: string }> }) {
  const { model } = await params;
  return (
    <OverviewTemplate
      breadcrumbBase="Sell My Samsung"
      deviceType="Samsung"
      backPath={`/sell-a-device/samsung/${model}`}
    />
  );
}