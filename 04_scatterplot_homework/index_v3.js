const svg = d3.select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const render = dataVar => {
    const title = 'Horsepower VS Weight'
    const xValue = d => d.horsepower;
    const xAxisLabel = 'Horspower';

    const yValue = d => d.weight;
    const yAxisLabel = 'weight';

    const circleRadius = 10;
    const margin = {top: 70, right: 100, bottom: 90, left: 150};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    

    const  xScale = d3.scaleLinear()
        .domain(d3.extent(dataVar, xValue))
        .range([0, innerWidth])
        .nice();
    //console.log(xScale.domain());
    //console.log(xScale.range());

    const yScale = d3.scaleLinear()
        .domain(d3.extent(dataVar, yValue))
        .range([0, innerHeight])
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

    g.selectAll('circle').data(dataVar)
        .enter().append('circle')
            .attr('cy', d => yScale(yValue(d)))
            .attr('cx', d => xScale(xValue(d)))
            .attr('r', circleRadius);
    
    //console.log(yScale.bandwidth() / 2)

    g.append('text')
        .attr('class', 'title')
        .attr('y', -10)
        .attr('x', innerWidth / 6)
        .text(title);
};


d3.csv('auto-mpg.csv').then(data => {
    data.forEach( d => {
        d.acceleration = +d.acceleration;
        d.cylinders = +d.cylinders;
        d.displacement = +d.displacement;
        d.horsepower = +d.horsepower;
        d.year = 1900 + parseFloat(d.year);
        d.mpg = +d.mpg,
        d.weight = +d.weight
    });
    //console.log(data);
    render(data);
});

/* 
//PRINTING THE CSV DATA INTO JSON
const kilobytes = data => Math.ceil( d3.csvFormat(data).length / 1024);

const body = d3.select('body');

d3.csv('auto-mpg.csv').then(data => {
    body.append('pre')
        .text([
            `${data.length} rows`,
            `${Object.keys(data[0]).length} columns`,
            `${kilobytes(data)} KB`
        ].join(', '));

    body.append('pre')
        .text('First 10 roes');
    
    body.append('pre')
        .text(JSON.stringify(data.slice(0, 10), null, 2))
}) 
 */