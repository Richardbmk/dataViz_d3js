const svg = d3.select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');
console.log(width, height);

const render = dataVar => {
    const xValue = d => d.Debt;
    const yValue = d => d.Country;
    const margin = {top: 70, right: 100, bottom: 70, left: 150};
    console.log(margin);
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    console.log(innerWidth);
    console.log(innerHeight);

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(dataVar, xValue)])
        .range([0, innerWidth])
    console.log(xScale.domain());

    const yScale = d3.scaleBand()
        .domain(dataVar.map(yValue))
        .range([0, innerHeight])
        .padding(0.1);
    console.log(yScale.domain());

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

    const xAxisTickFormat = number => 
        d3.format('.3s')(number)
        .replace('T', 'B');

    const xAxis = d3.axisBottom(xScale)
        .tickFormat(xAxisTickFormat)
        .tickSize(-innerHeight);

    g.append('g').call(d3.axisLeft(yScale))
        .selectAll('path, line')
        .remove()

    const xAxisG = g.append('g').call(xAxis)
        .attr('transform', `translate(0, ${innerHeight})`);
    xAxisG.selectAll('path').remove();

    xAxisG.append('text')
        .text('Debt')
        .attr('class', 'axis-lable')
        .attr('x', innerWidth / 2)
        .attr('y', 50)
        .attr('fill', 'black');

    g.selectAll('rect').data(dataVar)
        .enter().append('rect')
            .attr('y', d => yScale(yValue(d)))
            .attr('width', d => xScale(xValue(d)))
            .attr('height', yScale.bandwidth());

    g.append('text')
        .text('Debt: Country comparison')
        .attr('class', 'title')
        .attr('y', -20)
        
}


d3.csv('table_debt.csv').then(data => {
    data.forEach(d => {
        d.year = +d.year
        d.Debt = +d.Debt*1000000;
    });
    //console.log(data.slice(0, 10));
    data = data.slice(0, 10)
    data.sort( function (a, b) {
        if (a.Debt > b.Debt) {
            return -1;
        } else {
            return 1;
        }
    });
    console.log(data);
    render(data)
});