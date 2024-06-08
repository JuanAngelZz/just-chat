import { Heading, Section, Separator, Text } from '@radix-ui/themes'

const About = () => {
  return (
    <Section p='80px' gridRow={'1 / 10'} gridColumn={'2 / 7'}>
      <Heading mb='12px'>About</Heading>
      <Text>
        Welcome to <strong>Just Chat</strong>! 🚀 Just Chat is a unique chat
        application that doesn't require user registration to get started. Every
        user who visits the page is assigned a temporary user with a 14-day
        expiration period. Each user receives a unique identifier code within
        the chat. To chat with another user, you need to share your code via
        external means like Gmail or WhatsApp. If the user is found, a
        connection is established, and you can start chatting!
      </Text>
      <Separator my='20px' orientation='horizontal' size='4' />
      <Heading mb='12px'>How to use</Heading>
      <Text>
        <ol>
          <li>
            <strong>Join the Chat</strong>: Simply open the Just Chat page, and
            you will be assigned a temporary user.
          </li>
          <li>
            <strong>Get Your Code</strong>: Find your unique identifier code in
            your user profile.
          </li>
          <li>
            <strong>Share Your Code</strong>: Share your code with friends
            through email, WhatsApp, or any other messaging platform.
          </li>
          <li>
            <strong>Start Chatting</strong>: Once your friend enters your code
            and establishes the connection, you can start chatting! 💬
          </li>
        </ol>
      </Text>
      <Separator my='20px' orientation='horizontal' size='4' />
      <Heading mb='12px'>User settings</Heading>
      <Text>
        <ul>
          <li>
            - <strong>Registration</strong>: If you want to save your data and credentials
            permanently, head over to the user settings and register. 📝
          </li>
          <li>
            - <strong>Login</strong>: Registered users can log in anytime to access their saved
            data.
          </li>
          <li>
            - <strong>Themes</strong>: Customize your chatting experience by selecting themes in
            the user settings. 🎨
          </li>
        </ul>
      </Text>
    </Section>
  )
}

export default About
