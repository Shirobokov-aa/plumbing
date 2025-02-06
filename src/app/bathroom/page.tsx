import Header from "@/components/Header"
import Footer from "@/components/Footer"
import BathroomContent from "@/components/bathroom/BathroomContent" // Исправленный импорт
import { getBathroomPage } from "@/lib/api"

async function BathroomPage() {
  try {
    const data = await getBathroomPage();
    
    return (
      <div>
        <Header defaultTextColor="text-black" activeTextColor="text-black" />
        <BathroomContent initialData={data.data} />
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('Error loading bathroom page:', error);
    return <div>Error loading page</div>;
  }
}

export default BathroomPage;