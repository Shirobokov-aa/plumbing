import Header from "@/components/Header"
import Footer from "@/components/Footer"
import BathroomContent from "@/components/bathroom/BathroomContent"
import { getBathroomPage } from "@/app/actions/bathroom/db"

export default async function BathroomPage() {
  try {
    const bathroomData = await getBathroomPage()
    console.log('Данные страницы ванной:', bathroomData) // для отладки

    if (!bathroomData) {
      return <div>Данные не найдены</div>
    }

    return (
      <div>
        <Header defaultTextColor="text-black" activeTextColor="text-black" />
        <BathroomContent initialData={bathroomData.data} />
        <Footer />
      </div>
    )
  } catch (error) {
    console.error('Error loading bathroom page:', error)
    return <div>Ошибка загрузки страницы</div>
  }
}
