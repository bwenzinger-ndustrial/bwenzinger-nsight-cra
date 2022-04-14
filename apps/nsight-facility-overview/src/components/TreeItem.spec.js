import React from 'react';
import { render } from '@testing-library/react';
import { expect } from 'chai';

import TreeItem from './TreeItem';

describe('nsight-facility-overview/src/components/TreeItem', function() {
  it('does not display arrows with one item', function() {
    const { container, getByText } = render(
      <TreeItem component={<div>Root</div>}></TreeItem>
    );

    expect(getByText('Root')).to.not.be.null();
    expect(container.querySelector('svg')).to.be.null();
  });

  it('displays arrows with multiple items', function() {
    const { container, getByText } = render(
      <TreeItem component={<div>Test1</div>}>
        <div>Child</div>
      </TreeItem>
    );

    expect(container.querySelectorAll('svg')).to.have.length(1);
    expect(getByText('Child')).to.not.be.null();
  });

  it('can nest tree items', function() {
    const { container, getByText } = render(
      <TreeItem component={<div>Parent</div>}>
        <TreeItem component={<div>Child</div>}>
          <div>Grand Child</div>
        </TreeItem>
      </TreeItem>
    );

    expect(container.querySelectorAll('svg')).to.have.length(2);
    expect(getByText('Child')).to.not.be.null();
    expect(getByText('Grand Child')).to.not.be.null();
  });
});
