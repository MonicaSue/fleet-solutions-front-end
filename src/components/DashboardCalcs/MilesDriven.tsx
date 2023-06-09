// types
import { Av } from "../../types/models";

interface MilesDrivenProps {
  avs: Av[];
}

const MilesDriven = (props: MilesDrivenProps) => {
  const { avs } = props;

  const milesDriven = { total: 0 };

  avs?.map((av) =>
    av.performances?.map((performance) =>
      performance.distance
        ? (milesDriven.total += performance.distance)
        : (milesDriven.total += 0)
    )
  );

  return <>{milesDriven.total}</>;
};

export default MilesDriven;
