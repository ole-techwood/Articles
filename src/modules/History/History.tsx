import { useHistoryList } from "./application";
import { HistoryList } from "./view";

export const History = () => {
  const historyListProps = useHistoryList();

  return <HistoryList {...historyListProps} />;
};
