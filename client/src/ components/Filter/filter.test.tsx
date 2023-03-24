import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Filter from './index';

describe('Filter Component', () => {
  it('renders filter section with correct input', () => {
    render(
      <Filter
        input='test'
        onInputChange={jest.fn()}
        checkboxValue={false}
        onCheckboxChange={jest.fn()}
      />
    );

    const input = screen.getByTestId('productName');
    expect(input).toBeTruthy();
    expect(input).toHaveValue('test');
  });

  it('renders filter section with correct checkbox value', () => {
    render(
      <Filter
        input=''
        onInputChange={jest.fn()}
        checkboxValue={true}
        onCheckboxChange={jest.fn()}
      />
    );

    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox).toBeTruthy();
    expect(checkbox).toBeChecked();
  });
});
