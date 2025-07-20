

import { AlertsScreen } from '../../features/alert/components/AlertsScreen'
import HomeLayout from '../../components/layouts/homeLayout'

const AlertPage = () => {
  return (
   <HomeLayout showSearch={false}>
        <AlertsScreen />
   </HomeLayout>
  )
}

export default AlertPage