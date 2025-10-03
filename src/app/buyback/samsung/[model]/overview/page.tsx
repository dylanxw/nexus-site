import OverviewTemplate from "@/app/buyback/components/overview-template";

export default function SamsungOverview({ params }: { params: { model: string } }) {
  return (
    <OverviewTemplate
      breadcrumbBase="Sell My Samsung"
      deviceType="Samsung"
      backPath={`/buyback/samsung/${params.model}`}
    />
  );
}