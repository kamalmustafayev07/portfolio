import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";
import Spinner from "../assets/icons/Spinner";
import CircleIcon from "../assets/icons/CircleIcon";

const DealCard = () => {
  const openedCardInfo = useSelector(
    (state: RootState) => state.deals.openedCardInfo
  );
  const isLoadingCard = useSelector(
    (state: RootState) => state.deals.isLoadingCard
  );
  const [formattedDate, setFormattedDate] = useState<string | null>(null);
  const [circleColor, setCircleColor] = useState<"red" | "yellow" | "green">("red");

  useEffect(() => {
    if (openedCardInfo) {
      const closestTaskDate = new Date(openedCardInfo.closest_task_at * 1000);
      const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      };
      setFormattedDate(closestTaskDate.toLocaleDateString("ru-RU", options));

      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0); 

      if (!openedCardInfo.closest_task_at) {
        setCircleColor("red");
      } else if (closestTaskDate < currentDate) {
        setCircleColor("red");
      } else if (closestTaskDate.toDateString() === currentDate.toDateString()) {
        setCircleColor("green");
      } else if (closestTaskDate > currentDate) {
        const diffDays = Math.floor((closestTaskDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));
        if (diffDays >= 1) {
          setCircleColor("yellow"); 
        } else {
          setCircleColor("green"); 
        }
      }
    }
  }, [openedCardInfo]);

  return (
    <tr>
      {isLoadingCard ? (
        <td className="flex justify-center">
          <div className="w-[50px]">
            <Spinner />
          </div>
        </td>
      ) : (
        <td colSpan={3} className="border border-black p-2">
          {openedCardInfo && (
            <div className="flex justify-between p-3">
              <p><span className="font-bold">ID: </span>{openedCardInfo.id}</p>
              <p><span className="font-bold">Name: </span>{openedCardInfo.name}</p>
              <p><span className="font-bold">Date: </span>{formattedDate}</p>
              <p className="flex justify-center items-center gap-2">
                <span className="font-bold">Status: </span>
                <span>
                  <CircleIcon size={15} color={circleColor} />
                </span>
              </p>
            </div>
          )}
        </td>
      )}
    </tr>
  );
};

export default DealCard;
