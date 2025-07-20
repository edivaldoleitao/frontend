

import { SubscriptionScreen } from '../../features/subscription/components/SubscriptionScreen'
import HomeLayout from '../../components/layouts/homeLayout'

const SubscriptionPage = () => {
  return (
   <HomeLayout showSearch={false}>
        <SubscriptionScreen />
   </HomeLayout>
  )
}

export default SubscriptionPage