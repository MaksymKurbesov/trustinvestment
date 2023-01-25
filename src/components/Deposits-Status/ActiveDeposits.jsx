import { Table, Progress, Pagination } from "antd";
import { useWindowSize } from "../../hooks/useWindowSize";

const columns = [
  {
    title: "План",
    dataIndex: "plan",
    key: "plan",
    render: (text) => <>#{text}</>,
    align: "center",
  },
  {
    title: "Прогресс",
    dataIndex: "progress",
    key: "progress",
    render: (text) => (
      <Progress percent={text} showInfo={window.innerWidth > 560} />
    ),
    width: "30%",
  },
  {
    title: "Сумма вклада",
    dataIndex: "deposited",
    key: "deposited",
    render: (text) => <>{text} USD</>,
  },
  {
    title: "Будет получено",
    dataIndex: "willReceived",
    key: "willReceived",
    render: (text) => <>{text} USD</>,
  },
  {
    title: "Дата",
    dataIndex: "date",
    key: "date",
  },
];
const data = [
  {
    key: "1",
    plan: 1,
    progress: 30,
    deposited: 1500,
    willReceived: 4500,
    date: "07/08",
  },
  {
    key: "2",
    plan: 1,
    progress: 30,
    deposited: 1500,
    willReceived: 4500,
    date: "07/08",
  },
  {
    key: "3",
    plan: 1,
    progress: 30,
    deposited: 1500,
    willReceived: 4500,
    date: "07/08",
  },
  {
    key: "4",
    plan: 1,
    progress: 30,
    deposited: 1500,
    willReceived: 4500,
    date: "07/08",
  },
  {
    key: "5",
    plan: 1,
    progress: 30,
    deposited: 1500,
    willReceived: 4500,
    date: "07/08",
  },
  {
    key: "6",
    plan: 1,
    progress: 30,
    deposited: 1500,
    willReceived: 4500,
    date: "07/08",
  },
  {
    key: "7",
    plan: 1,
    progress: 30,
    deposited: 1500,
    willReceived: 4500,
    date: "07/08",
  },
];
const ActiveDeposits = () => {
  const windowSize = useWindowSize();

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{
        defaultPageSize: 5,
        pageSize: 5,
      }}
      size={windowSize.width < 560 ? "small" : "middle"}
    />
  );
};
export { ActiveDeposits };
