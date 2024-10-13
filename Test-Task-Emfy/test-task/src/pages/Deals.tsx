import React, { useEffect, useRef, useState } from "react";
import { addToOpenedLoad, fetchContent } from "../store/DealsReducer";
import { useAppDispatch } from "../hooks";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Spinner from "../assets/icons/Spinner";
import DealCard from "../components/DealCard";
import ArrowDown from "../assets/icons/ArrowDown";
import ArrowUp from "../assets/icons/ArrowUp";

const Deals = () => {
  const leads = useSelector((state: RootState) => state.deals.leads);
  const isLoading = useSelector((state: RootState) => state.deals.isLoading);
  const openedCardId = useSelector(
    (state: RootState) => state.deals.openedCardId
  );
  const [page, setPage] = useState(1);
  const requestedPages = useRef<number[]>([]);
  const dispatch = useAppDispatch();

  const LIMIT = 3;
  const maxPages = 3;

  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImJiY2U0MzlhMDM0ZDMwYzc3MTExYmIxOGEzZmRiOGZjNWQzMWMyZjg5ZTEyZWMzMjY4ZGQ3YTcyY2ExZjJjMTkzMzk3ODI0NDVkYWRlYzJhIn0.eyJhdWQiOiIxNGIzOWMzMi0xMjY5LTQ3MTItYTYwMi00MDYxMzUwODgyN2YiLCJqdGkiOiJiYmNlNDM5YTAzNGQzMGM3NzExMWJiMThhM2ZkYjhmYzVkMzFjMmY4OWUxMmVjMzI2OGRkN2E3MmNhMWYyYzE5MzM5NzgyNDQ1ZGFkZWMyYSIsImlhdCI6MTcyODI0MTY2NCwibmJmIjoxNzI4MjQxNjY0LCJleHAiOjE3MzAzMzI4MDAsInN1YiI6IjExNjEyMTgyIiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxOTkyNzkwLCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiNzY1NzgxMzctNjA3My00NGFlLTg1NmYtZjk1NGM1NmQxZGFmIiwiYXBpX2RvbWFpbiI6ImFwaS1iLmFtb2NybS5ydSJ9.S4VQ4z2AVxlpNDM3pK0m1A_cu8gCtZPVkyJxDwiCHyPQy4bpozEMiQ6xKwLZCKDPQvZrzEfDaGG00FeVB7Fmiz-bI7JYIqoHi2X995a_F8cQ9QaLpICcwGZ7FTNTkjC6jAwc4O0OTA7Wk12h2ow1QFsXjJVjCc6vorPntyeOu8uNTMzJZNJEfolgxhwM69Vr8ktrqbj63xI9I7gCTUUaGB0ntya_DGY1lHrsxkbj9uArSxuTZo2QxcHozUvO2QgroPlmdNfkeZNiVZAMh7MsMarofvVZzHMCm2ldaZe-ud6hkf0dH0STtVjxTrldNQ_8RZ9Vq3bKr_t76gOQbcOgpA";
  const subdomain = "temple23062";

  const fetchUrl = (page: number) =>
    `http://localhost:3000/getleads/?token=${token}&subdomain=${subdomain}&limit=${LIMIT}&page=${page}`;

  const handleOpenedCard = (id: number) => {
    if (openedCardId === id) {
      dispatch(addToOpenedLoad(null));
    } else {
      dispatch(addToOpenedLoad(id));
    }
  };

  useEffect(() => {
    if (openedCardId != null) {
      dispatch(
        fetchContent(
          `http://localhost:3000/getleads/id/${openedCardId}/?token=${token}&subdomain=${subdomain}`
        )
      );
    }
  }, [openedCardId]);

  useEffect(() => {
    if (!requestedPages.current.includes(page)) {
      dispatch(fetchContent(fetchUrl(page)));
      requestedPages.current.push(page);
    }
  }, [page, dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPage((prevPage) => {
        if (prevPage <= maxPages) {
          return prevPage + 1;
        } else {
          clearInterval(interval);
          return prevPage;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section>
      {isLoading ? (
        <div className="flex justify-center">
          <div className="w-[100px]">
            <Spinner />
          </div>
        </div>
      ) : (
        <div className="border border-black rounded-lg overflow-hidden">
          <table className="table-auto min-w-[400px] w-full">
            <thead>
              <tr>
                <th className="border border-black p-2 bg-purple-400 text-white">
                  ID
                </th>
                <th className="border border-black p-2 bg-purple-400 text-white">
                  Название
                </th>
                <th className="border border-black p-2 bg-purple-400 text-white">
                  Бюджет
                </th>
              </tr>
            </thead>
            <tbody>
              {leads &&
                leads.map((item) => {
                  const isOpen = item.id === openedCardId;
                  return (
                    <React.Fragment key={item.id}>
                      <tr
                        onClick={() => handleOpenedCard(item.id)}
                        className="cursor-pointer hover:bg-gray-200"
                      >
                        <td className="border border-black p-2">{item.id}</td>
                        <td className="border border-black p-2">{item.name}</td>
                        <td className="border border-black p-2">
                          <div className="flex justify-between">
                            <span>{item.price}</span>
                            {isOpen ? (
                              <div className="w-[25px]"><ArrowUp/></div>
                            ) : (
                              <div className="w-[25px]"><ArrowDown/></div>
                            )}
                          </div>
                        </td>
                      </tr>
                      {isOpen && <DealCard />}
                    </React.Fragment>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default Deals;
