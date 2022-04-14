import styled from 'styled-components';

const Text = styled.span(
  ({ align, color, size, spacing, theme, transform, weight }) => ({
    letterSpacing: spacing || 'normal',
    color: color ? theme.colors[color] : theme.colors.text,
    fontSize: size || '1em',
    fontWeight: weight || 400,
    textAlign: align || 'left',
    textTransform: transform || 'none'
  })
);

export default Text;
