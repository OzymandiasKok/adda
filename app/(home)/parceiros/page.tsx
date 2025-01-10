import { ActContainer } from './components/act-container'
import { HeroParceiros } from './components/hero-partner'
import { OurPartner } from './components/our-partner'
import { TabsMenu } from './components/tabs-menu'

export default function Parceiros() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <HeroParceiros />

      <OurPartner />

      <div className="bg-[#E7E7E7] px-11 py-16">
        <div className="flex flex-col rounded-3xl bg-themeColor p-11 pb-20 2xl:container 2xl:mx-auto">
          <TabsMenu />
        </div>
      </div>

      <ActContainer />
    </div>
  )
}
