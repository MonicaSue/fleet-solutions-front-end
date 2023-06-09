// components
import AvCard from "../AvCard/AvCard";

// styles
import styles from "./AvCardContainer.module.css";

// types
import { Av } from "../../types/models";

interface AvCardContainerProps {
  avs: Av[] | null;
  setSelectedAvId: (value: string) => void;
}

const AvCardContainer = (props: AvCardContainerProps): JSX.Element => {
  const { avs, setSelectedAvId } = props;

  const handleClick = (evt: React.MouseEvent<HTMLImageElement>): void => {
    setSelectedAvId(evt.currentTarget.id);
  };

  return (
    <div className={styles.container}>
      {avs?.map((av) => (
        <div key={av.id} onClick={handleClick} id={av.id.toString()}>
          <AvCard av={av} />
        </div>
      ))}
    </div>
  );
};

export default AvCardContainer;
