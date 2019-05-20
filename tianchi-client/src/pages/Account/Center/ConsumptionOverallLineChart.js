/**
 * Created by 胡晓慧 on 2019/4/13.
 */
import React, { memo } from "react";
import { Card, Col, Empty, Row, Typography } from 'antd';
import { Axis, Chart, Geom, Legend, Tooltip } from "bizcharts";
import { OneTimelineChart } from '@/components/Charts';
import { HOUR_LIST } from '@/constants';

const { Paragraph, Text } = Typography;

let chartIns = null;


const ConsumptionOverallLineChart = memo(
  ({ hourlyAvgCost, dailySumCost, maxHourlyAvg, dailyAvgRank, dailyAvg }) => {
    if (chartIns) {
      const geoms = chartIns.getAllGeoms();
      for (let geom of geoms) {
        geom && geom.show();
      }
    }
    let timeCount = 0;
    let maxTime = 0;
    let maxMoney = 0;
    for (let i = 0; i < hourlyAvgCost.length; i++) {
      if (hourlyAvgCost[i].avg_cost !== 0) {
        timeCount = timeCount + 1;
        if (hourlyAvgCost[i].avg_cost >= maxMoney) {
          maxMoney = hourlyAvgCost[i].avg_cost;
          maxTime = i;
        }
      }
    }

    return (
      <Card title="总体消费情况一览" bordered={false} style={{ width: '100%' }}>
        <Card title="总体消费趋势" bordered={false} style={{ width: '100%', cursor: "auto" }} hoverable={true}>
          {dailySumCost.length ? <Row type="flex" align="middle">
            <Col xl={20} xs={24}>
              <OneTimelineChart
                showPredict={true}
                height={300}
                data={dailySumCost.map((data) => {
                  return {
                    x: Date.parse(data.date),
                    y: data.total
                  };
                })}
              />
            </Col>
            <Col xl={4} xs={24}>
              <Paragraph>该学生平均日消费为<Text strong style={{ color: "#cc4756" }}>¥{dailyAvg}</Text>元</Paragraph>
              <Paragraph>超过<Text
                strong style={{ color: "#cc4756" }}
              >
                {`${(dailyAvgRank * 100).toFixed(2)}%`}
              </Text>的学生</Paragraph>
            </Col>
          </Row> : <Empty/>}
        </Card>
        <Card title="不同时间点平均消费对比" bordered={false} style={{ width: '100%', cursor: "auto" }} hoverable={true}>
          {dailySumCost.length ? <Row type="flex" align="middle">
            <Col xl={4} xs={24}>
              <Paragraph>共有<Text strong style={{ color: "#cc4756" }}>{timeCount}</Text>个时间段产生过消费;</Paragraph>
              <Paragraph>其中，平均消费最高出现在<Text strong style={{ color: "#cc4756" }}>{maxTime}时</Text>,平均消费金额为<Text strong
                                                                                                              style={{ color: "#cc4756" }}>¥{maxMoney}</Text></Paragraph>
            </Col>
            <Col xl={20} xs={24}>
              <Chart
                height={300}
                data={hourlyAvgCost}
                padding={[10, "auto", 40, "auto"]}
                scale={{
                  hour: {
                    type: "cat",
                    values: HOUR_LIST
                  },
                  avg_cost: {
                    min: 0,
                    max: maxHourlyAvg,
                    alias: '该同学',
                    tickInterval: 5
                  },
                  total_avg: {
                    min: 0,
                    max: maxHourlyAvg,
                    alias: '全校平均消费',
                    tickInterval: 5
                  }
                }}
                onGetG2Instance={chart => {
                  chartIns = chart;
                }}
                forceFit
              >
                <Legend
                  custom={true}
                  allowAllCanceled={true}
                  items={[
                    {
                      value: "该同学",
                      marker: {
                        symbol: "square",
                        fill: "#4190f7",
                        radius: 5
                      }
                    },
                    {
                      value: "全校平均消费",
                      marker: {
                        symbol: "hyphen",
                        stroke: "#61be67",
                        radius: 5,
                        lineWidth: 3
                      }
                    }
                  ]}
                  onClick={({ item, checked }) => {
                    const { value } = item;
                    const geoms = chartIns.getAllGeoms();
                    for (let geom of geoms) {
                      if (geom.getYScale().alias === value) {
                        if (checked) {
                          geom.show();
                          continue;
                        }
                        geom.hide();
                      }
                    }
                  }}
                />
                <Axis name="hour"/>
                <Axis name="total_avg" visible={false}/>
                <Tooltip/>
                <Geom type="interval" position="hour*avg_cost"
                      tooltip={['avg_cost', (avgCost) => {
                        return {
                          name: "该同学平均消费",
                          value: avgCost + "元"
                        };
                      }]}/>
                <Geom type="line" position="hour*total_avg" color="#61be67" size={2} shape="smooth"
                      tooltip={['total_avg', (totalAvg) => {
                        return {
                          name: "全校同学平均消费",
                          value: totalAvg + "元"
                        };
                      }]}/>
                <Geom type="point" position="hour*total_avg" color="#61be67" size={3} shape="circle"
                      tooltip={['total_avg', (totalAvg) => {
                        return {
                          name: "全校同学平均消费",
                          value: totalAvg + "元"
                        };
                      }]}/>
              </Chart>
            </Col>
          </Row> : <Empty/>}
        </Card>
      </Card>
    );
  }
);

export default ConsumptionOverallLineChart;
