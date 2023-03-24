import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './styles.css';

interface FilterProps {
  input: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checkboxValue: boolean;
  onCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Filter({
  input,
  onInputChange,
  checkboxValue,
  onCheckboxChange,
}: FilterProps) {
  return (
    <div className='filter-container'>
      <>
        <label htmlFor='productName' className='product-name-label'>
          Filter orders by product name
        </label>
        <br />
        <div className='input'>
          <input
            type='text'
            name='productName'
            id='productName'
            data-testid='productName'
            placeholder='Aniseed Syrup'
            value={input}
            onChange={onInputChange}
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            size='2x'
            className='icon'
          />
        </div>
      </>
      <div className='checkbox-container'>
        <input
          type='checkbox'
          name='checkbox'
          id='checkbox'
          data-testid='checkbox'
          checked={checkboxValue}
          onChange={onCheckboxChange}
        />
        <label htmlFor='checkbox'>Show only shipped orders</label>
      </div>
    </div>
  );
}
