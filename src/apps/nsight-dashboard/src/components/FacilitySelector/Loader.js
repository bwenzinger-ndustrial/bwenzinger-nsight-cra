import styled from 'styled-components';

import { Loader as NdLoader, LoaderDot } from '@ndustrial/nd-loader-react';

const Loader = styled(NdLoader)`
  ${LoaderDot} {
    background-color: #fff;
  }
`;

export default Loader;
