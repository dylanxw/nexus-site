import OverviewTemplate from "@/app/sell-a-device/components/overview-template";

export default function SamsungOverview({ params }: { params: { model: string } }) {
  return (
    <OverviewTemplate
      breadcrumbBase="Sell My Samsung"
      deviceType="Samsung"
      backPath={`/sell-a-device/samsung/${params.model}`}
    />
  );
}