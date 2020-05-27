const svg = d3.select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const render = dataVar => {
    const title = 'Word Population';
    const xValue = d => d.year;
    const xAxisLabel = 'Time';

    const yValue = d => d.population;
    const yAxisLabel = 'Population';

    const circleRadius = 4;
    const margin = {top: 70, right: 100, bottom: 90, left: 150};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleTime()
        .domain(d3.extent(dataVar, xValue))
        .range([0, innerWidth])
        .nice();

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(dataVar, yValue)])
        .range([innerHeight, 0])
        .nice();


    const g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);


    const areaGenerator = d3.area()
        .x(d => xScale(xValue(d)))
        .y0(innerHeight)
        .y1(d => yScale(yValue(d)))
        .curve(d3.curveBasis)

    g.append('path')
        .attr('class', 'line-path')
        .attr('d', areaGenerator(dataVar));

    const xAxis = d3.axisBottom(xScale)
        .ticks(6)
        .tickSize(-innerHeight)
        .tickPadding(30);
    
    const yAxisTickFormat = number => 
        d3.format('.1s')(number)
            .replace('G', 'M');

    const yAxis = d3.axisLeft(yScale)
        .tickSize(-innerWidth)
        .tickPadding(10)
        .tickFormat(yAxisTickFormat);

    const yAxisG = g.append('g').call(yAxis);
    yAxisG.selectAll('path').remove()

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

    g.append('text')
        .attr('class', 'title')
        .attr('y', -10)
        .attr('x', innerWidth / 2)
        .text(title);

}


d3.csv('world-population-by-year-2015.csv').then(data => {
    data.forEach(d => {
        d.year = new Date(d.year);
        d.population = +d.population;
    });
    render(data);
    console.log(data)
})