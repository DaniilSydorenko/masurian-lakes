const randomVal = (min, max) => {
	return parseFloat(
		(parseFloat(Math.random().toFixed(1)) * (max - min) + min).toFixed(1)
	);
};

const formattedTemperature = temperature => {
	return !temperature.includes('b') ? temperature.split(" ")[0] : '19.0';
};

const formattedString = temperature => {
	return (parseFloat(temperature) + randomVal(0.1, 1.5)).toFixed(1);
};

const runChain = (f1, f2) => {
	return (x) => {
		return f1(f2(x));
	};
};

const scrapperSimulator = data => data.map(lake => {
	return {
		...lake, temperature: runChain(formattedString, formattedTemperature)(lake.temperature)
	};
});

module.exports = {
	scrapperSimulator: scrapperSimulator
}
