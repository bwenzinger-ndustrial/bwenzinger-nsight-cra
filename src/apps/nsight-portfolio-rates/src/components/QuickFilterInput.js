import React, { useMemo, useState } from 'react';
import { debounce } from 'lodash';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { InputText } from '@ndustrial/nd-inputs-react';

const propTypes = {
  value: PropTypes.string,
  onChangeCallback: PropTypes.func.isRequired
};

const Wrapper = styled.div`
  margin-bottom: 8px;
`;

const Input = styled(InputText)`
  font-size: ${rem('14px')};
`;

function QuickFilterInput(props) {
  const { onChangeCallback } = props;

  const [value, setValue] = useState('');

  // Local state is fully controlled and updates as fast as the user types.
  // Remote state gets debounced to ensure it doesn't update as fast as
  // the user types.
  const debouncedOnChange = useMemo(() => {
    return debounce((value) => {
      onChangeCallback(value);
    }, 200);
  }, [onChangeCallback]);

  return (
    <Wrapper>
      <Input
        type="text"
        value={value}
        onChange={(e) => {
          e.persist();
          setValue(e.target.value);
          debouncedOnChange(e.target.value);
        }}
        placeholder="Filter..."
      />
    </Wrapper>
  );
}

QuickFilterInput.propTypes = propTypes;

export default QuickFilterInput;
