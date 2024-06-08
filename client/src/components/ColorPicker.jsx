import { Box, Button, Flex, Popover, Text } from '@radix-ui/themes'
import { colors } from '../lib/colors.js'
import { useUserTheme } from '../contexts/themeContext.jsx'

const ColorPicker = () => {
  const { setAccentColor } = useUserTheme()

  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button size='2' radius='full' variant='soft'>
          Set Color Schema
        </Button>
      </Popover.Trigger>
      <Popover.Content width='360px'>
        <Text weight='bold'>Choose a color</Text>
        <Flex gap='3'>
          <Box flexGrow='1'>
            <Flex gap='3' mt='3' justify='between' wrap='wrap'>
              {colors.map((color) => (
                <Button
                  key={color}
                  color={color}
                  onClick={() => setAccentColor(color)}
                  size='3'
                >
                  a
                </Button>
              ))}
            </Flex>
          </Box>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  )
}

export default ColorPicker
