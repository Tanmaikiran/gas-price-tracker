import { useEffect, useRef } from 'react';
import { createChart, CrosshairMode } from 'lightweight-charts';

export default function GasChart({ data }) {
  const chartContainerRef = useRef();

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      width: 600,
      height: 300,
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      layout: {
        backgroundColor: '#fff',
        textColor: '#000',
      },
      grid: {
        vertLines: { color: '#eee' },
        horzLines: { color: '#eee' },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: true,
      },
    });

    const series = chart.addCandlestickSeries();

    if (data && data.length > 0) {
      series.setData(data);
    }

    return () => chart.remove();
  }, [data]);

  return <div ref={chartContainerRef} />;
}
