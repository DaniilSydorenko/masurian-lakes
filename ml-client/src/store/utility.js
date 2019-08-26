import HaversineGeolocation from 'haversine-geolocation'

const replacePlChars = x => {
	return x.toLowerCase().replace(/[ąęśćółńżź]/g, s =>
		s === 'ą' ? 'a' : s === 'ę' ? 'e' : s === 'ś' ? 's' : s === 'ć' ? 'c' : s === 'ó' ? 'o' : s === 'ł' ? 'l' : s === 'ń' ? 'n' : s === 'ż' ? 'z' : 'z'
	)
}

const sortOrderStrings = (a, b, name, order) => {
	let fieldName = name === 'alphabet' ? 'title' : name;
	const nameA = replacePlChars(a[fieldName])
	const nameB = replacePlChars(b[fieldName])
	const ascOrder = nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
	const descOrder = nameA < nameB ? 1 : nameA > nameB ? -1 : 0;
	return order === 'asc' ? ascOrder : descOrder;
}

const sortOrderNumbers = (a, b, criteria, order) => {
	return order === 'asc' ? a[criteria] - b[criteria] : b[criteria] - a[criteria]
}

const sortData = (data, criteria, order, sortOrder) => {
	return data.slice().sort((a, b) => sortOrder(a, b, criteria, order))
}

export const getCurrentPoint = (data) => {
	return {
		latitude: data.coords.latitude,
		longitude: data.coords.longitude,
		accuracy: data.coords.accuracy
	};
};

export const updateObject = (oldObject, updatedProperties) => {
	return {
		...oldObject,
		...updatedProperties
	}
}

export const sortBy = (data, criteria = 'temperature', order = 'asc') => {
	const sortOrder = criteria === 'alphabet' ? sortOrderStrings : sortOrderNumbers;
	return sortData(data, criteria, order, sortOrder);
}

export const getDistanceTo = (location) => {
	HaversineGeolocation.isGeolocationAvailable()
		.then(data => {
			const currentPoint = {
				latitude: data.coords.latitude,
				longitude: data.coords.longitude,
				accuracy: data.coords.accuracy
			}
			
			HaversineGeolocation.getDistanceBetween(currentPoint, location)
		})
}
