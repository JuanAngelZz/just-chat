import { Flex } from '@radix-ui/themes'
import SignIn from './SignIn'
import SignUp from './SignUp'

const Sign = () => {
  return (
    <Flex gap='8px'>
      <SignUp />
      <SignIn />
    </Flex>
  )
}

export default Sign
