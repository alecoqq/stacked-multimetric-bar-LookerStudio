let chart;

function drawViz(data) {
  if (!chart) {
    chart = echarts.init(document.getElementById('chart'));
  }

  const rows = data.tables.DEFAULT;
  const dimension = rows.map(r => r.dim);

  const series = data.fields.metrics.map(m => ({
    name: m.name,
    type: 'bar',
    stack: 'total',
    data: rows.map(r => r[m.id])
  }));

  chart.setOption({
    tooltip: { trigger: 'axis' },
    legend: {},
    xAxis: { type: 'category', data: dimension },
    yAxis: { type: 'value' },
    series: series
  });
}

dscc.subscribeToData(drawViz, { transform: dscc.transform.table });