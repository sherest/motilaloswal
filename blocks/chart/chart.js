
export default function decorate(block) {
    const chartDiv = document.querySelector('.chart-wrapper .chart');
    const childOfChild = chartDiv.querySelector('div > div');
    childOfChild.id = 'chart_div';
    childOfChild.style.width = '100%';
    childOfChild.style.height = '500px';
}
google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var tbData = [];
    const dataArray = [
        ["19:45", 59.5],
        ["19:00", 59.49],
        ["18:30", 59.49],
        ["18:15", 59.76],
        ["17:30", 59.49],
        ["16:15", 59.59],
        ["16:00", 59.48],
        ["15:45", 59.44],
        ["15:30", 59.42],
        ["15:15", 59.55]
    ];

    var graphData = new google.visualization.DataTable();
        graphData.addColumn('string', 'Time');
        graphData.addColumn('number', 'Open');
        graphData.addRows(dataArray);
    /*fetch("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=HDB&interval=15min&apikey=6XU1CKCJQ47LEPDM")
        .then(response => response.json())  
        .then(data => {
            const timeSeries = data['Time Series (15min)'];
            Object.keys(timeSeries).map(key => {
                //graphData.addRow([key.substring(11,key.length-3), parseFloat(timeSeries[key]["1. open"])*1000]);
              });
              
              
        })
        .catch(error => console.error('Error fetching JSON data:', error));
console.log(graphData);*/
        
    

    var options = {
        title: 'Stock Data',
        hAxis: {title: 'Time',  titleTextStyle: {color: '#333'}},
        vAxis: {minValue: 59.0},
        tooltip: {trigger: 'hover'}
    };

    var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
    chart.draw(graphData, options);
}