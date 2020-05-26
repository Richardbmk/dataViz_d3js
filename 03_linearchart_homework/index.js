const svg = d3.select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

async function render(dataVar) {
    const title = 'PIB SPAIN INTERANUAL VARIATION'
    const xValue = d => d.timeline;
    const xAxisLabel = 'Time';

    const yValue = d => d.pibvariation;
    const yAxisLabel = 'PIB Variation';

    const circleRadius = 4;
    const margin = {top: 70, right: 100, bottom: 90, left: 150};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    

    const  xScale = d3.scaleTime()
        .domain(d3.extent(dataVar, xValue))
        .range([0, innerWidth])
        .nice();
    console.log(xScale.domain());
    console.log(xScale.range());

    const yScale = d3.scaleLinear()
        .domain(d3.extent(dataVar, yValue))
        .range([innerHeight, 0])
        .nice();
    //console.log(yScale.range());

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    

    const xAxis = d3.axisBottom(xScale)
        .tickSize(-innerHeight)
        .tickPadding(30);
    
    const yAxis = d3.axisLeft(yScale)
        .tickSize(-innerWidth)
        .tickPadding(10);

    const yAxisG =  g.append('g').call(yAxis);
    yAxisG.selectAll('path').remove();

    yAxisG.append('text')
        .attr('class', 'axis-lable')
        .attr('y', -70)
        .attr('x', -innerHeight / 2)
        .attr('fill', 'black')
        .attr('transform', `rotate(-90)`)
        .attr('text-anchor', 'middle')
        .text(yAxisLabel);

    const xAxisG = g.append('g').call(xAxis)
        .attr('transform', `translate(0, ${innerHeight})`);
    xAxisG.selectAll('path').remove();

    xAxisG.append('text')
        .attr('class', 'axis-lable')
        .attr('x', innerWidth / 2)
        .attr('y', 80)
        .attr('fill', 'black')
        .text(xAxisLabel);

    const lineGenerator = d3.line()
        .x(d => xScale(xValue(d)))
        .y(d => yScale(yValue(d)))
        .curve(d3.curveBasis);

    g.append('path')
        .attr('class', 'line-path')
        .attr('d', lineGenerator(dataVar));
        

    g.append('text')
        .attr('class', 'title')
        .attr('y', -10)
        .attr('x', innerWidth / 2)
        .text(title);
};



async function getData(){
    const xs = [];
    const ys = [];
    const response = await fetch('ie0201.csv');
    const data = await response.text();

    
    const rows = data.split('\n').slice(14);
    rows.forEach(row => {
        const columns = row.split(';');
        const dateCol = columns[0];
        xs.push(dateCol);
        const PIBinter = columns[1];
        const dotPIBinter = PIBinter.replace(',', '.');
        ys.push(parseFloat(dotPIBinter));
    });
    //console.log(xs);
    // return {xs, ys};
    const objData = [];
    xs.map(function(timeline, pibvar) {
        var singleObj = {};
        singleObj['timeline'] = new Date(timeline);
        singleObj['pibvariation'] = ys[pibvar];
        // return singleObj;
        objData.push(singleObj);
    });
    console.log(objData);
    // return objData;
    render(objData);
}

getData();