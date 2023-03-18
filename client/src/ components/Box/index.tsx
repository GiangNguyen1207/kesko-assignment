import './styles.css';

interface BoxProps {
  title: string;
  text: string;
}

export default function Box({ title, text }: BoxProps) {
  return (
    <div className='box-container'>
      <p className='title'>{title}</p>
      <p>{text}</p>
    </div>
  );
}
