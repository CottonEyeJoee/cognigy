import React from 'react'
import { StyledSwitch } from 'styles/ThemeSwitch.styles'

interface Props {
	onThemeChange: () => void
}

export const ThemeSwitch: React.FC<Props> = ({
	onThemeChange,
}): JSX.Element => {
	return <StyledSwitch onChange={onThemeChange} />
}
