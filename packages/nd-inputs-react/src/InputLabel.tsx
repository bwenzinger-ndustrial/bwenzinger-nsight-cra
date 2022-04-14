import styled from 'styled-components';

const InputLabel = styled.label`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  font-style: italic;
  font-size: 0.833rem;
`;

export default InputLabel;
