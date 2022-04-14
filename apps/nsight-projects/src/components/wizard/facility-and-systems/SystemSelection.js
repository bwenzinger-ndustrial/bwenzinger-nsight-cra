import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Trash } from '@ndustrial/nd-icons-svg';
import { InputTextField } from '@ndustrial/nd-inputs-react';

const propTypes = {
  className: PropTypes.string,
  onUpdate: PropTypes.func.isRequired,
  systemValues: PropTypes.array
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const StyledInputText = styled(InputTextField)`
  border-color: #f1f1f1;

  input {
    font-size: 0.9rem;
  }
`;

const SystemsList = styled.div`
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  border: 1px solid #f1f1f1;
  background-color: #fbfbfb;
`;

const SystemsItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding: 0.3rem 1rem;
`;

const SystemsItemValue = styled.div`
  flex: 1;
`;

// TODO, move to IconButton file and make reusable.  It's essentially the same in file upload
const StyledDeleteIcon = styled(Trash)`
  height: 22px;
  width: 22px;
  cursor: pointer;
  stroke: #cd425b;

  g {
    stroke-width: 1.5;
  }

  &:hover g,
  &:focus g {
    stroke: #511520;
  }
`;

const SystemSelection = ({ className, onUpdate, systemValues = [] }) => {
  const [valueFromInput, setValueFromInput] = useState();

  const systemInputRef = useRef();

  useEffect(() => {
    const onkeydown = (e) => {
      if (
        e.code === 'Enter' &&
        document.activeElement === systemInputRef.current
      ) {
        onUpdate([...systemValues, valueFromInput]);
        systemInputRef.current.value = '';
      }
    };
    document.addEventListener('keydown', onkeydown);
    return () => document.removeEventListener('keydown', onkeydown);
  }, [systemValues, valueFromInput, onUpdate]);

  const onRemoveSystemItem = useCallback(
    (index) => {
      const newSystemValues = [...systemValues];
      newSystemValues.splice(index, 1);
      onUpdate(newSystemValues);
    },
    [onUpdate, systemValues]
  );

  return (
    <Container className={className}>
      <StyledInputText
        onChange={(e) => setValueFromInput(e.target.value)}
        type={'text'}
        placeholder={'Add a Facility System'}
        ref={systemInputRef}
      />
      <SystemsList>
        {systemValues.map((system, idx) => (
          <SystemsItem key={system + idx}>
            <SystemsItemValue>{system}</SystemsItemValue>
            <StyledDeleteIcon onClick={() => onRemoveSystemItem(idx)} />
          </SystemsItem>
        ))}
      </SystemsList>
    </Container>
  );
};

SystemSelection.propTypes = propTypes;

export default SystemSelection;
