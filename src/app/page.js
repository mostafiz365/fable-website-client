import FeaturedBook from "@/components/FeaturedBook";
import EbookGenres from "@/components/homepage/EbookGenres";
import FableHero from "@/components/homepage/FableHero";
import TopWritersFeatured from "@/components/homepage/TopWritersFeatured";

export default function Home() {
  return (
    <div>
      <FableHero></FableHero>
      <FeaturedBook></FeaturedBook>
      <EbookGenres></EbookGenres>
      <TopWritersFeatured></TopWritersFeatured>
    </div>
  );
}
