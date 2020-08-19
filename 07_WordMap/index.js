const svg = d3.select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

console.log(width, height);

const projection = d3.geoEqualEarth();
const geoPathGenerator = d3.geoPath().projection(projection);

svg.append('path')
    .attr('class', 'sphere')
    .attr('d', geoPathGenerator({type: 'Sphere'}));


d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json')
    .then((data) => {
        const countries = topojson.feature(data, data.objects.countries);

        console.log(countries);

        const path = svg.selectAll('path')
            .data(countries.features)
                .enter().append('path')
                    .attr('class', 'country')
                    .attr('d', d => geoPathGenerator(d))
    });