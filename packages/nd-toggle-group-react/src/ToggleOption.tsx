import styled from 'styled-components';
import { NdToggleGroupOptionProps } from './types';

const ToggleOption = styled.button<NdToggleGroupOptionProps>`
  background-color: ${({ isSelected }) => (isSelected ? '#2764ae' : '#fff')};
  border: 1px solid #2764ae;
  color: ${({ isSelected }) => (isSelected ? '#fff' : '#2764ae')};
  cursor: pointer;
  font-size: ${({ size }) => (size === 'small' ? '10px' : '14px')};
  font-weight: 500;
  letter-spacing: ${({ size }) => (size === 'small' ? '1.5px' : '0.75px')};
  line-height: 16px;
  padding: ${({ size }) => (size === 'small' ? '7px 15px' : '11px 15px')};
  position: relative;
  text-transform: uppercase;
  transition: all 0.15s ease-out;
  user-select: none;

  &:focus {
    background-color: ${({ isSelected }) => (isSelected ? '#215594' : '#fff')};
    box-shadow: 0 0 2px 2px #2764ae;
    outline: none;
    z-index: 10;
  }

  &:hover {
    background-color: #215594;
    color: #fff;
  }

  &:disabled,
  &.disabled {
    border-color: #d8d8d8;
    color: #838383;
    cursor: not-allowed;

    &:hover {
      background-color: #fff;
    }
  }
`;

export default ToggleOption;
