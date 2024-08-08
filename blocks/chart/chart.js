
export default async function decorate(block) {
    const chartDiv = document.querySelector('.chart-wrapper .chart');
    const childOfChild = chartDiv.querySelector('div > div');
    childOfChild.id = 'chart_div';
    childOfChild.style.width = '100%';
    childOfChild.style.height = '500px';
}
let timeSeries = [];
const res = await fetch("https://mocki.io/v1/e235115a-d22b-4773-96e3-1bdf2554cec5");
const data = await res.json();
timeSeries = data['Time Series (15min)'];
    /*.then(response => response.json())
    .then(data => {
        timeSeries = data['Time Series (15min)'];

    })
    .catch(error => console.error('Error fetching JSON data:', error));*/
google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);


function drawChart() {
    //setTimeout(function () {
        var graphData = new google.visualization.DataTable();
        graphData.addColumn('string', 'Time');
        graphData.addColumn('number', 'Open');
        let minVal = 0;
        Object.keys(timeSeries).map(key => {
            let value = parseFloat(timeSeries[key]["1. open"]);
            if (minVal == 0) minVal = value;
            if (minVal > value) minVal = value;
            graphData.addRow([key.substring(11, key.length - 3).toString(), value]);
        });
        
        minVal = Math.floor(minVal);
        var options = {
            title: 'HDFC BANK',
            hAxis: { title: 'Time', titleTextStyle: { color: '#333' } },
            vAxis: { minValue: minVal },
            tooltip: { trigger: 'hover' }
        };

        var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
        chart.draw(graphData, options);
   // }, 100);

}