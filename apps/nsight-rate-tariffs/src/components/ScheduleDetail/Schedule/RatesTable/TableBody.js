import React from 'react';
import tableUtils from 'react-table/lib/utils';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  classes: PropTypes.string
};

const TBody = styled(tableUtils.makeTemplateComponent('rt-tbody', 'Tbody'))`
  margin-left: 1px;
  margin-right: 1px;
`;

function TableBody({ classes, ...props }) {
  return <TBody className={classes} {...props} />;
}

TableBody.propTypes = propTypes;

export default TableBody;
