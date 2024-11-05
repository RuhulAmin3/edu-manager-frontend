import { Row, Col, Tooltip } from "antd";

const data = [
  { month: "January", value: 120, color: "#1890FF" },
  { month: "February", value: 90, color: "#73C9E8" },
  { month: "March", value: 140, color: "#FF7875" },
  { month: "April", value: 110, color: "#FFC069" },
  { month: "May", value: 130, color: "#95DE64" },
  { month: "June", value: 100, color: "#5CDBD3" },
  { month: "July", value: 150, color: "#FF85C0" },
  { month: "August", value: 125, color: "#FF9C6E" },
  { month: "September", value: 115, color: "#D3F261" },
  { month: "October", value: 135, color: "#A0D911" },
  { month: "November", value: 95, color: "#FFD666" },
  { month: "December", value: 105, color: "#FF4D4F" },
];

// Calculate total value
const totalValue = data.reduce((acc, item) => acc + item.value, 0);

const ExamQuantityChart = () => {
  return (
    <Row
      style={{
        width: "100%",
        display: "flex",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      {data.map((item) => {
        // Calculate width as a percentage of the total
        const widthPercentage = ((item.value / totalValue) * 100).toFixed(2);

        return (
          <Col
            key={item.month}
            style={{
              width: `${widthPercentage}%`,
              backgroundColor: item.color,
              textAlign: "center",
              color: "#fff",
              padding: "4px 0",
            }}
          >
            <Tooltip title={`${item.month}: ${item.value}`}>
              <span style={{ fontSize: "12px", fontWeight: "bold" }}>
                {item.month.slice(0, 3)} {/* Display the month abbreviation */}
              </span>
            </Tooltip>
          </Col>
        );
      })}
    </Row>
  );
};

export default ExamQuantityChart;
