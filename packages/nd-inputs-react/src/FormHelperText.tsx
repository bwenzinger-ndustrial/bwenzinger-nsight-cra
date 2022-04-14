import styled from 'styled-components';

export interface FormHelperTextProps {
  invalid?: boolean;
}

const FormHelperText = styled.span<FormHelperTextProps>`
  color: ${({ invalid, theme }) =>
    invalid ? theme.colors.failure : theme.colors.text};
  font-style: italic;
  font-size: 0.833rem;
  font-weight: bold;
`;

export default FormHelperText;
