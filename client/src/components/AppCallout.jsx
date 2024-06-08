import { CheckCircledIcon } from '@radix-ui/react-icons'
import { Callout } from '@radix-ui/themes'
import { useAuth } from '../contexts/authContext'

const AppCallout = () => {
  const { callout } = useAuth()

  return callout && (
    <div style={{ position: 'absolute', zIndex: 100, bottom: 40, right: 40, width: '40%' }}>
      <Callout.Root variant='soft' color='indigo'>
        <Callout.Icon>
          <CheckCircledIcon />
        </Callout.Icon>
        <Callout.Text>{callout}</Callout.Text>
      </Callout.Root>
    </div>
  ) 
}

export default AppCallout
