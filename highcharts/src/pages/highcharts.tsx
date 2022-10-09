import { FC, useRef } from "react";
import Highcharts from "highcharts";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsAccessibility from "highcharts/modules/accessibility";
import HighchartsReact from "highcharts-react-official";
const HighchartsPage: FC = () => {
  if (typeof Highcharts === "object") {
    HighchartsAccessibility(Highcharts);
    HighchartsExporting(Highcharts);
  }
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const options = {
    xAxis: {
      categories: ["A", "B", "C"]
    },
    series: [
      { data: [1, 2, 3] }
    ],
    plotOptions: {
      series: {
        point: {
        }
      }
    }
  };
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      ref={chartComponentRef}
    />
  );
};
export default HighchartsPage;
