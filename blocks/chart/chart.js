
export default async function decorate(block) {
    const child = block.querySelector('div > div');
    const id = 'chart_div' + Math.random();
    const anchorTag = block.querySelector('a');
    const hrefValue = anchorTag.getAttribute('href');
    child.id = id;
    child.style.width = '100%';
    child.style.height = '500px';

    let timeSeries = [];
    const res = await fetch(hrefValue);
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

        var chart = new google.visualization.AreaChart(document.getElementById(id));
        chart.draw(graphData, options);
        // }, 100);

    }
}