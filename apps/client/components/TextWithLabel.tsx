type Props = {
  label: string;
  text: string;
};

const TextWithLabel: React.FC<Props> = ({ label, text }) => {
  return (
    <span className="text-neutral-300 text-sm">
      <a className="text-neutral-300 text-sm font-bold">{label + ': '}</a>
      {text}
    </span>
  );
};

export default TextWithLabel;
